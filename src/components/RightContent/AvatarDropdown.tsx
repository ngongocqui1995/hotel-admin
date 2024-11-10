import { getFormatMessage, getSettingDrawer, removeToken } from '@/utils/utils';
import { ENUM_RESOURCE, ENUM_SCOPE_TYPE, loginPath } from '@/utils/utils.enum';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useAccess, useModel } from '@umijs/max';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const settingDrawer = getSettingDrawer();
  const { layout } = settingDrawer;

  const useAvatarStyles = createStyles(() => {
    if (layout === 'top')
      return {
        avatar: {
          marginRight: 8,
          color: 'black',
          [`@media screen and (max-width: 450px)`]: {
            display: 'none',
          },
        },
      };
    else
      return {
        avatar: {
          marginRight: 8,
          maxHeight: 100,
          maxWidth: 115,
          color: 'black',
          [`@media screen and (max-width: 450px)`]: {
            display: 'none',
          },
        },
      };
  });

  const { styles } = useAvatarStyles();

  return <span className={styles.avatar}>{currentUser?.name}</span>;
};

export const AvatarIcon = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return <span>{currentUser?.name?.charAt(0)?.toUpperCase()}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const formatMessage = getFormatMessage();
  const access = useAccess();
  const navigate = useNavigate();
  const useActionStyles = createStyles(({ token }) => {
    return {
      action: {
        display: 'flex',
        height: '48px',
        marginLeft: 'auto',
        overflow: 'hidden',
        alignItems: 'center',
        padding: '0 8px',
        cursor: 'pointer',
        borderRadius: token.borderRadius,
        '&:hover': {
          backgroundColor: token.colorBgTextHover,
        },
      },
    };
  });
  const { styles } = useActionStyles();
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = async (event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      flushSync(() => {
        setInitialState((s: any) => ({ ...s, currentUser: undefined }));
      });
      removeToken();
      navigate(loginPath);
      return;
    }

    navigate(`profile`);
  };

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser?.name) {
    return loading;
  }

  const menuItems = [
    {
      key: access.getPath(ENUM_RESOURCE.PROFILE),
      icon: <UserOutlined />,
      label: access.getTitle(ENUM_RESOURCE.PROFILE, false),
      access: access.getAccess(ENUM_RESOURCE.PROFILE, [ENUM_SCOPE_TYPE.BROWSE]),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: formatMessage({ id: 'pages.account.logout', defaultMessage: 'Đăng xuất' }),
      access: true,
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems.filter((m) => m.access),
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
