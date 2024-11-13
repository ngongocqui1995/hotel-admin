import RoomTypeForm from '@/pages/Hotel/RoomType/components/RoomTypeForm';
import RoomTypeList from '@/pages/Hotel/RoomType/components/RoomTypeList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const RoomType: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'roomType/reset' });
  }, []);

  return (
    <PageContainer>
      <RoomTypeForm />
      <RoomTypeList />
    </PageContainer>
  );
};

export default RoomType;
