import { RoomTypeItem } from '@/pages/Hotel/RoomType/data';
import { RoomTypeModalState } from '@/pages/Hotel/RoomType/model';
import { changeStatusRoomType } from '@/pages/Hotel/RoomType/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusRoomTypeProps {
  status: string;
  record: RoomTypeItem;
}

const ChangeStatusRoomType: React.FC<ChangeStatusRoomTypeProps> = ({ status, record }) => {
  const roomType: RoomTypeModalState = useSelector((state: any) => state?.roomType);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusRoomType(record.id, checked ? ACTIVE : INACTIVE);
    if (res) roomType.RoomTypeList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusRoomType;
