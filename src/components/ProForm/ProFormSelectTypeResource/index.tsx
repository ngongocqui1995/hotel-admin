import { LocalesLocal, getFormatMessage } from '@/utils/utils';
import { RESOURCE_TYPE } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectTypeResource: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="type"
      width="md"
      label={formatMessage({ id: 'pages.type', defaultMessage: 'Loại' })}
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.type.required',
            defaultMessage: 'Loại là bắt buộc!',
          }),
        },
      ]}
      showSearch
      request={async () => {
        return Object.entries(RESOURCE_TYPE).map(([key, value]) => ({
          value: key,
          label: formatMessage({ id: value.id as LocalesLocal, defaultMessage: value.text }),
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectTypeResource;
