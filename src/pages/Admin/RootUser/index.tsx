import RootForm from '@/pages/Admin/RootUser/components/RootUserForm';
import RootList from '@/pages/Admin/RootUser/components/RootUserList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const RootUser: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'rootUser/reset' });
  }, []);

  return (
    <PageContainer>
      <RootList />
      <RootForm />
    </PageContainer>
  );
};

export default RootUser;
