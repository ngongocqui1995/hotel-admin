import {
  ChangePasswordCustomer,
  ChangeStatusUser,
  CreateUser,
  QueryUsers,
  UpdateUser,
} from '@/pages/Admin/User/data';
import { getQueryString, renameKeys, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['name', 'phone', 'email'];

export async function queryUsers(params: any, sort: any = {}): Promise<QueryUsers> {
  const { current, pageSize, keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });
  const queryFilter = _.pickBy(renameKeys(paramsFilter, { role: 'role.id' }));

  const queryString = getQueryString({
    querySort: Object.entries(sorts).map(([key, value]) => ({
      field: key,
      order: value as QuerySortOperator,
    })),
    search: {
      $and: [
        {
          $or: search.map((it) => {
            return {
              $and: [{ [it]: { [CondOperator.CONTAINS_LOW]: params.keyword } }],
            };
          }),
        },
        ...Object.entries(queryFilter).map(([key, value]) => ({
          [key]: { [CondOperator.EQUALS]: value },
        })),
      ],
    },
    queryJoin: [{ field: 'role' }],
  });

  const res = await request(`users?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function createUser(data: CreateUser) {
  return await request(`users`, { method: 'POST', data });
}

export async function updateUser(id: string, data: UpdateUser) {
  return await request(`users/${id}`, { method: 'PATCH', data });
}

export async function changePassword(user: string, data: ChangePasswordCustomer) {
  return await request(`users/internal/change-password`, {
    method: 'PUT',
    data: { ...data, user },
  });
}

export async function changeStatusUser(id: string, status: string): Promise<ChangeStatusUser> {
  return await request(`users/status/${id}`, { method: 'PUT', data: { status } });
}
