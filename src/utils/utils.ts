import { isBrowser } from '@ant-design/pro-components';
import {
  QueryFilter,
  QueryJoin,
  QuerySort,
  RequestQueryBuilder,
  SCondition,
} from '@nestjsx/crud-request';
import _ from 'lodash';
import { decrypt, encrypt } from '../../crypto';
import enUSLocal from '../locales/en-US';
import viVNLocal from '../locales/vi-VN';
import {
  ENUM_LANG,
  GENDER,
  RENTAL_VOUCHER_STATUS,
  RESOURCE_TYPE,
  ROOM_STATUS,
  STATUS,
  defaultLangUConfigMap,
} from './utils.enum';

const KEY_GSTATION_API = 'GSTATION_API';

const localesData = {
  [ENUM_LANG['en-US']]: enUSLocal,
  [ENUM_LANG['vi-VN']]: viVNLocal,
};

type LocalesDataStrings = keyof typeof localesData;

const localesLocal = Object.values(localesData)
  .map((t) => Object.keys(t) as [keyof typeof t])
  .flat();

export type LocalesLocal = (typeof localesLocal)[number];

export const getLocales = () => {
  return Object.keys(localesData).map((it) => defaultLangUConfigMap[it as LocalesDataStrings]);
};

export const getLanguage = (): string => {
  if (!isBrowser()) return ENUM_LANG['vi-VN'];
  const lang = window.localStorage.getItem('umi_locale');
  return lang || navigator.language;
};

export const gLocaleObject = (): Record<string, string> => {
  const gLocale = getLanguage();
  return localesData[gLocale as LocalesDataStrings] || localesData[ENUM_LANG['vi-VN']];
};

export const getFormatMessage = (): ((data: {
  id: LocalesLocal;
  defaultMessage?: string;
}) => string) => {
  return ({ id, defaultMessage }): string => {
    const locales = gLocaleObject();
    return locales[id] ?? defaultMessage ?? '';
  };
};

export const validationPassWord = (
  type: 'UPPERCASE' | 'LOWERCASE' | 'SPECIAL' | 'NUMBER',
  value: string,
): Promise<void> => {
  const formatMessage = getFormatMessage();
  let regex: RegExp;
  let id: LocalesLocal = 'pages.password.oneUpperCase';

  switch (type) {
    case 'UPPERCASE': {
      regex = /(?=.*[A-Z])/;
      id = 'pages.password.oneUpperCase';
      break;
    }
    case 'LOWERCASE': {
      regex = /(?=.*[a-z])/;
      id = 'pages.password.oneLowerCase';
      break;
    }
    case 'NUMBER': {
      regex = /(?=.*\d)/;
      id = 'pages.password.oneNumber';
      break;
    }
    case 'SPECIAL': {
      regex = /(?=.*\W)/;
      id = 'pages.password.oneSpecialCharacter';
      break;
    }
  }

  const reg = new RegExp(regex);
  if (reg.test(value) || !value) return Promise.resolve();
  return Promise.reject(new Error(formatMessage({ id })));
};

