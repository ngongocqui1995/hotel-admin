import { SelectColor, TextCode, TextName } from '@/components/ProForm';
import { ScopeModalState } from '@/pages/Admin/Scope/model';
import { createScope, updateScope } from '@/pages/Admin/Scope/service';
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

const ScopeForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const scope: ScopeModalState = useSelector((state: any) => state?.scope);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (scope.ScopeForm?.type) {
        if (scope.ScopeForm?.type === CREATE) {
          form.resetFields();
        }
        if ([UPDATE, COPY].includes(scope.ScopeForm?.type)) {
          form.setFieldsValue({
            ...scope.ScopeForm.itemEdit,
          });
        }
      }
      setModalVisible(!!scope.ScopeForm?.type);
    })();
  }, [scope.ScopeForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextCode upperCase />
        <TextName />
        <SelectColor />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'scope/updateScopeForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (scope.ScopeForm?.type) {
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Scope.ScopeForm.Update.title',
          defaultMessage: 'Cập nhật Scope',
        });
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Scope.ScopeForm.Create.title',
          defaultMessage: 'Thêm mới Scope',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Scope.ScopeForm.Create.title',
          defaultMessage: 'Thêm mới Scope',
        });
    }
  };

  const renderSubmitText = () => {
    switch (scope.ScopeForm?.type) {
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Scope.ScopeForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Scope.ScopeForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Scope.ScopeForm.Create.submitText',
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
            const res = await (scope.ScopeForm?.type === UPDATE
              ? updateScope(scope.ScopeForm?.itemEdit?.id || '', values)
              : createScope(values));
            if (res) {
              onCancel();
              scope.ScopeList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Admin.Scope.ScopeForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: scope.ScopeForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default ScopeForm;
