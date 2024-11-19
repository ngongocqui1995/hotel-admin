import { RootUserItem } from '@/pages/Admin/RootUser/data';
import { RootUserModalState } from '@/pages/Admin/RootUser/model';
import { changeStatusRootUser } from '@/pages/Admin/RootUser/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusRootUserProps {
  status: string;
  record: RootUserItem;
}

const ChangeStatusRootUser: React.FC<ChangeStatusRootUserProps> = ({ status, record }) => {
  const rootUser: RootUserModalState = useSelector((state: any) => state?.rootUser);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusRootUser(record.id, checked ? ACTIVE : INACTIVE);
    if (res) rootUser.RootUserList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusRootUser;
