import { RoomItem } from '@/pages/Hotel/Room/data';
import { RoomModalState } from '@/pages/Hotel/Room/model';
import { changeStatusRoom } from '@/pages/Hotel/Room/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusRoomProps {
  status: string;
  record: RoomItem;
}

const ChangeStatusRoom: React.FC<ChangeStatusRoomProps> = ({ status, record }) => {
  const room: RoomModalState = useSelector((state: any) => state?.room);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusRoom(record.id, checked ? ACTIVE : INACTIVE);
    if (res) room.RoomList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusRoom;
