import { AvatarDropdown, AvatarName, Footer } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, SelectLang } from '@umijs/max';
import React from 'react';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { getKeyFromString, getLocales, importLocale } from './utils/utils';
import { ENUM_RESOURCE, ENUM_SCOPE_TYPE, loginPath } from './utils/utils.enum';
import { authProfile } from './pages/Auth/Login/services';
import uniqolor from 'uniqolor';
import _ from 'lodash';
import { AvatarIcon } from './components/RightContent/AvatarDropdown';
import AccessPage from './pages/403';
import NoFoundPage from './pages/404';
import { MenuItem } from './pages/Admin/Role/data';
import { UserItem } from './pages/Admin/User/data';
import Role from './pages/Admin/Role';
import User from './pages/Admin/User';
import Resource from './pages/Admin/Resource';
import Scope from './pages/Admin/Scope';
import Account from './pages/Account';
import to from 'await-to-js';

let menus: MenuItem[];
let userInfo: UserItem | undefined;

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserItem;
  loading?: boolean;
  fetchUserInfo?: () => Promise<UserItem | undefined>;
}> {
  importLocale();

  // const [, userInfo] = await to(authProfile());
  return {
    currentUser: userInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

const RESOURCE_COMPONENT = {
  [ENUM_RESOURCE.ROLE]: <Role />,
  [ENUM_RESOURCE.USER]: <User />,
  [ENUM_RESOURCE.RESOURCE]: <Resource />,
  [ENUM_RESOURCE.SCOPE]: <Scope />,
  [ENUM_RESOURCE.PROFILE]: <Account />,
};

const getChildrenRoute = (menus: MenuItem[]): any[] => {
  if (!Array.isArray(menus)) return [];

  const filterMenus = menus?.filter?.((item) =>
    item.scopes.map((scope) => scope.code).includes(ENUM_SCOPE_TYPE.BROWSE),
  );
  const children = filterMenus?.map?.((item) => ({
    path: getKeyFromString(item.resource.code, false, '-'),
    name: item.resource.name,
    hideInMenu: item.resource.hide_in_menu,
    element: _.get(RESOURCE_COMPONENT, item.resource.code),
    children: getChildrenRoute(item?.menus || []),
  }));
  return children;
};

export const patchClientRoutes = ({ routes }: { routes: any[] }) => {
  if (window.location.pathname === loginPath || !menus) return;

  const antdRoutes = routes.find((route) => route?.id === 'ant-design-pro-layout')?.children || [];
  menus?.forEach((menu) => {
    if (menu.scopes.map((scope) => scope.code).includes(ENUM_SCOPE_TYPE.BROWSE)) {
      antdRoutes.push({
        path: getKeyFromString(menu.resource.code, false, '-'),
        name: menu.resource.name,
        hideInMenu: menu.resource.hide_in_menu,
        element: _.get(RESOURCE_COMPONENT, menu.resource.code),
        children: getChildrenRoute(menu.menus),
      });
    }
  });
};

export const render = async (oldRender: any) => {
  const [err, res] = await to(authProfile());
  if (err) {
    oldRender();
    return;
  }

  userInfo = res;
  menus = res?.role?.menus || [];
  oldRender();
};

// ProLayout https://procomponents.ant.design/components/layout
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    actionsRender: () => [<SelectLang key="SelectLang" postLocalesData={() => getLocales()} />],
    avatarProps: {
      title: <AvatarName />,
      icon: <AvatarIcon />,
      size: 'small',
      gap: 4,
      style: !initialState?.currentUser?.avatar && {
        verticalAlign: 'center',
        backgroundColor: uniqolor(initialState?.currentUser?.id || '').color,
        display: 'flex',
        justifyContent: 'center',
      },
      render: (_: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    formatMessage: false,
    waterMarkProps: {
      content: '', // waterMark empty
    },
    contentStyle: { padding: 0 },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    headerTitleRender: () => (
      <a>{<img src="/logo.png" style={{ height: 22, padding: '0 10px' }} />}</a>
    ),
    unAccessible: <AccessPage />,
    noFound: <NoFoundPage />,
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request
 * @doc https://umijs.org/docs/max/request#
 */
export const request = {
  ...errorConfig,
};
