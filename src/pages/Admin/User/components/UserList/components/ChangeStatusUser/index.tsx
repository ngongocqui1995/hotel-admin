import { UserItem } from '@/pages/Admin/User/data';
import { UserModalState } from '@/pages/Admin/User/model';
import { changeStatusUser } from '@/pages/Admin/User/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusUserProps {
  status: string;
  record: UserItem;
}

const ChangeStatusUser: React.FC<ChangeStatusUserProps> = ({ status, record }) => {
  const user: UserModalState = useSelector((state: any) => state?.user);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusUser(record.id, checked ? ACTIVE : INACTIVE);
    if (res) user.UserList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusUser;
