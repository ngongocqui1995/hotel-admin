import LocaleProTable from '@/components/Locale/ProTable';
import CreateRentalVoucher from '@/pages/RentalVoucher/components/RentalVoucherList/components/ToolBar/CreateRentalVoucher';
import { RentalVoucherItem } from '@/pages/RentalVoucher/data';
import { changeStatusRentalVoucher, queryRentalVouchers } from '@/pages/RentalVoucher/service';
import {
  PAGINATE_OPTIONS,
  getFormatMessage,
  getRentalVoucherStatusEnum,
  scrollTable,
} from '@/utils/utils';
import {
  ENUM_RENTAL_VOUCHER_STATUS,
  ENUM_RESOURCE,
  ENUM_SCOPE_TYPE,
  RENTAL_VOUCHER_STATUS,
} from '@/utils/utils.enum';
import { StopOutlined, ToolOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useAccess, useDispatch } from '@umijs/max';
import { FormInstance, Popconfirm, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import localeEN from './locale/enUS/proTable';
import localeVN from './locale/viVN/proTable';
import { SelectCustomer, SelectRoom } from '@/components/ProForm';
import CreateRentalVoucherReport from '@/pages/RentalVoucher/components/RentalVoucherList/components/ToolBar/CreateRentalVoucherReport';

type RentalVoucherListProps = {
  id?: string;
};

const RentalVoucherList: React.FC<RentalVoucherListProps> = (props) => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const formTable = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const { RENTAL_VOUCHER } = ENUM_RESOURCE;
  const { UPDATE_STATUS, UPDATE, COPY } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    if (props.id) return;

    dispatch({
      type: 'rentalVoucher/updateRentalVoucherList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<RentalVoucherItem>[] = [
    {
      title: formatMessage({ id: 'pages.room', defaultMessage: 'Phòng' }),
      dataIndex: 'room.key',
      renderFormItem: () => (
        <SelectRoom
          noStyle
          rules={[]}
          allowClear
          onChange={() => {
            formTable.current?.submit();
          }}
        />
      ),
      width: 150,
      render: (_, record: RentalVoucherItem) => {
        return (
          record?.room?.id && <Tag>{`${record?.room?.key} - ${record?.room?.room_type?.name}`}</Tag>
        );
      },
    },
    {
      title: formatMessage({ id: 'pages.customer', defaultMessage: 'Khách hàng' }),
      dataIndex: 'customer.name',
      renderFormItem: () => (
        <SelectCustomer
          noStyle
          rules={[]}
          allowClear
          onChange={() => {
            formTable.current?.submit();
          }}
        />
      ),
      width: 150,
      render: (_, record: RentalVoucherItem) => {
        return record?.customers?.map((customer) => (
          <Tag key={customer.id}>{`${customer?.name} - ${customer.phone} - ${customer.email}`}</Tag>
        ));
      },
    },
    {
      title: formatMessage({ id: 'pages.price', defaultMessage: 'Giá tiền' }),
      dataIndex: 'price',
      renderText: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      width: 150,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.checkin_date', defaultMessage: 'Ngày nhận phòng' }),
      dataIndex: 'checkin_date',
      valueType: 'date',
      width: 150,
      fieldProps: {
        onChange: () => {
          formTable.current?.submit();
        },
      },
    },
    {
      title: formatMessage({ id: 'pages.checkout_date', defaultMessage: 'Ngày trả phòng' }),
      dataIndex: 'checkout_date',
      valueType: 'date',
      width: 150,
      fieldProps: {
        onChange: () => {
          formTable.current?.submit();
        },
      },
    },
    {
      title: formatMessage({ id: 'pages.createdAt', defaultMessage: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: formatMessage({ id: 'pages.updatedAt', defaultMessage: 'Ngày cập nhật' }),
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: formatMessage({
        id: 'pages.rental_voucher_status',
        defaultMessage: 'Trạng thái phiếu thuê',
      }),
      dataIndex: 'status',
      width: 150,
      renderText: (_, record: RentalVoucherItem) => {
        let color = '';
        if (record?.status === ENUM_RENTAL_VOUCHER_STATUS.BOOKED) color = 'blue';
        if (record?.status === ENUM_RENTAL_VOUCHER_STATUS.CHECK_IN) color = 'warning';
        if (record?.status === ENUM_RENTAL_VOUCHER_STATUS.CHECK_OUT) color = 'success';
        if (record?.status === ENUM_RENTAL_VOUCHER_STATUS.CANCEL) color = 'red';
        return (
          <Tag color={color}>
            {formatMessage({
              id: RENTAL_VOUCHER_STATUS[record?.status as ENUM_RENTAL_VOUCHER_STATUS]?.id as any,
            })}
          </Tag>
        );
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.rental_voucher_status.placeholder',
          defaultMessage: 'Chọn trạng thái phiếu thuê.',
        }),
        onChange: () => {
          formTable.current?.submit();
        },
      },
      valueType: 'select',
      valueEnum: getRentalVoucherStatusEnum(),
      hideInTable: !access.getAccess(RENTAL_VOUCHER, [UPDATE_STATUS]),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.getAccess(RENTAL_VOUCHER, [UPDATE, COPY]),
      render: (_, record) => {
        const { BOOKED, CHECK_IN, CHECK_OUT, CANCEL } = ENUM_RENTAL_VOUCHER_STATUS;
        let status = { text: '', code: '' };
        if (record.status === BOOKED) status = { text: 'nhận phòng', code: CHECK_IN };
        if (record.status === CHECK_IN) status = { text: 'trả phòng', code: CHECK_OUT };
        if (record.status === CHECK_OUT) return;
        return [
          <Tooltip
            className={`${access.getAccessClass(RENTAL_VOUCHER, [UPDATE])}`}
            key="update-RentalVoucher"
            title="Thay đổi trạng thái"
            color="cyan"
            placement="left"
          >
            <Popconfirm
              placement="bottomRight"
              title={`Bạn có muốn thay đổi trạng thái thành ${status.text} không?`}
              onConfirm={async () => {
                await changeStatusRentalVoucher(record.id, status.code);
                actionRef.current?.reload();
              }}
              okText={formatMessage({ id: 'pages.OK', defaultMessage: 'Ok' })}
              cancelText={formatMessage({ id: 'pages.Cancel', defaultMessage: 'Huỷ' })}
            >
              <ToolOutlined
                hidden={record?.status === CANCEL}
                style={{ fontSize: '16px', color: '#08c' }}
              />
            </Popconfirm>
          </Tooltip>,
          <Tooltip
            className={`${access.getAccessClass(RENTAL_VOUCHER, [UPDATE])}`}
            key="delete-RoomType"
            title="Huỷ phiếu thuê"
            color="cyan"
            placement="left"
          >
            <Popconfirm
              placement="bottomRight"
              title="Bạn có muốn huỷ phiếu thuê không?"
              onConfirm={async () => {
                await changeStatusRentalVoucher(record.id, CANCEL);
                actionRef.current?.reload();
              }}
              okText={formatMessage({ id: 'pages.OK', defaultMessage: 'Ok' })}
              cancelText={formatMessage({ id: 'pages.Cancel', defaultMessage: 'Huỷ' })}
            >
              <StopOutlined
                hidden={record?.status !== BOOKED}
                style={{ fontSize: '16px', color: 'red' }}
              />
            </Popconfirm>
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<RentalVoucherItem>
          headerTitle={formatMessage({
            id: 'pages.RentalVoucher.RentalVoucherList.headerTitle',
            defaultMessage: 'Danh sách phiếu thuê',
          })}
          formRef={formTable}
          actionRef={actionRef}
          rowKey="id"
          search={props.id ? false : undefined}
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          params={{ RentalVoucher: props.id }}
          request={async (params, sort) => {
            return await queryRentalVouchers(params, sort);
          }}
          toolBarRender={() => {
            if (props.id) return [];
            return [
              <CreateRentalVoucherReport key="create-rental-voucher-report" />,
              <CreateRentalVoucher key="create-RentalVoucher" />,
            ];
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default RentalVoucherList;
