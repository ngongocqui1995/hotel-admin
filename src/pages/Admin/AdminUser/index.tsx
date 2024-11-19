import AdminUserForm from '@/pages/Admin/AdminUser/components/AdminUserForm';
import AdminUserList from '@/pages/Admin/AdminUser/components/AdminUserList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const AdminUser: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'adminUser/reset' });
  }, []);

  return (
    <PageContainer>
      <AdminUserList />
      <AdminUserForm />
    </PageContainer>
  );
};

export default AdminUser;
