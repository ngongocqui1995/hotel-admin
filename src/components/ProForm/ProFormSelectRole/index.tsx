import { getAllRoles } from '@/pages/Admin/Role/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectRole: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="role"
      label={formatMessage({ id: 'pages.role', defaultMessage: 'Role' })}
      showSearch
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.role.required',
            defaultMessage: 'Role là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllRoles({
          ...params,
          status: ENUM_STATUS.ACTIVE,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.name }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.role.placeholder',
          defaultMessage: 'Chọn role.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectRole;
