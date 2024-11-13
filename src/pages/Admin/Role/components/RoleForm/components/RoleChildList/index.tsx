import { queryResources } from '@/pages/Admin/Resource/service';
import { MenuItem } from '@/pages/Admin/Role/data';
import { RoleModalState } from '@/pages/Admin/Role/model';
import { getAllMenus } from '@/pages/Admin/Role/service';
import { ScopeItem } from '@/pages/Admin/Scope/data';
import { queryScopes } from '@/pages/Admin/Scope/service';
import { scrollTable } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useSelector } from '@umijs/max';
import { useAsyncEffect, useReactive } from 'ahooks';
import { Card, Checkbox, Form, FormInstance } from 'antd';
import to from 'await-to-js';
import _ from 'lodash';

type RoleChildListProps = {
  form: FormInstance;
};

type RoleChildListState = {
  menus: MenuItem[];
  scopes: ScopeItem[];
};

const RoleChildList: React.FC<RoleChildListProps> = (props) => {
  const role: RoleModalState = useSelector((state: any) => state?.role);
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;
  const state = useReactive<RoleChildListState>({ menus: [], scopes: [] });

  useAsyncEffect(async () => {
    if (role.RoleForm?.type === CREATE) {
      const [err, res] = await to(
        Promise.all([
          queryResources({ current: 1, pageSize: 1000 }),
          queryScopes({ current: 1, pageSize: 1000 }),
        ]),
      );
      if (err) return;
      state.menus = res[0].data.map((it) => ({
        resource: it,
        scopes: [],
        menus: it.resources.map((resource) => ({
          resource,
          scopes: [],
        })),
      })) as any[];
      state.scopes = res[1].data;
    }

    if ([UPDATE, COPY].includes(role.RoleForm?.type as ENUM_SCOPE_TYPE)) {
      const [err, res] = await to(
        Promise.all([
          queryResources({ current: 1, pageSize: 1000 }),
          queryScopes({ current: 1, pageSize: 1000 }),
          getAllMenus({ 'role.id': role.RoleForm?.itemEdit?.id }),
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
    }
  }, [role.RoleForm?.type]);

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
                  props.form.setFieldsValue({ menus: state.menus });
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
            checked={record.scopes.map((it) => it.id).includes(scope.id)}
            onChange={(event) => {
              if (event.target.checked) {
                record.scopes.push({ id: scope.id } as ScopeItem);
                record.scopes = _.unionBy(record.scopes, 'id');
              } else {
                record.scopes = record.scopes.filter((it) => it.id !== scope.id);
              }
              props.form.setFieldsValue({ menus: state.menus });
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

                  props.form.setFieldsValue({ menus: state.menus });
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

              props.form.setFieldsValue({ menus: state.menus });
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
          rowKey={(_, i) => `${i}`}
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

  if (!role.RoleForm?.type) return null;
  return (
    <>
      <Form.Item name="menus" hidden />
      {renderTree(state.menus)}
    </>
  );
};

export default RoleChildList;
