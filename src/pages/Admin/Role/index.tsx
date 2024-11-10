import RoleForm from '@/pages/Admin/Role/components/RoleForm';
import RoleList from '@/pages/Admin/Role/components/RoleList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const Role: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'role/reset' });
  }, []);

  return (
    <PageContainer>
      <RoleForm />
      <RoleList />
    </PageContainer>
  );
};

export default Role;
