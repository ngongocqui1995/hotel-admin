import { SelectColor, TextCode, TextName, UploadAvatar } from '@/components/ProForm';
import RoleChildList from '@/pages/Admin/Role/components/RoleForm/components/RoleChildList';
import { RoleModalState } from '@/pages/Admin/Role/model';
import { createRole, updateRole } from '@/pages/Admin/Role/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Col, Modal, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const RoleForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const role: RoleModalState = useSelector((state: any) => state?.role);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (role.RoleForm?.type) {
        if (role.RoleForm?.type === CREATE) {
          form.resetFields();
        }
        if ([UPDATE, COPY].includes(role.RoleForm?.type)) {
          form.setFieldsValue({
            ...role.RoleForm.itemEdit,
          });
        }
      }
      setModalVisible(!!role.RoleForm?.type);
    })();
  }, [role.RoleForm?.type]);

  const renderContent = () => {
    return (
      <>
        <UploadAvatar />
        <Row gutter={[16, 16]} wrap justify="center">
          <Col md={12} xl={12} xs={24}>
            <TextCode upperCase />
          </Col>
          <Col md={12} xl={12} xs={24}>
            <TextName />
          </Col>
          <Col md={24} xl={24} xs={24}>
            <SelectColor />
          </Col>
        </Row>
        <RoleChildList form={form} />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'role/updateRoleForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (role.RoleForm?.type) {
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Role.RoleForm.Update.title',
          defaultMessage: 'Cập nhật role',
        });
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Role.RoleForm.Create.title',
          defaultMessage: 'Thêm mới role',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Role.RoleForm.Create.title',
          defaultMessage: 'Thêm mới role',
        });
    }
  };

  const renderSubmitText = () => {
    switch (role.RoleForm?.type) {
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Role.RoleForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Role.RoleForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Role.RoleForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
    }
  };

  return (
    <Modal
      width={1200}
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
          layout="horizontal"
          onFinish={async (values) => {
            const body = {
              ...values,
              menus: values.menus?.map((it: any) => ({
                role: { id: role.RoleForm?.itemEdit?.id },
                resource: { id: it.resource?.id },
                scopes: it.scopes?.map((scope: any) => ({ id: scope.id })),
                menus: it.menus?.map((subMenu: any) => ({
                  role: { id: role.RoleForm?.itemEdit?.id },
                  resource: { id: subMenu.resource?.id },
                  scopes: subMenu.scopes?.map((scope: any) => ({ id: scope.id })),
                })),
              })),
            };
            const res = await (role.RoleForm?.type === UPDATE
              ? updateRole(role.RoleForm?.itemEdit?.id || '', body)
              : createRole(body));
            if (res) {
              onCancel();
              role.RoleList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Admin.Role.RoleForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: role.RoleForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RoleForm;
