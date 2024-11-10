import ScopeForm from '@/pages/Admin/Scope/components/ScopeForm';
import ScopeList from '@/pages/Admin/Scope/components/ScopeList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const Scope: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'scope/reset' });
  }, []);

  return (
    <PageContainer>
      <ScopeForm />
      <ScopeList />
    </PageContainer>
  );
};

export default Scope;
