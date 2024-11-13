import RentalVoucherForm from '@/pages/RentalVoucher/components/RentalVoucherForm';
import RentalVoucherList from '@/pages/RentalVoucher/components/RentalVoucherList';
import RentalVoucherReport from '@/pages/RentalVoucher/components/RentalVoucherReport';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const RentalVoucher: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'rentalVoucher/reset' });
  }, []);

  return (
    <PageContainer>
      <RentalVoucherForm />
      <RentalVoucherList />
      <RentalVoucherReport />
    </PageContainer>
  );
};

export default RentalVoucher;
