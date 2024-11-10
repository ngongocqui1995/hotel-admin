import { MenuItem } from '@/pages/Admin/Role/data';
import { ScopeItem } from '@/pages/Admin/Scope/data';
import { UserItem } from '@/pages/Admin/User/data';
import { getKeyFromString } from '@/utils/utils';
import { ENUM_RESOURCE_KEYS, ENUM_SCOPE_TYPE_KEYS } from '@/utils/utils.enum';
import _ from 'lodash';

type AccessScopeParams = {
  resource: ENUM_RESOURCE_KEYS;
  scopes: ENUM_SCOPE_TYPE_KEYS[];
  menus: MenuItem[];
  lowerCase?: boolean;
};

type AccessParams = {
  getAccess: (resource: ENUM_RESOURCE_KEYS, scopes: ENUM_SCOPE_TYPE_KEYS[]) => boolean;
  getAccessClass: (resource: ENUM_RESOURCE_KEYS, scopes: ENUM_SCOPE_TYPE_KEYS[]) => string;
  getTitle: (resource: ENUM_RESOURCE_KEYS, lowerCase?: boolean) => string;
  getPath: (resource: ENUM_RESOURCE_KEYS) => string;
};

const getMenuPath = (
  menus: MenuItem[],
  targetCode: ENUM_RESOURCE_KEYS,
  path: string[] = [],
): string[] | null => {
  for (const menu of menus) {
    if (menu.resource.code === targetCode) {
      return [...path, getKeyFromString(menu.resource.code, false, '-')];
    }

    if (menu.menus) {
      const foundPath = getMenuPath(menu.menus, targetCode, [
        ...path,
        getKeyFromString(menu.resource.code, false, '-'),
      ]);

      if (foundPath) {
        return foundPath;
      }
    }
  }

  return null;
};

const getMenuFlatten = (menus: MenuItem[], key: string = 'menus') => {
  const getNodes = (data: any[]): any[] => {
    const check = data.some((item) => item?.[key]?.length > 0);
    if (!check) return data;

    const nodes = _(data)
      .thru((coll: any[]) => {
        return _.union(
          coll.map((it) => ({ ...it, [key]: [] })),
          _.map(coll, key).filter((it) => it),
        );
      })
      .flatten()
      .value();

    return getNodes(nodes);
  };

  return getNodes(menus);
};

const getAccessScope = (data: AccessScopeParams) => {
  const menus: MenuItem[] = getMenuFlatten(data.menus);

  const findResource = menus.find((it) => it?.resource.code === data.resource);

  return data.scopes?.some((it) =>
    findResource?.scopes?.map((scope: ScopeItem) => scope.code)?.includes?.(it),
  );
};

const getAccessScopeClass = (data: AccessScopeParams) => {
  const access = getAccessScope(data);
  return access ? '' : 'hidden';
};

const getTitle = (data: AccessScopeParams) => {
  const menus: MenuItem[] = getMenuFlatten(data.menus);
  const findResource = menus.find((it) => it?.resource.code === data.resource);

  if (data.lowerCase) return String(findResource?.resource?.name || '').toLowerCase();
  return findResource?.resource?.name || '';
};

const getPath = (data: AccessScopeParams) => {
  const menuPath = getMenuPath(data.menus, data.resource);
  return menuPath ? `/${menuPath.join('/')}` : '';
};

export default function access(initialState: { currentUser?: UserItem | undefined }): AccessParams {
  const menus = initialState?.currentUser?.role?.menus || [];

  return {
    getAccess: (resource: ENUM_RESOURCE_KEYS, scopes: ENUM_SCOPE_TYPE_KEYS[]) =>
      getAccessScope({ resource, scopes, menus }),
    getAccessClass: (resource: ENUM_RESOURCE_KEYS, scopes: ENUM_SCOPE_TYPE_KEYS[]) =>
      getAccessScopeClass({ resource, scopes, menus }),
    getTitle: (resource: ENUM_RESOURCE_KEYS, lowerCase: boolean = true) =>
      getTitle({ resource, menus, scopes: [], lowerCase }),
    getPath: (resource: ENUM_RESOURCE_KEYS) => getPath({ resource, menus, scopes: [] }),
  };
}
