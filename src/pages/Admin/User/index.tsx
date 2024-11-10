import UserForm from '@/pages/Admin/User/components/UserForm';
import UserList from '@/pages/Admin/User/components/UserList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const User: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'user/reset' });
  }, []);

  return (
    <PageContainer>
      <UserList />
      <UserForm />
    </PageContainer>
  );
};

export default User;
