import { getFormatMessage } from '@/utils/utils';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const ProFormTextEmail: React.FC = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormText
      name="email"
      label="Email"
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.email.required',
            defaultMessage: 'Email là bắt buộc!',
          }),
        },
        {
          type: 'email',
          message: formatMessage({
            id: 'pages.email.invalid',
            defaultMessage: 'Email không hợp lệ!',
          }),
        },
      ]}
      placeholder={formatMessage({
        id: 'pages.email.placeholder',
        defaultMessage: 'Nhập email',
      })}
      {...props}
    />
  );
};

export default ProFormTextEmail;
