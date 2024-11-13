import { FloorItem } from '@/pages/Hotel/Floor/data';
import { FloorModalState } from '@/pages/Hotel/Floor/model';
import { changeStatusFloor } from '@/pages/Hotel/Floor/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusFloorProps {
  status: string;
  record: FloorItem;
}

const ChangeStatusFloor: React.FC<ChangeStatusFloorProps> = ({ status, record }) => {
  const floor: FloorModalState = useSelector((state: any) => state?.floor);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusFloor(record.id, checked ? ACTIVE : INACTIVE);
    if (res) floor.FloorList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusFloor;
