import ResourceForm from '@/pages/Admin/Resource/components/ResourceForm';
import ResourceList from '@/pages/Admin/Resource/components/ResourceList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const Resource: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'resource/reset' });
  }, []);

  return (
    <PageContainer>
      <ResourceForm />
      <ResourceList />
    </PageContainer>
  );
};

export default Resource;
