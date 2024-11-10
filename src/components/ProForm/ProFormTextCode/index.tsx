import { getFormatMessage } from '@/utils/utils';
import { ProFormText } from '@ant-design/pro-form';
import { ProFormFieldItemProps } from '@ant-design/pro-form/es/typing';
import { InputProps, InputRef } from 'antd';
import React from 'react';

interface ProFormTextCodeProps extends ProFormFieldItemProps<InputProps, InputRef> {
  upperCase?: boolean;
}

const ProFormTextCode: React.FC<ProFormTextCodeProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormText
      name="code"
      width="md"
      label={formatMessage({ id: 'pages.code', defaultMessage: 'Mã' })}
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.code.required',
            defaultMessage: 'Mã là bắt buộc!',
          }),
        },
      ]}
      placeholder={formatMessage({ id: 'pages.code.placeholder', defaultMessage: 'Nhập mã' })}
      normalize={props.upperCase ? (value) => value?.toUpperCase() : undefined}
      {...props}
    />
  );
};

export default ProFormTextCode;
