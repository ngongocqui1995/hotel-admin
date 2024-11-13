import FloorForm from '@/pages/Hotel/Floor/components/FloorForm';
import FloorList from '@/pages/Hotel/Floor/components/FloorList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const Floor: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'floor/reset' });
  }, []);

  return (
    <PageContainer>
      <FloorForm />
      <FloorList />
    </PageContainer>
  );
};

export default Floor;
