import {
  ChangeStatusResource,
  CreateResource,
  QueryResources,
  ResourceItem,
  UpdateResource,
} from '@/pages/Admin/Resource/data';
import { getQueryString, renameKeys, renameValues } from '@/utils/utils';
import { CondOperator, QuerySortOperator } from '@nestjsx/crud-request';
import { request } from '@umijs/max';
import _ from 'lodash';

const keyword_params = ['code', 'name'];

export async function queryResources(params: any, sort: any = {}): Promise<QueryResources> {
  const { current, pageSize, keyword, resource, ...paramsFilter } = params;
  const search = keyword ? keyword_params : [];

  const querySort = _.isEmpty(sort) ? { updatedAt: 'DESC' } : sort;
  const sorts = renameValues(querySort, { ascend: 'ASC', descend: 'DESC' });
  const queryFilter = renameKeys(_.pickBy({ ...paramsFilter, resource }), {
    resource: 'resource.id',
  });
  const filterResource = resource
    ? []
    : [{ field: 'resource.id', operator: CondOperator.IS_NULL, value: true }];

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
        ...filterResource.map((filter) => ({
          [filter.field]: { [filter.operator]: filter.value },
        })),
      ],
    },
    queryJoin: [
      { field: 'resource' },
      { field: 'resources' },
      { field: 'scopes' },
      { field: 'resources.scopes' },
    ],
  });

  const res = await request(`resources?${queryString}`, {
    method: 'GET',
    params: { current, pageSize },
  });

  return {
    data: res?.data || [],
    total: res?.total || 0,
    success: true,
  };
}

export async function getAllResources(params: any): Promise<ResourceItem[]> {
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
    queryJoin: [{ field: 'roles' }, { field: 'roles.role' }],
  });

  return await request(`resources?${queryString}`, {
    method: 'GET',
  });
}

export async function createResource(data: CreateResource) {
  return await request(`resources`, { method: 'POST', data });
}

export async function updateResource(id: string, data: UpdateResource) {
  return await request(`resources/${id}`, { method: 'PATCH', data });
}

export async function changeStatusResource(
  id: string,
  status: string,
): Promise<ChangeStatusResource> {
  return await request(`resources/status/${id}`, { method: 'PUT', data: { status } });
}

export async function deleteResource(id: string) {
  return await request(`resources/${id}`, { method: 'DELETE' });
}
