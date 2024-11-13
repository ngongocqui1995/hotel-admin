import { getAllRooms } from '@/pages/Hotel/Room/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_ROOM_STATUS, ENUM_STATUS } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectRoom: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="room"
      label={formatMessage({ id: 'pages.room', defaultMessage: 'Phòng' })}
      showSearch
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.room.required',
            defaultMessage: 'Phòng là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllRooms({
          ...params,
          status: ENUM_STATUS.ACTIVE,
          room_status: ENUM_ROOM_STATUS.AVAILABLE,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({
          value: `${it.id}`,
          label: `${it.key} - ${it.room_type?.name}`,
          item: it,
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.room.placeholder',
          defaultMessage: 'Chọn phòng.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectRoom;
