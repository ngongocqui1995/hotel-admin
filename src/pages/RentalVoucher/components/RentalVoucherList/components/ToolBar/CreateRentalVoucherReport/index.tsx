import { ENUM_RESOURCE, ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { PlusOutlined } from '@ant-design/icons';
import { useAccess, useDispatch } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const CreateRentalVoucherReport: React.FC = () => {
  const dispatch = useDispatch();
  const access = useAccess();
  const { RENTAL_VOUCHER } = ENUM_RESOURCE;
  const { CREATE } = ENUM_SCOPE_TYPE;

  const handleClick = () => {
    dispatch({ type: 'rentalVoucher/updateRentalVoucherReport', payload: { type: CREATE } });
  };

  return (
    <Button
      className={`${access.getAccessClass(RENTAL_VOUCHER, [CREATE])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      Lập phiếu thống kê doanh thu
    </Button>
  );
};

export default CreateRentalVoucherReport;
