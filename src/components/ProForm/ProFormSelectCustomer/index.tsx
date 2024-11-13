import { getAllCustomers } from '@/pages/Admin/Customer/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectCustomer: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="customers"
      label={formatMessage({ id: 'pages.customer', defaultMessage: 'Khách hàng' })}
      showSearch
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.customer.required',
            defaultMessage: 'Khách hàng là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllCustomers({
          ...params,
          status: ENUM_STATUS.ACTIVE,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({
          value: `${it.id}`,
          label: `${it.name} - ${it.phone} - ${it.email}`,
          item: it,
        }));
      }}
      {...props}
      params={{ ...props.params }}
      mode="multiple"
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.customer.placeholder',
          defaultMessage: 'Chọn khách hàng.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectCustomer;
