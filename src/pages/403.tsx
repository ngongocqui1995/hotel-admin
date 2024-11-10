import { ResultProps, Result } from 'antd';
import React from 'react';

const AccessPage: React.FC<ResultProps> = (props) => (
  <Result status="403" title="403" subTitle="Bạn không có quyền truy cập trang này." {...props} />
);

export default AccessPage;
