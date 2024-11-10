import {
  ChangeStatusScope,
  CreateScope,
  QueryScopes,
  ScopeItem,
  UpdateScope,
} from '@/pages/Admin/Scope/data';
import { getQueryString, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['code', 'name'];

export async function queryScopes(params: any, sort: any = {}): Promise<QueryScopes> {
  const { current, pageSize, keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
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
  });

  const res = await request(`scopes?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });
  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllScopes(params: any): Promise<ScopeItem[]> {
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
  });

  return await request(`scopes?${queryString}`, { method: 'GET' });
}

export async function createScope(data: CreateScope) {
  return await request(`scopes`, { method: 'POST', data });
}

export async function updateScope(id: string, data: UpdateScope) {
  return await request(`scopes/${id}`, { method: 'PATCH', data });
}

export async function changeStatusScope(id: string, status: string): Promise<ChangeStatusScope> {
  return await request(`scopes/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteScope(id: string) {
  return await request(`scopes/${id}`, { method: 'DELETE' });
}
