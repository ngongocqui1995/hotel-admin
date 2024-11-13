import { getAllRoomTypes } from '@/pages/Hotel/RoomType/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectRoomType: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="room_type"
      label={formatMessage({ id: 'pages.room_type', defaultMessage: 'Loại phòng' })}
      showSearch
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.room_type.required',
            defaultMessage: 'Loại phòng là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllRoomTypes({
          ...params,
          status: ENUM_STATUS.ACTIVE,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.name }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.room_type.placeholder',
          defaultMessage: 'Chọn loại phòng.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectRoomType;
