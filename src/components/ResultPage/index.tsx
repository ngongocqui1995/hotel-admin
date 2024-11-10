import { history } from '@umijs/max';
import { Button, Result, ResultProps } from 'antd';

const ResultPage: React.FC<ResultProps> = (props) => {
  return (
    <Result
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Quay lại trang chủ
        </Button>
      }
      {...props}
    />
  );
};

export default ResultPage;
