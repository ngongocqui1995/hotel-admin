import {
  SelectGender,
  TextEmail,
  TextName,
  TextPassword,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { CustomerModalState } from '@/pages/Admin/Customer/model';
import { changePassword, createCustomer, updateCustomer } from '@/pages/Admin/Customer/service';
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

const CustomerForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const customer: CustomerModalState = useSelector((state: any) => state?.customer);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY, UPDATE_PASSWORD } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (customer.CustomerForm?.type) {
        if (customer.CustomerForm?.type === CREATE) {
          form.resetFields();
        }
        if ([UPDATE, COPY].includes(customer.CustomerForm?.type)) {
          form.setFieldsValue({
            ...customer.CustomerForm.itemEdit,
          });
        }
      }
      setModalVisible(!!customer.CustomerForm?.type);
    })();
  }, [customer.CustomerForm?.type]);

  const renderContent = () => {
    console.log('customer.CustomerForm?.type', customer.CustomerForm?.type);
    if (!customer.CustomerForm?.type) return;
    return (
      <>
        {[CREATE, UPDATE, COPY].includes(customer.CustomerForm?.type) && (
          <>
            <UploadAvatar />
            <TextName />
            <TextPhone />
            <TextEmail />
            {customer.CustomerForm?.type !== UPDATE && <TextPassword />}
            <SelectGender
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
          </>
        )}
        {[UPDATE_PASSWORD].includes(customer.CustomerForm?.type) && (
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
    dispatch({ type: 'customer/updateCustomerForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (customer.CustomerForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Create.title',
          defaultMessage: 'Thêm mới khách hàng',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Update.title',
          defaultMessage: 'Cập nhật khách hàng',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.UpdatePassword.title',
          defaultMessage: 'Đổi mật khẩu',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Create.title',
          defaultMessage: 'Thêm mới khách hàng',
        });
    }
  };

  const renderSubmitText = () => {
    switch (customer.CustomerForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case UPDATE_PASSWORD:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.UpdatePassword.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Create.submitText',
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
            switch (customer.CustomerForm?.type) {
              case CREATE:
              case COPY: {
                res = await createCustomer(values);
                break;
              }
              case UPDATE: {
                res = await updateCustomer(customer.CustomerForm?.itemEdit?.id || '', values);
                break;
              }
              case UPDATE_PASSWORD: {
                delete values.avatar;
                res = await changePassword(customer.CustomerForm?.itemEdit?.id || '', values);
                break;
              }
            }
            if (res) {
              onCancel();
              customer.CustomerList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Admin.Customer.CustomerForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [UPDATE, UPDATE_PASSWORD].includes(
                customer.CustomerForm?.type as ENUM_SCOPE_TYPE,
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

export default CustomerForm;
