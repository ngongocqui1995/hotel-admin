import {
  ChangeStatusRentalVoucher,
  CreateRentalVoucher,
  QueryRentalVouchers,
  RentalVoucherItem,
  UpdateRentalVoucher,
} from '@/pages/RentalVoucher/data';
import { getQueryString, renameKeys, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['code', 'name'];

export async function queryRentalVouchers(
  params: any,
  sort: any = {},
): Promise<QueryRentalVouchers> {
  const { current, pageSize, keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });
  const queryFilter = _.pickBy(
    renameKeys(paramsFilter, { room: 'room.id', customers: 'customers.id' }),
    (x) => {
      if (_.isArray(x) && x?.length === 0) return false;
      return x;
    },
  );

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
        ...Object.entries(_.pickBy(queryFilter)).map(([key, value]) => {
          let condition = CondOperator.EQUALS;
          if (_.isArray(value)) condition = CondOperator.IN;
          if (key === 'checkin_date') condition = CondOperator.GREATER_THAN_EQUALS;
          if (key === 'checkout_date') condition = CondOperator.LOWER_THAN_EQUALS;
          return { [key]: { [condition]: value } };
        }),
      ],
    },
    queryJoin: [{ field: 'room' }, { field: 'customers' }, { field: 'room.room_type' }],
  });

  const res = await request(`rental-vouchers?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllRentalVouchers(params: any): Promise<RentalVoucherItem[]> {
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

  return await request(`rental-vouchers?${queryString}`, {
    method: 'GET',
  });
}

export async function createRentalVoucher(data: CreateRentalVoucher) {
  return await request(`rental-vouchers`, { method: 'POST', data });
}

export async function updateRentalVoucher(id: string, data: UpdateRentalVoucher) {
  return await request(`rental-vouchers/${id}`, { method: 'PATCH', data });
}

export async function changeStatusRentalVoucher(
  id: string,
  status: string,
): Promise<ChangeStatusRentalVoucher> {
  return await request(`rental-vouchers/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteRentalVoucher(id: string) {
  return await request(`rental-vouchers/${id}`, { method: 'DELETE' });
}

export async function getRentalVoucherMonthReport(month: string) {
  return await request(`rental-vouchers/internal/report?month=${month}`, { method: 'GET' });
}

export async function getRentalVoucherYearReport(year: string) {
  return await request(`rental-vouchers/internal/report?year=${year}`, { method: 'GET' });
}
