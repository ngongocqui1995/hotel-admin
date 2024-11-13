import {
  ChangePasswordCustomer,
  ChangeStatusCustomer,
  CreateCustomer,
  CustomerItem,
  QueryCustomers,
  UpdateCustomer,
} from '@/pages/Admin/Customer/data';
import { getQueryString, renameKeys, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['name', 'phone', 'email'];

export async function queryCustomers(params: any, sort: any = {}): Promise<QueryCustomers> {
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

  const res = await request(`customers?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllCustomers(params: any): Promise<CustomerItem[]> {
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

  return await request(`customers?${queryString}`, {
    method: 'GET',
  });
}

export async function createCustomer(data: CreateCustomer) {
  return await request(`customers`, { method: 'POST', data });
}

export async function updateCustomer(id: string, data: UpdateCustomer) {
  return await request(`customers/${id}`, { method: 'PATCH', data });
}

export async function changePassword(Customer: string, data: ChangePasswordCustomer) {
  return await request(`customers/internal/change-password`, {
    method: 'PUT',
    data: { ...data, Customer },
  });
}

export async function changeStatusCustomer(
  id: string,
  status: string,
): Promise<ChangeStatusCustomer> {
  return await request(`customers/status/${id}`, { method: 'PUT', data: { status } });
}
