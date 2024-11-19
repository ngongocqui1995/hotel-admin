import { ENUM_RESOURCE, ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useAccess, useDispatch } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const CreateRootUser: React.FC = () => {
  const dispatch = useDispatch();
  const access = useAccess();
  const { CREATE } = ENUM_SCOPE_TYPE;
  const { CUSTOMER } = ENUM_RESOURCE;

  const handleClick = () => {
    dispatch({ type: 'rootUser/updateRootUserForm', payload: { type: CREATE } });
  };

  return (
    <Button
      className={`${access.getAccessClass(CUSTOMER, [CREATE])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create" defaultMessage="Tạo mới" />
    </Button>
  );
};

export default CreateRootUser;
