import {
  SelectGender,
  SelectRole,
  TextEmail,
  TextName,
  TextPassword,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { UserModalState } from '@/pages/Admin/User/model';
import { changePassword, createUser, updateUser } from '@/pages/Admin/User/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const UserForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const user: UserModalState = useSelector((state: any) => state?.user);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY, UPDATE_PASSWORD } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (user.UserForm?.type) {
        if (user.UserForm?.type === CREATE) {
          form.resetFields();
        }
        if ([UPDATE, COPY].includes(user.UserForm?.type)) {
          form.setFieldsValue({
            ...user.UserForm.itemEdit,
            role: user.UserForm.itemEdit?.role?.id,
          });
        }
      }
      setModalVisible(!!user.UserForm?.type);
    })();
  }, [user.UserForm?.type]);

  const renderContent = () => {
    if (!user.UserForm?.type) return;
    return (
      <>
        {[CREATE, UPDATE].includes(user.UserForm?.type) && (
          <>
            <UploadAvatar />
            <TextName />
            <TextPhone />
            <TextEmail />
            {user.UserForm?.type !== UPDATE && <TextPassword />}
            <SelectGender
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
            <SelectRole
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
          </>
        )}
        {[UPDATE_PASSWORD].includes(user.UserForm?.type) && (
          <>
            <TextPassword
              name="new_password"
              label={formatMessage({
                id: 'pages.new_password',
                defaultMessage: 'Mật khẩu mới',
              })}
              placeholder={formatMessage({
                id: 'pages.new_password.placeholder',
                defaultMessage: 'Nhập mật khẩu mới',
              })}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            />
            <TextPassword
              name="confirm_password"
              label={formatMessage({
                id: 'pages.confirm_password',
                defaultMessage: 'Mật khẩu xác nhận',
              })}
              placeholder={formatMessage({
                id: 'pages.confirm_password.placeholder',
                defaultMessage: 'Nhập mật khẩu xác nhận',
              })}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            />
          </>
        )}
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'user/updateUserForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (user.UserForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.Create.title',
          defaultMessage: 'Thêm mới người dùng',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.Update.title',
          defaultMessage: 'Cập nhật người dùng',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.UpdatePassword.title',
          defaultMessage: 'Đổi mật khẩu',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.Create.title',
          defaultMessage: 'Thêm mới người dùng',
        });
    }
  };

  const renderSubmitText = () => {
    switch (user.UserForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.UpdatePassword.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.User.UserForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
    }
  };

  return (
    <Modal
      width={600}
      title={renderTitle()}
      forceRender
      destroyOnClose
      open={modalVisible}
      onCancel={onCancel}
      footer={false}
    >
      <div ref={modalRef}>
        <ProForm
          form={form}
          {...formLayout}
          layout="horizontal"
          onFinish={async (values) => {
            let res;
            switch (user.UserForm?.type) {
              case CREATE: {
                res = await createUser(values);
                break;
              }
              case UPDATE: {
                res = await updateUser(user.UserForm?.itemEdit?.id || '', values);
                break;
              }
              case UPDATE_PASSWORD: {
                delete values.avatar;
                res = await changePassword(user.UserForm?.itemEdit?.id || '', values);
                break;
              }
            }
            if (res) {
              onCancel();
              user.UserList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Admin.User.UserForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [UPDATE, UPDATE_PASSWORD].includes(user.UserForm?.type as ENUM_SCOPE_TYPE)
                ? 'hidden'
                : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default UserForm;
