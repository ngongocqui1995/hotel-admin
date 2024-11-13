import { getAllAreas } from '@/pages/Hotel/Area/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectArea: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="area"
      label={formatMessage({ id: 'pages.area', defaultMessage: 'Khu vực' })}
      showSearch
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.area.required',
            defaultMessage: 'Khu vực là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllAreas({
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
          id: 'pages.area.placeholder',
          defaultMessage: 'Chọn khu vực.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectArea;
