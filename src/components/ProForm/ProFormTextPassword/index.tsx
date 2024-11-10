import { getFormatMessage, validationPassWord } from '@/utils/utils';
import { ProFormText } from '@ant-design/pro-form';
import { ColProps } from 'antd';
import { Rule } from 'antd/lib/form';
import React from 'react';

interface ProFormTextPasswordProps {
  name?: string;
  label?: string;
  placeholder?: string;
  labelCol?: ColProps | undefined;
  wrapperCol?: ColProps | undefined;
  rules?: Rule[];
}

const ProFormTextPassword: React.FC<ProFormTextPasswordProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormText.Password
      name="password"
      label={formatMessage({
        id: 'pages.password',
        defaultMessage: 'Mật khẩu',
      })}
      placeholder={formatMessage({
        id: 'pages.login.password.placeholder',
        defaultMessage: 'Nhập mật khẩu',
      })}
      {...props}
      rules={[
        {
          required: true,
          message: formatMessage({ id: 'pages.login.password.required' }),
        },
        { validator: (_, value) => validationPassWord('UPPERCASE', value) },
        { validator: (_, value) => validationPassWord('LOWERCASE', value) },
        { validator: (_, value) => validationPassWord('NUMBER', value) },
        { validator: (_, value) => validationPassWord('SPECIAL', value) },
        ...(props.rules || []),
      ]}
    />
  );
};

export default ProFormTextPassword;
