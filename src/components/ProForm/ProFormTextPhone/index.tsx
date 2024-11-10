import { getFormatMessage, regPhoneNumber } from '@/utils/utils';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const ProFormTextPhone: React.FC = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormText
      name="phone"
      label={formatMessage({ id: 'pages.phone', defaultMessage: 'Số điện thoại' })}
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.phone.required',
            defaultMessage: 'Số điện thoại là bắt buộc!',
          }),
        },
        {
          validator: (rule: any, value: any, callback: (error?: string) => void) => {
            const reg = new RegExp(regPhoneNumber, 'i');
            if (!reg.test(value))
              return callback(
                formatMessage({
                  id: 'pages.ProForm.TextPhone.errors.invalid',
                  defaultMessage: 'Số điện thoại không đúng định dạng!',
                }),
              );

            return callback();
          },
        },
      ]}
      placeholder={formatMessage({
        id: 'pages.phone.placeholder',
        defaultMessage: 'Nhập số điện thoại',
      })}
      {...props}
    />
  );
};

export default ProFormTextPhone;
