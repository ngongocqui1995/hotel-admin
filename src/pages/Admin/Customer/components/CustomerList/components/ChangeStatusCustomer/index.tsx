import { CustomerItem } from '@/pages/Admin/Customer/data';
import { CustomerModalState } from '@/pages/Admin/Customer/model';
import { changeStatusCustomer } from '@/pages/Admin/Customer/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusCustomerProps {
  status: string;
  record: CustomerItem;
}

const ChangeStatusCustomer: React.FC<ChangeStatusCustomerProps> = ({ status, record }) => {
  const customer: CustomerModalState = useSelector((state: any) => state?.customer);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusCustomer(record.id, checked ? ACTIVE : INACTIVE);
    if (res) customer.CustomerList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusCustomer;
