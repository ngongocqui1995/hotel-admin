import RoomForm from '@/pages/Hotel/Room/components/RoomForm';
import RoomList from '@/pages/Hotel/Room/components/RoomList';
import { PageContainer } from '@ant-design/pro-layout';
import { useDispatch } from '@umijs/max';
import React, { useEffect } from 'react';

const Room: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'room/reset' });
  }, []);

  return (
    <PageContainer>
      <RoomForm />
      <RoomList />
    </PageContainer>
  );
};

export default Room;
