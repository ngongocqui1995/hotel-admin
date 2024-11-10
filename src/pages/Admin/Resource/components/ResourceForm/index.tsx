import {
  HideInMenu,
  SelectScope,
  SelectTypeResource,
  Sort,
  TextCode,
  TextName,
} from '@/components/ProForm';
import ResourceChildList from '@/pages/Admin/Resource/components/ResourceForm/components/ResourceChildList';
import { ResourceModalState } from '@/pages/Admin/Resource/model';
import { createResource, updateResource } from '@/pages/Admin/Resource/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal, Space } from 'antd';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

const ResourceForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const resource: ResourceModalState = useSelector((state: any) => state?.resource);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (resource.ResourceForm?.type) {
        if (resource.ResourceForm?.type === CREATE) {
          form.resetFields();
        }
        if (resource.ResourceForm?.type === UPDATE || resource.ResourceForm?.type === COPY) {
          form.setFieldsValue({
            ...resource.ResourceForm.itemEdit,
            scopes: resource.ResourceForm.itemEdit?.scopes?.map((scope) => scope.id),
          });
        }
      }
      setModalVisible(!!resource.ResourceForm?.type);
    })();
  }, [resource.ResourceForm?.type]);

  const renderContent = () => {
    return (
      <>
        <ProForm.Group>
          <TextCode upperCase colProps={{ md: 12, xl: 12, xs: 24 }} />
          <TextName colProps={{ md: 12, xl: 12, xs: 24 }} />
          <SelectTypeResource colProps={{ md: 12, xl: 12, xs: 24 }} />
          <Sort colProps={{ md: 12, xl: 12, xs: 24 }} />
          <SelectScope colProps={{ md: 12, xl: 12, xs: 24 }} />
          <HideInMenu colProps={{ md: 12, xl: 12, xs: 24 }} />
        </ProForm.Group>
        <ResourceChildList form={form} />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'resource/updateResourceForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (resource.ResourceForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Resource.ResourceForm.Create.title',
          defaultMessage: 'Thêm mới Resource',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Resource.ResourceForm.Update.title',
          defaultMessage: 'Cập nhật Resource',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Resource.ResourceForm.Create.title',
          defaultMessage: 'Thêm mới Resource',
        });
    }
  };

  const renderSubmitText = () => {
    switch (resource.ResourceForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Admin.Resource.ResourceForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Admin.Resource.ResourceForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Admin.Resource.ResourceForm.Create.submitText',
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
          onFinish={async (values: any) => {
            const body = {
              ...values,
              sort: +values.sort,
              scopes: values.scopes?.map((id: string) => ({ id })),
              resources: values.resources?.map((r: any) => {
                return {
                  id: _.isNumber(r.id) ? undefined : r.id,
                  code: r.code,
                  name: r.name,
                  type: r.type,
                  sort: +r.sort,
                  hide_in_menu: !!r.hide_in_menu,
                  scopes: r.scopes?.map((id: string) => ({ id })),
                };
              }),
            };
            const res = await (resource.ResourceForm?.type === UPDATE
              ? updateResource(resource.ResourceForm?.itemEdit?.id || '', body)
              : createResource(body));
            if (res) {
              onCancel();
              resource.ResourceList?.reload?.();
            }
          }}
          submitter={{
            render: (_: any, dom: any) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Admin.Resource.ResourceForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: resource.ResourceForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default ResourceForm;
