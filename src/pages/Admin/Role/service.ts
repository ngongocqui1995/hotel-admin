import {
  ChangeStatusRole,
  CreateRole,
  MenuItem,
  QueryRoles,
  RoleItem,
  UpdateRole,
} from '@/pages/Admin/Role/data';
import { getQueryString, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['name'];

export async function queryRoles(params: any, sort: any = {}): Promise<QueryRoles> {
  const { current, pageSize, keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
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
        ...Object.entries(_.pickBy(paramsFilter)).map(([key, value]) => ({
          [key]: { [CondOperator.EQUALS]: value },
        })),
      ],
    },
  });

  const res = await request(`roles?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllRoles(params: any): Promise<RoleItem[]> {
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
        ...Object.entries(_.pickBy(paramsFilter)).map(([key, value]) => ({
          [key]: { [CondOperator.EQUALS]: value },
        })),
      ],
    },
  });

  return await request(`roles?${queryString}`, { method: 'GET' });
}

export async function createRole(data: CreateRole) {
  return await request(`roles`, { method: 'POST', data });
}

export async function updateRole(id: string, data: UpdateRole) {
  return await request(`roles/${id}`, { method: 'PATCH', data });
}

export async function changeStatusRole(id: string, status: string): Promise<ChangeStatusRole> {
  return await request(`roles/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteRole(id: string) {
  return await request(`roles/${id}`, { method: 'DELETE' });
}

export async function getAllMenus(params: any): Promise<MenuItem[]> {
  const { keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = { updatedAt: 'DESC' };
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });

  const queryString = getQueryString({
    querySort: Object.entries(sorts).map(([key, value]) => ({
      field: key,
      order: value as QuerySortOperator,
    })),
    queryOr: search.map((it) => ({
      field: it,
      operator: CondOperator.CONTAINS_LOW,
      value: params.keyword,
    })),
    queryFilter: Object.entries(_.pickBy(paramsFilter)).map(([key, value]) => ({
      field: key,
      operator: CondOperator.EQUALS,
      value,
    })),
    queryJoin: [{ field: 'role' }, { field: 'scopes' }, { field: 'resource' }],
  });

  return await request(`role-resources?${queryString}`, { method: 'GET' });
}
