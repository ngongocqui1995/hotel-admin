import { getFormatMessage } from '@/utils/utils';
import { ProFormSwitch, ProFormSwitchProps } from '@ant-design/pro-components';
import React from 'react';

const ProFormHideInMenu: React.FC<ProFormSwitchProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSwitch
      name="hide_in_menu"
      width="md"
      label={formatMessage({ id: 'pages.hide_in_menu', defaultMessage: 'Ẩn trong menu' })}
      {...props}
    />
  );
};

export default ProFormHideInMenu;
