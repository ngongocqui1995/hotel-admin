import { SelectCustomer, SelectRoom } from '@/components/ProForm';
import { RentalVoucherModalState } from '@/pages/RentalVoucher/model';
import { createRentalVoucher, updateRentalVoucher } from '@/pages/RentalVoucher/service';
import { getFormatMessage } from '@/utils/utils';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import ProForm, { ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Modal, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

const RentalVoucherForm: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const rentalVoucher: RentalVoucherModalState = useSelector((state: any) => state?.rentalVoucher);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const { CREATE, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    (function () {
      if (rentalVoucher.RentalVoucherForm?.type) {
        if (rentalVoucher.RentalVoucherForm?.type === CREATE) {
          form.resetFields();

          const checkin_date = dayjs();
          const checkout_date = dayjs().endOf('month');
          const date = checkout_date.diff(checkin_date, 'day');
          form.setFieldsValue({
            checkin_date,
            checkout_date,
            date,
            room_price: 0,
            price: 0,
          });
        }
        if (
          rentalVoucher.RentalVoucherForm?.type === UPDATE ||
          rentalVoucher.RentalVoucherForm?.type === COPY
        ) {
          const checkin_date = dayjs(rentalVoucher.RentalVoucherForm.itemEdit?.checkin_date);
          const checkout_date = dayjs(rentalVoucher.RentalVoucherForm.itemEdit?.checkout_date);
          const date = checkout_date.diff(checkin_date, 'day');
          const room_price = rentalVoucher.RentalVoucherForm.itemEdit?.room?.room_type?.price || 0;
          form.setFieldsValue({
            ...rentalVoucher.RentalVoucherForm.itemEdit,
            room: {
              value: rentalVoucher.RentalVoucherForm.itemEdit?.room?.id,
              label: `${rentalVoucher.RentalVoucherForm.itemEdit?.room?.key} - ${rentalVoucher.RentalVoucherForm.itemEdit?.room?.room_type?.name}`,
              item: rentalVoucher.RentalVoucherForm.itemEdit?.room,
            },
            checkin_date,
            checkout_date,
            date,
            room_price,
            price: +date * +room_price,
            customers: rentalVoucher.RentalVoucherForm.itemEdit?.customers?.map(
              (item: any) => item.id,
            ),
          });
        }
      }
      setModalVisible(!!rentalVoucher.RentalVoucherForm?.type);
    })();
  }, [rentalVoucher.RentalVoucherForm?.type]);

  const renderContent = () => {
    return (
      <>
        <ProForm.Group>
          <SelectRoom
            width="md"
            fieldProps={{
              labelInValue: true,
              onChange: (value) => {
                const date = form.getFieldValue('date');
                const room_price = value?.item?.room_type?.price || 0;
                form.setFieldsValue({ room_price, price: +date * +room_price });
              },
            }}
          />
          <ProFormDatePicker
            width="md"
            name="checkin_date"
            label={formatMessage({ id: 'pages.checkin_date', defaultMessage: 'Ngày nhận phòng' })}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'pages.checkin_date',
                  defaultMessage: 'Ngày nhận phòng là bắt buộc!',
                }),
              },
            ]}
            placeholder={formatMessage({
              id: 'pages.checkin_date',
              defaultMessage: 'Vui lòng chọn ngày nhận phòng',
            })}
            allowClear={false}
            fieldProps={{
              onChange: (value) => {
                const checkout_date = form.getFieldValue('checkout_date');
                const date = checkout_date.diff(value, 'day');
                const room_price = form.getFieldValue('room_price') || 0;
                form.setFieldsValue({ date, price: +date * +room_price });
              },
            }}
          />
          <ProFormDatePicker
            width="md"
            name="checkout_date"
            label={formatMessage({ id: 'pages.checkout_date', defaultMessage: 'Ngày trả phòng' })}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'pages.checkout_date',
                  defaultMessage: 'Ngày trả phòng là bắt buộc!',
                }),
              },
            ]}
            placeholder={formatMessage({
              id: 'pages.checkout_date',
              defaultMessage: 'Vui lòng chọn ngày trả phòng',
            })}
            allowClear={false}
            fieldProps={{
              onChange: (value) => {
                const checkin_date = form.getFieldValue('checkin_date');
                const date = value.diff(checkin_date, 'day');
                const room_price = form.getFieldValue('room_price') || 0;
                form.setFieldsValue({ date, price: +date * +room_price });
              },
            }}
          />
          <ProFormText width="md" name="date" label="Số ngày" disabled />
          <ProFormText width="md" name="room_price" label="Giá tiền phòng" disabled />
          <ProFormText width="md" name="price" label="Tổng tiền" disabled />
        </ProForm.Group>
        <SelectCustomer />
      </>
    );
  };

  const onCancel = () => {
    dispatch({
      type: 'rentalVoucher/updateRentalVoucherForm',
      payload: { type: '', itemEdit: null },
    });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (rentalVoucher.RentalVoucherForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.RentalVoucher.RentalVoucherForm.Create.title',
          defaultMessage: 'Thêm mới phiếu thuê',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.RentalVoucher.RentalVoucherForm.Update.title',
          defaultMessage: 'Cập nhật phiếu thuê',
        });
      default:
        return formatMessage({
          id: 'pages.RentalVoucher.RentalVoucherForm.Create.title',
          defaultMessage: 'Thêm mới phiếu thuê',
        });
    }
  };

  const renderSubmitText = () => {
    switch (rentalVoucher.RentalVoucherForm?.type) {
      case CREATE:
        return formatMessage({
          id: 'pages.RentalVoucher.RentalVoucherForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case UPDATE:
        return formatMessage({
          id: 'pages.RentalVoucher.RentalVoucherForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return formatMessage({
          id: 'pages.RentalVoucher.RentalVoucherForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
    }
  };

  return (
    <Modal
      width={786}
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
              room: values.room?.value,
              customers: values.customers?.map((item: any) => ({ id: item })) || [],
            };
            const res = await (rentalVoucher.RentalVoucherForm?.type === UPDATE
              ? updateRentalVoucher(rentalVoucher.RentalVoucherForm?.itemEdit?.id || '', body)
              : createRentalVoucher(body));
            if (res) {
              onCancel();
              rentalVoucher.RentalVoucherList?.reload?.();
            }
          }}
          submitter={{
            render: (_: any, dom: any) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: formatMessage({
                id: 'pages.RentalVoucher.RentalVoucherForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: rentalVoucher.RentalVoucherForm?.type === UPDATE ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RentalVoucherForm;
