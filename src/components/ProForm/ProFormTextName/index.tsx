import { getFormatMessage } from '@/utils/utils';
import { ProFormText } from '@ant-design/pro-form';
import { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing';
import { InputProps, InputRef } from 'antd';
import React from 'react';

const ProFormTextName: React.FC<ProFormFieldItemProps<InputProps, InputRef>> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormText
      name="name"
      width="md"
      label={formatMessage({ id: 'pages.name', defaultMessage: 'Tên' })}
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.name.required',
            defaultMessage: 'Tên là bắt buộc!',
          }),
        },
      ]}
      placeholder={formatMessage({ id: 'pages.name.placeholder', defaultMessage: 'Nhập tên' })}
      {...props}
    />
  );
};

export default ProFormTextName;
