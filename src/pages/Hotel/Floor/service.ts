import {
  ChangeStatusFloor,
  CreateFloor,
  QueryFloors,
  FloorItem,
  UpdateFloor,
} from '@/pages/Hotel/Floor/data';
import { getQueryString, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['code', 'name'];

export async function queryFloors(params: any, sort: any = {}): Promise<QueryFloors> {
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

  const res = await request(`floors?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllFloors(params: any): Promise<FloorItem[]> {
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

  return await request(`floors?${queryString}`, {
    method: 'GET',
  });
}

export async function createFloor(data: CreateFloor) {
  return await request(`floors`, { method: 'POST', data });
}

export async function updateFloor(id: string, data: UpdateFloor) {
  return await request(`floors/${id}`, { method: 'PATCH', data });
}

export async function changeStatusFloor(id: string, status: string): Promise<ChangeStatusFloor> {
  return await request(`floors/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteFloor(id: string) {
  return await request(`floors/${id}`, { method: 'DELETE' });
}
