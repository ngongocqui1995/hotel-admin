import { TextCode, TextName } from '@/components/ProForm';
import { AreaModalState } from '@/pages/Hotel/Area/model';
import { createArea, updateArea } from '@/pages/Hotel/Area/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const AreaForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const area: AreaModalState = useSelector((state: any) => state?.area);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (area.AreaForm?.type) {
        if (area.AreaForm?.type === CREATE) {
          form.resetFields();
        }
        if (area.AreaForm?.type === UPDATE || area.AreaForm?.type === COPY) {
          form.setFieldsValue({
            ...area.AreaForm.itemEdit,
          });
        }
      }
      setModalVisible(!!area.AreaForm?.type);
    })();
  }, [area.AreaForm?.type]);

  const renderContent = () => {
    return (
      <>
        <ProForm.Group>
          <TextCode upperCase />
          <TextName />
        </ProForm.Group>
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'area/updateAreaForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (area.AreaForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.Area.AreaForm.Create.title',
          defaultMessage: 'Thêm mới khu vực',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.Area.AreaForm.Update.title',
          defaultMessage: 'Cập nhật khu vực',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.Area.AreaForm.Create.title',
          defaultMessage: 'Thêm mới khu vực',
        });
    }
  };

  const renderSubmitText = () => {
    switch (area.AreaForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.Area.AreaForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.Area.AreaForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.Area.AreaForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
    }
  };

  return (
    <Modal
      width={800}
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
            const body = { ...values };
            const res = await (area.AreaForm?.type === UPDATE
              ? updateArea(area.AreaForm?.itemEdit?.id || '', body)
              : createArea(body));
            if (res) {
              onCancel();
              area.AreaList?.reload?.();
            }
          }}
          submitter={{
            render: (_: any, dom: any) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Hotel.Area.AreaForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: area.AreaForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default AreaForm;
