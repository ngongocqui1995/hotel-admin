import { RentalVoucherItem } from '@/pages/RentalVoucher/data';
import { RentalVoucherModalState } from '@/pages/RentalVoucher/model';
import { changeStatusRentalVoucher } from '@/pages/RentalVoucher/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusRentalVoucherProps {
  status: string;
  record: RentalVoucherItem;
}

const ChangeStatusRentalVoucher: React.FC<ChangeStatusRentalVoucherProps> = ({
  status,
  record,
}) => {
  const rentalVoucher: RentalVoucherModalState = useSelector((state: any) => state?.rentalVoucher);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const res = await changeStatusRentalVoucher(record.id, checked ? ACTIVE : INACTIVE);
    if (res) rentalVoucher.RentalVoucherList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusRentalVoucher;
