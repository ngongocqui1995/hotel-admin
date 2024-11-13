import { getAllFloors } from '@/pages/Hotel/Floor/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectFloor: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="floor"
      label={formatMessage({ id: 'pages.floor', defaultMessage: 'Tầng' })}
      showSearch
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.floor.required',
            defaultMessage: 'Tầng là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllFloors({
          ...params,
          status: ENUM_STATUS.ACTIVE,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.name, item: it }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.floor.placeholder',
          defaultMessage: 'Chọn tầng.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectFloor;
