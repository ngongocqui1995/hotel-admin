import {
  SelectGender,
  SelectRole,
  TextEmail,
  TextName,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import styles from '@/pages/Account/components/BaseView/styles.less';
import { updateUser } from '@/pages/Admin/User/service';
import { authProfile } from '@/pages/Auth/Login/services';
import { getFormatMessage } from '@/utils/utils';
import ProForm from '@ant-design/pro-form';
import { useModel } from '@umijs/max';
import { Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const formLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const BaseView: React.FC = () => {
  const formatMessage = getFormatMessage();
  const [form] = ProForm.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      ...initialState?.currentUser,
      role: initialState?.currentUser?.role?.id,
    });
  }, [initialState]);

  const fetchUserInfo = async () => {
    setLoading(true);
    const userInfo = await authProfile();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
    setLoading(false);
  };

  return (
    <Spin size="large" spinning={loading}>
      <ProForm
        form={form}
        {...formLayout}
        layout="horizontal"
        hideRequiredMark
        onFinish={async (values) => {
          const res = await updateUser(initialState?.currentUser?.id || '', values);
          if (res) await fetchUserInfo();
        }}
        submitter={{
          render: (_, dom) => <Space className={'flex justify-start mt-4'}>{dom}</Space>,
          searchConfig: {
            submitText: formatMessage({
              id: 'pages.Admin.User.UserForm.Update.submitText',
              defaultMessage: 'Cập nhật',
            }),
            resetText: formatMessage({
              id: 'pages.Admin.User.UserForm.resetText',
              defaultMessage: 'Làm mới',
            }),
          },
          resetButtonProps: {
            className: 'hidden',
          },
        }}
      >
        <div className={styles.baseView}>
          <div className={styles.left}>
            <TextName />
            <TextPhone />
            <TextEmail />
            <SelectGender />
            <SelectRole />
          </div>
          <div className={styles.right}>
            <UploadAvatar />
          </div>
        </div>
      </ProForm>
    </Spin>
  );
};

export default BaseView;
