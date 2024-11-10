import { ResourceItem } from '@/pages/Admin/Resource/data';
import { ResourceModalState } from '@/pages/Admin/Resource/model';
import { changeStatusResource } from '@/pages/Admin/Resource/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusResourceProps {
  status: string;
  record: ResourceItem;
}

const ChangeStatusResource: React.FC<ChangeStatusResourceProps> = ({ status, record }) => {
  const resource: ResourceModalState = useSelector((state: any) => state?.resource);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusResource(record.id, checked ? ACTIVE : INACTIVE);
    if (res) resource.ResourceList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusResource;
