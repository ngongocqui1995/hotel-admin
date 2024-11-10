import { ENUM_RESOURCE, ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useAccess, useDispatch } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const CreateScope: React.FC = () => {
  const dispatch = useDispatch();
  const access = useAccess();
  const { SCOPE } = ENUM_RESOURCE;
  const { CREATE } = ENUM_SCOPE_TYPE;

  const handleClick = () => {
    dispatch({ type: 'scope/updateScopeForm', payload: { type: CREATE } });
  };

  return (
    <Button
      className={`${access.getAccessClass(SCOPE, [CREATE])}`}
      type="primary"
      onClick={handleClick}
      icon={<PlusOutlined />}
    >
      <FormattedMessage id="pages.create" defaultMessage="Tạo mới" />
    </Button>
  );
};

export default CreateScope;
