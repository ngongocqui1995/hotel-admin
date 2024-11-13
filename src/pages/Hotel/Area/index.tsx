import AreaForm from '@/pages/Hotel/Area/components/AreaForm';
import AreaList from '@/pages/Hotel/Area/components/AreaList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const Area: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'area/reset' });
  }, []);

  return (
    <PageContainer>
      <AreaForm />
      <AreaList />
    </PageContainer>
  );
};

export default Area;
