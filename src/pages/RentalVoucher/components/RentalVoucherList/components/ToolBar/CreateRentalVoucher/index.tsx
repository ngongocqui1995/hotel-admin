import { ENUM_RESOURCE, ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useAccess, useDispatch } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const CreateRentalVoucher: React.FC = () => {
  const dispatch = useDispatch();
  const access = useAccess();
  const { RENTAL_VOUCHER } = ENUM_RESOURCE;
  const { CREATE } = ENUM_SCOPE_TYPE;

  const handleClick = () => {
    dispatch({ type: 'rentalVoucher/updateRentalVoucherForm', payload: { type: CREATE } });
  };

  return (
    <Button
      className={`${access.getAccessClass(RENTAL_VOUCHER, [CREATE])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create" defaultMessage="Tạo mới" />
    </Button>
  );
};

export default CreateRentalVoucher;
