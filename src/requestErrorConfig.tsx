import { authRefresh } from '@/pages/Auth/Login/services';
import { ErrorNotify, SuccessNotify, loginPath } from '@/utils/utils.enum';
import type { RequestOptions } from '@@/plugin-request/request';
import { getLocale, history, type RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import to from 'await-to-js';
import axios from 'axios';
import _ from 'lodash';
import {
  getAccessToken,
  getRefreshToken,
  getServerApi,
  removeToken,
  renameKeys,
  saveToken,
} from './utils/utils';

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

export const formatParams = (body: any) => {
  if (body instanceof FormData) return body;

  let params = _.pickBy(body, (x) => {
    if (x === false) return true;
    if (x === 0) return true;
    if (x === null) return true;
    return x;
  });

  params = renameKeys(params, {
    current: 'page',
    pageSize: 'limit',
  });

  return params;
};

/**
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error;
      }
    },
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;

      const notify = ErrorNotify.filter(
        (item) =>
          error.config?.url?.includes(item.url) && item.method.includes(error.config?.method),
      );

      if (notify.length > 0) {
        const errors = error.response?.data?.errors;
        if (Array.isArray(errors) && errors.length) {
          return notification.error({
            message: 'Error',
            description: errors.map((item: string) => (
              <>
                {item}
                <br />
              </>
            )),
            duration: 2,
          });
        }

        const content = error.response?.data?.message;
        return message.error(content);
      }
    },
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      const headers = {
        ...config.headers,
        Authorization: `Bearer ${getAccessToken()}`,
        'x-custom-lang': getLocale(),
      };

      let params = formatParams(config.params);

      let data = formatParams(config.data);

      const baseURL = getServerApi();

      return { ...config, headers, baseURL, params, data };
    },
  ],
  responseInterceptors: [
    [
      (response: any) => {
        const { data } = response as unknown as ResponseStructure;

        const notify = SuccessNotify.filter(
          (item) =>
            response.config?.url?.includes(item.url) &&
            item.method.includes(response.config?.method),
        );

        if (notify.length > 0) {
          message.success(data?.message);
        }

        return response;
      },
      async (error: any) => {
        if (error?.response?.status === 401) {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            removeToken();
            history.push(loginPath);
            return Promise.reject(error);
          }

          const [err, res] = await to(authRefresh(refreshToken));
          if (err) {
            removeToken();
            history.push(loginPath);
            return Promise.reject(error);
          }

          saveToken(res.accessToken, refreshToken);

          const [err2, result] = await to(
            axios({
              ...error.config,
              headers: {
                ...error.config.headers,
                Authorization: `Bearer ${res.accessToken}`,
              },
            }),
          );
          if (err2) {
            removeToken();
            history.push(loginPath);
            return Promise.reject(error);
          }

          if (result && result?.data?.statusCode === 200) {
            const notify = SuccessNotify.filter(
              (item) =>
                result.config?.url?.includes(item.url) &&
                item.method.includes(result.config.method!),
            );

            if (notify.length > 0) {
              message.success(result?.data?.message);
            }
          }

          return result as any;
        }

        return Promise.reject(error);
      },
    ],
  ],
};
