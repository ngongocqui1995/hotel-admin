import {
  SelectGender,
  TextEmail,
  TextName,
  TextPassword,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { RootUserModalState } from '@/pages/Admin/RootUser/model';
import { changePassword, createRootUser, updateRootUser } from '@/pages/Admin/RootUser/service';
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

const RootUserForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const rootUser: RootUserModalState = useSelector((state: any) => state?.rootUser);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY, UPDATE_PASSWORD } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (rootUser.RootUserForm?.type) {
        if (rootUser.RootUserForm?.type === CREATE) {
          form.resetFields();
        }
        if ([UPDATE, COPY].includes(rootUser.RootUserForm?.type)) {
          form.setFieldsValue({
            ...rootUser.RootUserForm.itemEdit,
          });
        }
      }
      setModalVisible(!!rootUser.RootUserForm?.type);
    })();
  }, [rootUser.RootUserForm?.type]);

  const renderContent = () => {
    console.log('rootUser.RootUserForm?.type', rootUser.RootUserForm?.type);
    if (!rootUser.RootUserForm?.type) return;
    return (
      <>
        {[CREATE, UPDATE, COPY].includes(rootUser.RootUserForm?.type) && (
          <>
            <UploadAvatar />
            <TextName />
            <TextPhone />
            <TextEmail />
            {rootUser.RootUserForm?.type !== UPDATE && <TextPassword />}
            <SelectGender
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
          </>
        )}
        {[UPDATE_PASSWORD].includes(rootUser.RootUserForm?.type) && (
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
    dispatch({ type: 'rootUser/updateRootUserForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (rootUser.RootUserForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.Create.title',
          defaultMessage: 'Thêm mới khách hàng',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.Update.title',
          defaultMessage: 'Cập nhật khách hàng',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.UpdatePassword.title',
          defaultMessage: 'Đổi mật khẩu',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.Create.title',
          defaultMessage: 'Thêm mới khách hàng',
        });
    }
  };

  const renderSubmitText = () => {
    switch (rootUser.RootUserForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.UpdatePassword.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.RootUser.RootUserForm.Create.submitText',
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
            switch (rootUser.RootUserForm?.type) {
              case CREATE:
              case COPY: {
                res = await createRootUser(values);
                break;
              }
              case UPDATE: {
                res = await updateRootUser(rootUser.RootUserForm?.itemEdit?.id || '', values);
                break;
              }
              case UPDATE_PASSWORD: {
                delete values.avatar;
                res = await changePassword(rootUser.RootUserForm?.itemEdit?.id || '', values);
                break;
              }
            }
            if (res) {
              onCancel();
              rootUser.RootUserList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Admin.RootUser.RootUserForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [UPDATE, UPDATE_PASSWORD].includes(
                rootUser.RootUserForm?.type as ENUM_SCOPE_TYPE,
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

export default RootUserForm;