export const saveToken = (accessToken: string, refreshToken: string) => {
  const encryptedAccessToken = encrypt(accessToken);
  const encryptedRefreshToken = encrypt(refreshToken);
  localStorage.setItem('accessToken', encryptedAccessToken);
  localStorage.setItem('refreshToken', encryptedRefreshToken);
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getAccessToken = (): string => {
  const token = localStorage.getItem('accessToken') || '';
  return token && decrypt(token);
};

export const getRefreshToken = (): string => {
  const token = localStorage.getItem('refreshToken') || '';
  return token && decrypt(token);
};

export const getServerApi = () => {
  const server_api_index = localStorage.getItem(`${KEY_GSTATION_API}_INDEX`) || '';
  const server_api = localStorage.getItem(`${KEY_GSTATION_API}${+server_api_index || ''}`) || '';
  if (!['local', 'dev'].includes(REACT_APP_ENV || 'local')) return GSTATION_API;
  return server_api || GSTATION_API;
};

export const importLocale = () => {
  const locale = localStorage.getItem('umi_locale');
  if (!locale) localStorage.setItem('umi_locale', 'en-US');
};

export const getSettingDrawer = () => {
  const settings = localStorage.getItem('setting_drawer') || '';
  if (!settings) return {};

  return JSON.parse(settings);
};

export const getUpdateTooltip = () => {
  const formatMessage = getFormatMessage();
  return formatMessage({
    id: 'pages.buttons.Update.tooltip',
    defaultMessage: 'Nhấp vào để chỉnh sửa',
  });
};

export const getUpdatePasswordTooltip = () => {
  const formatMessage = getFormatMessage();
  return formatMessage({
    id: 'pages.buttons.UpdatePassword.tooltip',
    defaultMessage: 'Nhấp vào để cập nhật mật khẩu',
  });
};

export const getCopyTooltip = () => {
  const formatMessage = getFormatMessage();
  return formatMessage({
    id: 'pages.buttons.Copy.tooltip',
    defaultMessage: 'Nhấp vào để sao chép',
  });
};

export const getDeleteTooltip = () => {
  const formatMessage = getFormatMessage();
  return formatMessage({ id: 'pages.buttons.Delete.tooltip', defaultMessage: 'Nhấp vào để xoá' });
};

export const getPopupConfirmDelete = () => {
  const formatMessage = getFormatMessage();
  return formatMessage({
    id: 'pages.buttons.Delete.confirm',
    defaultMessage: 'Bạn có chắc chắn muốn xoá không?',
  });
};

export const getGenderEnum = () => {
  const formatMessage = getFormatMessage();
  const newObj: any = {};
  GENDER.forEach((g) => {
    newObj[g.key] = {
      ...g,
      text: formatMessage({ id: g.id as LocalesLocal, defaultMessage: g.text }),
    };
  });
  return newObj;
};

export const getKeyFromString = (str: string, upperCase: boolean = true, char: string = '_') => {
  let data = String(str);
  if (!str) return '';
  data = data.toLowerCase();
  data = data.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  data = data.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  data = data.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  data = data.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  data = data.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  data = data.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  data = data.replace(/đ/g, 'd');
  data = data.replace(
    /”|“|!|@|%|^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\\/g,
    ' ',
  );
  data = data.replace('[', '');
  data = data.replace(/ + /g, ' ');
  data = data.replace(/-+-/g, '-');
  data = data.replace(/ – /g, ' ');
  data = data.trim();
  data = data.replace(/ /g, char);
  if (upperCase) data = data.toUpperCase();
  return data;
};

export const phoneFormatter = (phone: string): string => {
  if (!phone) return '';
  if (_.isNaN(+phone)) return phone;
  let numberPhone = String(phone).replace(/[^\d]/g, '');
  numberPhone = numberPhone.replace(/(\d{3})(\d{3})(\d)/, '$1 $2 $3');
  return numberPhone;
};

export const getStatusEnum = () => {
  const formatMessage = getFormatMessage();
  const newObj: any = {};
  _.forOwn(STATUS, (value, key) => {
    newObj[key] = {
      ...value,
      text: formatMessage({ id: value.id as LocalesLocal, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getRoomStatusEnum = () => {
  const formatMessage = getFormatMessage();
  const newObj: any = {};
  _.forOwn(ROOM_STATUS, (value, key) => {
    newObj[key] = {
      ...value,
      text: formatMessage({ id: value.id as LocalesLocal, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getRentalVoucherStatusEnum = () => {
  const formatMessage = getFormatMessage();
  const newObj: any = {};
  _.forOwn(RENTAL_VOUCHER_STATUS, (value, key) => {
    newObj[key] = {
      ...value,
      text: formatMessage({ id: value.id as LocalesLocal, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getResourceTypeEnum = () => {
  const formatMessage = getFormatMessage();
  const newObj: any = {};
  _.forOwn(RESOURCE_TYPE, (value, key) => {
    newObj[key] = {
      ...value,
      text: formatMessage({ id: value.id as LocalesLocal, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const PAGINATE_OPTIONS = {
  defaultPageSize: 20,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50'],
};

export const regPhoneNumber = /(0)+([0-9]{9})\b/;

export const scrollTable = { x: 'max-content' };

export const renameValues = (
  obj: { [key: string]: string },
  newValues: { [key: string]: string },
) => {
  return _.mapValues(obj, (value) => newValues[value] || value);
};

export const renameKeys = (obj: { [key: string]: string }, newKeys: { [key: string]: string }) => {
  return _.mapKeys(obj, (__, key) => newKeys[key] || key);
};

export const getQueryString = (payload?: {
  queryJoin?: QueryJoin[];
  querySort?: QuerySort[];
  queryOr?: QueryFilter[] | QueryFilter[][];
  queryFilter?: QueryFilter[];
  search?: SCondition;
}) => {
  const qb = RequestQueryBuilder.create();
  console.log(payload?.queryOr);
  payload?.queryJoin?.forEach((join) => qb.setJoin(join));
  payload?.queryFilter?.forEach((filter) => qb.setFilter(filter));
  payload?.queryOr?.forEach((filter) => qb.setOr(filter));
  payload?.querySort?.forEach((sort) => qb.sortBy(sort));
  if (payload?.search) qb.search(payload.search);
  return qb.query();
};
