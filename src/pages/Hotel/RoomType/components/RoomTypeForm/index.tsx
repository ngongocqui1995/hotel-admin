import { Price, TextCode, TextName } from '@/components/ProForm';
import { RoomTypeModalState } from '@/pages/Hotel/RoomType/model';
import { createRoomType, updateRoomType } from '@/pages/Hotel/RoomType/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const RoomTypeForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const roomType: RoomTypeModalState = useSelector((state: any) => state?.roomType);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (roomType.RoomTypeForm?.type) {
        if (roomType.RoomTypeForm?.type === CREATE) {
          form.resetFields();
        }
        if (roomType.RoomTypeForm?.type === UPDATE || roomType.RoomTypeForm?.type === COPY) {
          form.setFieldsValue({
            ...roomType.RoomTypeForm.itemEdit,
          });
        }
      }
      setModalVisible(!!roomType.RoomTypeForm?.type);
    })();
  }, [roomType.RoomTypeForm?.type]);

  const renderContent = () => {
    return (
      <>
        <ProForm.Group>
          <TextCode upperCase />
          <TextName />
          <Price />
        </ProForm.Group>
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'roomType/updateRoomTypeForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (roomType.RoomTypeForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeForm.Create.title',
          defaultMessage: 'Thêm mới loại phòng',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeForm.Update.title',
          defaultMessage: 'Cập nhật loại phòng',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeForm.Create.title',
          defaultMessage: 'Thêm mới loại phòng',
        });
    }
  };

  const renderSubmitText = () => {
    switch (roomType.RoomTypeForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeForm.Create.submitText',
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
            const body = { ...values, price: +values.price };
            const res = await (roomType.RoomTypeForm?.type === UPDATE
              ? updateRoomType(roomType.RoomTypeForm?.itemEdit?.id || '', body)
              : createRoomType(body));
            if (res) {
              onCancel();
              roomType.RoomTypeList?.reload?.();
            }
          }}
          submitter={{
            render: (_: any, dom: any) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Hotel.RoomType.RoomTypeForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: roomType.RoomTypeForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RoomTypeForm;
