import { queryResources } from '@/pages/Admin/Resource/service';
import { MenuItem, RoleItem } from '@/pages/Admin/Role/data';
import { getAllMenus } from '@/pages/Admin/Role/service';
import { ScopeItem } from '@/pages/Admin/Scope/data';
import { queryScopes } from '@/pages/Admin/Scope/service';
import { scrollTable } from '@/utils/utils';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Card, Checkbox, Form } from 'antd';
import { useAsyncEffect, useReactive } from 'ahooks';
import to from 'await-to-js';
import React from 'react';
import _ from 'lodash';

interface RoleToMenuListExpandProps {
  data: RoleItem;
}

type RoleChildListState = {
  menus: MenuItem[];
  scopes: ScopeItem[];
};

const RoleToMenuListExpand: React.FC<RoleToMenuListExpandProps> = ({ data }) => {
  const state = useReactive<RoleChildListState>({ menus: [], scopes: [] });

  useAsyncEffect(async () => {
    const [err, res] = await to(
      Promise.all([
        queryResources({ current: 1, pageSize: 1000 }),
        queryScopes({ current: 1, pageSize: 1000 }),
        getAllMenus({ 'role.id': data.id }),
      ]),
    );
    if (err) return;

    state.menus = res[0].data.map((it) => ({
      resource: it,
      scopes: res[2].find((menu) => menu.resource.id === it.id)?.scopes || [],
      menus: it.resources.map((resource) => ({
        resource,
        scopes: res[2].find((menu) => menu.resource.id === resource.id)?.scopes || [],
      })),
    })) as any[];
    state.scopes = res[1].data;
  }, [data.id]);

  const columns = (menus: MenuItem[]): ProColumns<MenuItem>[] => [
    {
      title: '',
      width: 150,
      dataIndex: ['resource', 'name'],
    },
    ...(state.scopes.map((scope) => ({
      title: () => {
        const filterMenus = menus.filter((menu: MenuItem) =>
          menu.resource.scopes.map((scope: ScopeItem) => scope.code).includes(scope.code),
        );
        if (filterMenus.length === 0) return;

        return (
          <div className="flex flex-col items-center">
            {scope.name}
            <div>
              <Checkbox
                disabled
                checked={filterMenus?.every((menu) =>
                  menu.scopes.map((it) => it.id).includes(scope.id),
                )}
                onChange={(event) => {
                  menus.forEach((menu) => {
                    if (menu.resource.scopes.map((it) => it.code).includes(scope.code)) {
                      if (event.target.checked) {
                        menu.scopes.push({ id: scope.id } as ScopeItem);
                        menu.scopes = _.unionBy(menu.scopes, 'id');
                      } else {
                        menu.scopes = menu.scopes.filter((it) => it.id !== scope.id);
                      }
                    }
                  });
                }}
              />
            </div>
          </div>
        );
      },
      width: scope.name?.length * 12,
      align: 'center',
      render: (__, record) => {
        if (!record?.resource.scopes?.map?.((scope: ScopeItem) => scope.code)?.includes(scope.code))
          return;
        return (
          <Checkbox
            disabled
            checked={record.scopes.map((it) => it.id).includes(scope.id)}
            onChange={(event) => {
              if (event.target.checked) {
                record.scopes.push({ id: scope.id } as ScopeItem);
                record.scopes = _.unionBy(record.scopes, 'id');
              } else {
                record.scopes = record.scopes.filter((it) => it.id !== scope.id);
              }
            }}
          />
        );
      },
    })) as ProColumns<MenuItem>[]),
    {
      title: () => {
        if (menus.length === 0) return;
        return (
          <div className="flex flex-col items-center">
            Tất cả
            <div>
              <Checkbox
                disabled
                checked={menus.every((menu) =>
                  menu?.resource.scopes.every((scope) =>
                    menu.scopes.map((it) => it.id).includes(scope.id),
                  ),
                )}
                onChange={(event) => {
                  if (event.target.checked) {
                    menus.forEach((menu) => {
                      menu.scopes.push(...(menu.resource.scopes as ScopeItem[]));
                      menu.scopes = _.unionBy(menu.scopes, 'id');
                    });
                  } else {
                    menus.forEach((menu) => {
                      menu.scopes = [];
                    });
                  }
                }}
              />
            </div>
          </div>
        );
      },
      className: 'sm:!sticky sm:right-0 sm:z-[2] sm:bg-white sm:shadow',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 90,
      render: (__, record) => {
        if (record?.resource.scopes.length === 0) return;
        return (
          <Checkbox
            disabled
            checked={record?.resource.scopes.every((scope) =>
              record.scopes.map((it) => it.id).includes(scope.id),
            )}
            onChange={(event) => {
              if (event.target.checked) {
                const scopeIds = record?.resource.scopes.map((it) => ({ id: it.id }));
                record.scopes.push(...(scopeIds as ScopeItem[]));
                record.scopes = _.unionBy(record.scopes, 'id');
              } else {
                record.scopes = [];
              }
            }}
          />
        );
      },
    },
  ];

  const renderTree = (data: MenuItem[]) => {
    return (
      <Card>
        <ProTable<MenuItem>
          rowKey="id"
          search={false}
          cardProps={{ bodyStyle: { padding: 0 } }}
          bordered
          pagination={false}
          options={false}
          headerTitle={false}
          sticky={false}
          columns={columns(data)}
          scroll={scrollTable}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => renderTree(record.menus),
            rowExpandable: (record) => record.menus?.length > 0,
          }}
        />
      </Card>
    );
  };

  return (
    <>
      <Form.Item name="menus" hidden />
      {renderTree(state.menus)}
    </>
  );
};

export default RoleToMenuListExpand;
