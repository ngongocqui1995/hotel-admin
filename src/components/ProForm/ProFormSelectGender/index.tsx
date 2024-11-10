import { LocalesLocal, getFormatMessage } from '@/utils/utils';
import { GENDER } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';

const ProFormSelectGender: React.FC<ProFormSelectProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormSelect
      name="gender"
      label={formatMessage({ id: 'pages.gender', defaultMessage: 'Giới tính' })}
      showSearch
      request={async () => {
        return GENDER?.map((it) => ({
          value: it.key,
          label: formatMessage({ id: it.id as LocalesLocal, defaultMessage: it.text }),
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: formatMessage({
          id: 'pages.gender.placeholder',
          defaultMessage: 'Chọn giới tính.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectGender;
