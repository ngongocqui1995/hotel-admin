import {
  ChangePasswordAdminUser,
  ChangeStatusAdminUser,
  CreateAdminUser,
  AdminUserItem,
  QueryAdminUsers,
  UpdateAdminUser,
} from '@/pages/Admin/AdminUser/data';
import { getQueryString, renameKeys, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['name', 'phone', 'email'];

export async function queryAdminUsers(params: any, sort: any = {}): Promise<QueryAdminUsers> {
  const { current, pageSize, keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });
  const queryFilter = _.pickBy(renameKeys(paramsFilter, { role: 'customer_role.id' }));

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

  const res = await request(`admin-users?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllAdminUsers(params: any): Promise<AdminUserItem[]> {
  const { keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = { updatedAt: 'DESC' };
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });

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
        ...Object.entries(paramsFilter).map(([key, value]) => ({
          [key]: { [CondOperator.EQUALS]: value },
        })),
      ],
    },
    queryJoin: [{ field: 'role' }],
  });

  return await request(`admin-users?${queryString}`, {
    method: 'GET',
  });
}

export async function createAdminUser(data: CreateAdminUser) {
  return await request(`admin-users`, { method: 'POST', data });
}

export async function updateAdminUser(id: string, data: UpdateAdminUser) {
  return await request(`admin-users/${id}`, { method: 'PATCH', data });
}

export async function changePassword(user: string, data: ChangePasswordAdminUser) {
  return await request(`admin-users/internal/change-password`, {
    method: 'PUT',
    data: { ...data, user },
  });
}

export async function changeStatusAdminUser(
  id: string,
  status: string,
): Promise<ChangeStatusAdminUser> {
  return await request(`admin-users/status/${id}`, { method: 'PUT', data: { status } });
}
