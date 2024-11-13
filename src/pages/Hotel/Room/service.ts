import {
  ChangeStatusRoom,
  CreateRoom,
  QueryRooms,
  RoomItem,
  UpdateRoom,
} from '@/pages/Hotel/Room/data';
import { getQueryString, renameKeys, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['key'];

export async function queryRooms(params: any, sort: any = {}): Promise<QueryRooms> {
  const { current, pageSize, keyword, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });
  const queryFilter = _.pickBy(
    renameKeys(paramsFilter, { area: 'area.id', floor: 'floor.id', room_type: 'room_type.id' }),
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
        ...Object.entries(_.pickBy(queryFilter)).map(([key, value]) => ({
          [key]: { [CondOperator.EQUALS]: value },
        })),
      ],
    },
    queryJoin: [{ field: 'room_type' }, { field: 'area' }, { field: 'floor' }],
  });

  const res = await request(`rooms?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllRooms(params: any): Promise<RoomItem[]> {
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
    queryJoin: [{ field: 'room_type' }, { field: 'area' }, { field: 'floor' }],
  });

  return await request(`rooms?${queryString}`, {
    method: 'GET',
  });
}

export async function createRoom(data: CreateRoom) {
  return await request(`rooms`, { method: 'POST', data });
}

export async function updateRoom(id: string, data: UpdateRoom) {
  return await request(`rooms/${id}`, { method: 'PATCH', data });
}

export async function changeStatusRoom(id: string, status: string): Promise<ChangeStatusRoom> {
  return await request(`rooms/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteRoom(id: string) {
  return await request(`rooms/${id}`, { method: 'DELETE' });
}
