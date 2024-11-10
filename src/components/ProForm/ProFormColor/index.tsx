import { getFormatMessage } from '@/utils/utils';
import { ProFormColorPicker, ProFormColorPickerProps } from '@ant-design/pro-components';
import React from 'react';

const ProFormColor: React.FC<ProFormColorPickerProps> = () => {
  const formatMessage = getFormatMessage();

  return (
    <ProFormColorPicker
      name="color"
      label={formatMessage({ id: 'pages.color', defaultMessage: 'Màu sắc' })}
      getValueFromEvent={(_, hex) => {
        return hex;
      }}
    />
  );
};

export default ProFormColor;
