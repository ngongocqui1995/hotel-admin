import enUS from '@/locales/en-US/proTable';
import viVN from '@/locales/vi-VN/proTable';
import { ProProvider, createIntl } from '@ant-design/pro-components';
import { getLocale } from '@umijs/max';
import React, { useContext } from 'react';

interface LocaleProTableProps {
  localeVN?: any;
  localeEN?: any;
  children?: React.ReactNode;
}

const LocaleProTable: React.FC<LocaleProTableProps> = ({ localeVN, localeEN, children }) => {
  const viVNIntl = createIntl('vi-VN', localeVN || viVN);
  const enUSIntl = createIntl('en-US', localeEN || enUS);
  const values = useContext(ProProvider);

  const intlMap = {
    'vi-VN': viVNIntl,
    'en-US': enUSIntl,
  };

  type intlMapKey = keyof typeof intlMap;

  return (
    <ProProvider.Provider value={{ ...values, intl: intlMap[getLocale() as intlMapKey] }}>
      {children}
    </ProProvider.Provider>
  );
};

export default LocaleProTable;
