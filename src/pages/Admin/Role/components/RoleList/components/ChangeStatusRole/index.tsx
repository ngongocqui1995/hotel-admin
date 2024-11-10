import { RoleItem } from '@/pages/Admin/Role/data';
import { RoleModalState } from '@/pages/Admin/Role/model';
import { changeStatusRole } from '@/pages/Admin/Role/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusRoleProps {
  status: string;
  record: RoleItem;
}

const ChangeStatusRole: React.FC<ChangeStatusRoleProps> = ({ status, record }) => {
  const role: RoleModalState = useSelector((state: any) => state?.role);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusRole(record.id, checked ? ACTIVE : INACTIVE);
    if (res) role.RoleList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusRole;
