import { AreaItem } from '@/pages/Hotel/Area/data';
import { AreaModalState } from '@/pages/Hotel/Area/model';
import { changeStatusArea } from '@/pages/Hotel/Area/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusAreaProps {
  status: string;
  record: AreaItem;
}

const ChangeStatusArea: React.FC<ChangeStatusAreaProps> = ({ status, record }) => {
  const area: AreaModalState = useSelector((state: any) => state?.area);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusArea(record.id, checked ? ACTIVE : INACTIVE);
    if (res) area.AreaList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusArea;
