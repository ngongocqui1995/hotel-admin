import {
  SelectGender,
  TextEmail,
  TextName,
  TextPassword,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { AdminUserModalState } from '@/pages/Admin/AdminUser/model';
import { changePassword, createAdminUser, updateAdminUser } from '@/pages/Admin/AdminUser/service';
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

const AdminUserForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const adminUser: AdminUserModalState = useSelector((state: any) => state?.adminUser);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY, UPDATE_PASSWORD } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (adminUser.AdminUserForm?.type) {
        if (adminUser.AdminUserForm?.type === CREATE) {
          form.resetFields();
        }
        if ([UPDATE, COPY].includes(adminUser.AdminUserForm?.type)) {
          form.setFieldsValue({
            ...adminUser.AdminUserForm.itemEdit,
          });
        }
      }
      setModalVisible(!!adminUser.AdminUserForm?.type);
    })();
  }, [adminUser.AdminUserForm?.type]);

  const renderContent = () => {
    console.log('adminUser.AdminUserForm?.type', adminUser.AdminUserForm?.type);
    if (!adminUser.AdminUserForm?.type) return;
    return (
      <>
        {[CREATE, UPDATE, COPY].includes(adminUser.AdminUserForm?.type) && (
          <>
            <UploadAvatar />
            <TextName />
            <TextPhone />
            <TextEmail />
            {adminUser.AdminUserForm?.type !== UPDATE && <TextPassword />}
            <SelectGender
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
          </>
        )}
        {[UPDATE_PASSWORD].includes(adminUser.AdminUserForm?.type) && (
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
    dispatch({ type: 'adminUser/updateAdminUserForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (adminUser.AdminUserForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.Create.title',
          defaultMessage: 'Thêm mới khách hàng',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.Update.title',
          defaultMessage: 'Cập nhật khách hàng',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.UpdatePassword.title',
          defaultMessage: 'Đổi mật khẩu',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.Create.title',
          defaultMessage: 'Thêm mới khách hàng',
        });
    }
  };

  const renderSubmitText = () => {
    switch (adminUser.AdminUserForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.UpdatePassword.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.AdminUser.AdminUserForm.Create.submitText',
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
            switch (adminUser.AdminUserForm?.type) {
              case CREATE:
              case COPY: {
                res = await createAdminUser(values);
                break;
              }
              case UPDATE: {
                res = await updateAdminUser(adminUser.AdminUserForm?.itemEdit?.id || '', values);
                break;
              }
              case UPDATE_PASSWORD: {
                delete values.avatar;
                res = await changePassword(adminUser.AdminUserForm?.itemEdit?.id || '', values);
                break;
              }
            }
            if (res) {
              onCancel();
              adminUser.AdminUserList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Admin.AdminUser.AdminUserForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [UPDATE, UPDATE_PASSWORD].includes(
                adminUser.AdminUserForm?.type as ENUM_SCOPE_TYPE,
              )
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

export default AdminUserForm;
