import {
  ChangeStatusRoomType,
  CreateRoomType,
  QueryRoomTypes,
  RoomTypeItem,
  UpdateRoomType,
} from '@/pages/Hotel/RoomType/data';
import { getQueryString, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['code', 'name'];

export async function queryRoomTypes(params: any, sort: any = {}): Promise<QueryRoomTypes> {
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

  const res = await request(`room-types?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllRoomTypes(params: any): Promise<RoomTypeItem[]> {
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

  return await request(`room-types?${queryString}`, {
    method: 'GET',
  });
}

export async function createRoomType(data: CreateRoomType) {
  return await request(`room-types`, { method: 'POST', data });
}

export async function updateRoomType(id: string, data: UpdateRoomType) {
  return await request(`room-types/${id}`, { method: 'PATCH', data });
}

export async function changeStatusRoomType(
  id: string,
  status: string,
): Promise<ChangeStatusRoomType> {
  return await request(`room-types/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteRoomType(id: string) {
  return await request(`room-types/${id}`, { method: 'DELETE' });
}
