import { TextCode, TextName } from '@/components/ProForm';
import { FloorModalState } from '@/pages/Hotel/Floor/model';
import { createFloor, updateFloor } from '@/pages/Hotel/Floor/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const FloorForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const floor: FloorModalState = useSelector((state: any) => state?.floor);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (floor.FloorForm?.type) {
        if (floor.FloorForm?.type === CREATE) {
          form.resetFields();
        }
        if (floor.FloorForm?.type === UPDATE || floor.FloorForm?.type === COPY) {
          form.setFieldsValue({
            ...floor.FloorForm.itemEdit,
          });
        }
      }
      setModalVisible(!!floor.FloorForm?.type);
    })();
  }, [floor.FloorForm?.type]);

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
    dispatch({ type: 'floor/updateFloorForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (floor.FloorForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.Floor.FloorForm.Create.title',
          defaultMessage: 'Thêm mới tầng',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.Floor.FloorForm.Update.title',
          defaultMessage: 'Cập nhật tầng',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.Floor.FloorForm.Create.title',
          defaultMessage: 'Thêm mới tầng',
        });
    }
  };

  const renderSubmitText = () => {
    switch (floor.FloorForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.Floor.FloorForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.Floor.FloorForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.Floor.FloorForm.Create.submitText',
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
            const res = await (floor.FloorForm?.type === UPDATE
              ? updateFloor(floor.FloorForm?.itemEdit?.id || '', body)
              : createFloor(body));
            if (res) {
              onCancel();
              floor.FloorList?.reload?.();
            }
          }}
          submitter={{
            render: (_: any, dom: any) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Hotel.Floor.FloorForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: floor.FloorForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default FloorForm;
