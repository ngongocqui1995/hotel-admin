import { getFormatMessage } from '@/utils/utils';
import { ProFormDigitProps } from '@ant-design/pro-components';
import { ProFormDigit } from '@ant-design/pro-form';
import React from 'react';

const ProFormPrice: React.FC<ProFormDigitProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormDigit
      name="price"
      width="md"
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.price.required',
            defaultMessage: 'Giá tiền là bắt buộc.',
          }),
        },
      ]}
      label={formatMessage({ id: 'pages.price', defaultMessage: 'Giá tiền' })}
      placeholder={formatMessage({
        id: 'pages.price.placeholder',
        defaultMessage: 'Nhập giá tiền.',
      })}
      {...props}
    />
  );
};

export default ProFormPrice;
