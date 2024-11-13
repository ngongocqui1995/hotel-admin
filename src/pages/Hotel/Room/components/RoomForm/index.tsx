import { SelectArea, SelectFloor, SelectRoomType, TextCode } from '@/components/ProForm';
import { RoomModalState } from '@/pages/Hotel/Room/model';
import { createRoom, updateRoom } from '@/pages/Hotel/Room/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const RoomForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const room: RoomModalState = useSelector((state: any) => state?.room);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (room.RoomForm?.type) {
        if (room.RoomForm?.type === CREATE) {
          form.resetFields();
        }
        if (room.RoomForm?.type === UPDATE || room.RoomForm?.type === COPY) {
          form.setFieldsValue({
            ...room.RoomForm.itemEdit,
            floor: {
              value: room.RoomForm.itemEdit?.floor?.id,
              label: room.RoomForm.itemEdit?.floor.name,
              item: room.RoomForm.itemEdit?.floor,
            },
            area: {
              value: room.RoomForm.itemEdit?.area?.id,
              label: room.RoomForm.itemEdit?.area.name,
              item: room.RoomForm.itemEdit?.area,
            },
            room_type: room.RoomForm.itemEdit?.room_type?.id,
          });
        }
      }
      setModalVisible(!!room.RoomForm?.type);
    })();
  }, [room.RoomForm?.type]);

  const renderContent = () => {
    return (
      <>
        <ProForm.Group>
          <SelectArea width="md" fieldProps={{ labelInValue: true }} />
          <SelectFloor width="md" fieldProps={{ labelInValue: true }} />
          <ProFormDependency name={['area', 'floor']}>
            {({ area, floor }) => {
              return (
                <TextCode
                  upperCase
                  fieldProps={{
                    prefix: `${area?.item?.code || ''}${floor?.item?.code || ''}`,
                  }}
                />
              );
            }}
          </ProFormDependency>
          <SelectRoomType width="md" />
        </ProForm.Group>
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'room/updateRoomForm', payload: { type: '', itemEdit: null } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (room.RoomForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.Room.RoomForm.Create.title',
          defaultMessage: 'Thêm mới phòng',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.Room.RoomForm.Update.title',
          defaultMessage: 'Cập nhật phòng',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.Room.RoomForm.Create.title',
          defaultMessage: 'Thêm mới phòng',
        });
    }
  };

  const renderSubmitText = () => {
    switch (room.RoomForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.Hotel.Room.RoomForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.Hotel.Room.RoomForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.Hotel.Room.RoomForm.Create.submitText',
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
            const body = {
              ...values,
              area: values.area?.value,
              floor: values.floor?.value,
            };
            const res = await (room.RoomForm?.type === UPDATE
              ? updateRoom(room.RoomForm?.itemEdit?.id || '', body)
              : createRoom(body));
            if (res) {
              onCancel();
              room.RoomList?.reload?.();
            }
          }}
          submitter={{
            render: (_: any, dom: any) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.Hotel.Room.RoomForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: room.RoomForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RoomForm;
