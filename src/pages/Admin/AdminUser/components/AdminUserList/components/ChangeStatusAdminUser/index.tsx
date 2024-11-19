import { AdminUserItem } from '@/pages/Admin/AdminUser/data';
import { AdminUserModalState } from '@/pages/Admin/AdminUser/model';
import { changeStatusAdminUser } from '@/pages/Admin/AdminUser/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusAdminUserProps {
  status: string;
  record: AdminUserItem;
}

const ChangeStatusAdminUser: React.FC<ChangeStatusAdminUserProps> = ({ status, record }) => {
  const adminUser: AdminUserModalState = useSelector((state: any) => state?.adminUser);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusAdminUser(record.id, checked ? ACTIVE : INACTIVE);
    if (res) adminUser.AdminUserList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusAdminUser;
