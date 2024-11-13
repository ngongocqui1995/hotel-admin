import CustomerForm from '@/pages/Admin/Customer/components/CustomerForm';
import CustomerList from '@/pages/Admin/Customer/components/CustomerList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const Customer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'customer/reset' });
  }, []);

  return (
    <PageContainer>
      <CustomerList />
      <CustomerForm />
    </PageContainer>
  );
};

export default Customer;
