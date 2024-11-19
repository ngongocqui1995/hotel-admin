import {
  ChangePasswordRootUser,
  ChangeStatusRootUser,
  CreateRootUser,
  RootUserItem,
  QueryRootUsers,
  UpdateRootUser,
} from '@/pages/Admin/RootUser/data';
import { getQueryString, renameKeys, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['name', 'phone', 'email'];

export async function queryRootUsers(params: any, sort: any = {}): Promise<QueryRootUsers> {
  const { current, pageSize, keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });
  const queryFilter = _.pickBy(renameKeys(paramsFilter, { role: 'root-user_role.id' }));

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

  const res = await request(`root-users?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllRootUsers(params: any): Promise<RootUserItem[]> {
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

  return await request(`root-users?${queryString}`, {
    method: 'GET',
  });
}

export async function createRootUser(data: CreateRootUser) {
  return await request(`root-users`, { method: 'POST', data });
}

export async function updateRootUser(id: string, data: UpdateRootUser) {
  return await request(`root-users/${id}`, { method: 'PATCH', data });
}

export async function changePassword(user: string, data: ChangePasswordRootUser) {
  return await request(`root-users/internal/change-password`, {
    method: 'PUT',
    data: { ...data, user },
  });
}

export async function changeStatusRootUser(
  id: string,
  status: string,
): Promise<ChangeStatusRootUser> {
  return await request(`root-users/status/${id}`, { method: 'PUT', data: { status } });
}
