import { getAllScopes } from '@/pages/Admin/Scope/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_STATUS } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectScope: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="scopes"
      width="md"
      label={formatMessage({ id: 'pages.scope', defaultMessage: 'Phạm vi' })}
      showSearch
      rules={[
        {
          required: true,
          message: formatMessage({
            id: 'pages.scope.required',
            defaultMessage: 'Phạm vi là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllScopes({
          ...params,
          status: ENUM_STATUS.ACTIVE,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.name }));
      }}
      {...props}
      mode="multiple"
      params={{ ...props.params }}
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.scope.placeholder',
          defaultMessage: 'Chọn phạm vi.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectScope;
