import { ENUM_RESOURCE, ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useAccess, useDispatch } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const CreateRole: React.FC = () => {
  const dispatch = useDispatch();
  const access = useAccess();
  const { CREATE } = ENUM_SCOPE_TYPE;
  const { ROLE } = ENUM_RESOURCE;

  const handleClick = () => {
    dispatch({ type: 'role/updateRoleForm', payload: { type: CREATE } });
  };

  return (
    <Button
      className={`${access.getAccessClass(ROLE, [CREATE])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create" defaultMessage="Tạo mới" />
    </Button>
  );
};

export default CreateRole;
