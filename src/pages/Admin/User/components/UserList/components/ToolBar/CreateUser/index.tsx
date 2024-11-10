import { ENUM_RESOURCE, ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useAccess, useDispatch } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const CreateUser: React.FC = () => {
  const dispatch = useDispatch();
  const access = useAccess();
  const { CREATE } = ENUM_SCOPE_TYPE;
  const { USER } = ENUM_RESOURCE;

  const handleClick = () => {
    dispatch({ type: 'user/updateUserForm', payload: { type: CREATE } });
  };

  return (
    <Button
      className={`${access.getAccessClass(USER, [CREATE])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create" defaultMessage="Tạo mới" />
    </Button>
  );
};

export default CreateUser;
