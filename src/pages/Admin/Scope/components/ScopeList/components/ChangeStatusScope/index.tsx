import { ScopeItem } from '@/pages/Admin/Scope/data';
import { ScopeModalState } from '@/pages/Admin/Scope/model';
import { changeStatusScope } from '@/pages/Admin/Scope/service';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { useSelector } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

interface ChangeStatusScopeProps {
  status: string;
  record: ScopeItem;
}

const ChangeStatusScope: React.FC<ChangeStatusScopeProps> = ({ status, record }) => {
  const scope: ScopeModalState = useSelector((state: any) => state?.scope);
  const { ACTIVE, INACTIVE } = ENUM_STATUS;

  const onChange = async (checked: boolean) => {
    const status = checked ? ACTIVE : INACTIVE;
    const res = await changeStatusScope(record.id, status);
    if (res) scope.ScopeList?.reload?.();
  };

  return <Switch checked={status === ACTIVE} onChange={onChange} />;
};

export default ChangeStatusScope;
