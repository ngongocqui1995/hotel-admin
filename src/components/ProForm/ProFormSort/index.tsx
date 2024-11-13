import { getFormatMessage } from '@/utils/utils';
import { ProFormDigitProps } from '@ant-design/pro-components';
import { ProFormDigit } from '@ant-design/pro-form';
import React from 'react';

const ProFormSort: React.FC<ProFormDigitProps> = (props) => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormDigit
      name="sort"
      width="md"
      label={formatMessage({ id: 'pages.sort', defaultMessage: 'Sắp xếp' })}
      {...props}
    />
  );
};

export default ProFormSort;
