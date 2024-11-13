import {
  ChangeStatusArea,
  CreateArea,
  QueryAreas,
  AreaItem,
  UpdateArea,
} from '@/pages/Hotel/Area/data';
import { getQueryString, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['code', 'name'];

export async function queryAreas(params: any, sort: any = {}): Promise<QueryAreas> {
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

  const res = await request(`areas?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllAreas(params: any): Promise<AreaItem[]> {
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

  return await request(`areas?${queryString}`, {
    method: 'GET',
  });
}

export async function createArea(data: CreateArea) {
  return await request(`areas`, { method: 'POST', data });
}

export async function updateArea(id: string, data: UpdateArea) {
  return await request(`areas/${id}`, { method: 'PATCH', data });
}

export async function changeStatusArea(id: string, status: string): Promise<ChangeStatusArea> {
  return await request(`areas/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteArea(id: string) {
  return await request(`areas/${id}`, { method: 'DELETE' });
}
