import ChangePassword from '@/pages/Account/components/SecurityView/components/ChangePassword';
import { getFormatMessage } from '@/utils/utils';
import { List } from 'antd';
import React, { useState } from 'react';

const SecurityView: React.FC = () => {
  const formatMessage = getFormatMessage();
  const [isChangePassword, setIsChangePassword] = useState(false);

  const getData = () => [
    {
      title: formatMessage({
        id: 'pages.password.change',
        defaultMessage: 'Thay đổi mật khẩu',
      }),
      description: `${formatMessage({
        id: 'pages.current_password',
        defaultMessage: 'Mật khẩu hiện tại',
      })}：******`,
      actions: [
        <a key="change-password" onClick={() => setIsChangePassword(true)}>
          {formatMessage({ id: 'pages.change', defaultMessage: 'Thay đổi' })}
        </a>,
      ],
    },
  ];

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <ChangePassword modalVisible={isChangePassword} onCancel={() => setIsChangePassword(false)} />
    </div>
  );
};

export default SecurityView;
