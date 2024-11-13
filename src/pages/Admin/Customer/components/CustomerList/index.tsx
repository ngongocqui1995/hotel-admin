import LocaleProTable from '@/components/Locale/ProTable';
import ChangeStatusCustomer from '@/pages/Admin/Customer/components/CustomerList/components/ChangeStatusCustomer';
import CreateCustomer from '@/pages/Admin/Customer/components/CustomerList/components/ToolBar/CreateCustomer';
import { CustomerItem } from '@/pages/Admin/Customer/data';
import { queryCustomers } from '@/pages/Admin/Customer/service';
import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getFormatMessage,
  getGenderEnum,
  getServerApi,
  getStatusEnum,
  getUpdatePasswordTooltip,
  getUpdateTooltip,
  phoneFormatter,
  scrollTable,
} from '@/utils/utils';
import { ENUM_RESOURCE, ENUM_SCOPE_TYPE, FALLBACK_STRING, SIZE_AVATAR } from '@/utils/utils.enum';
import { CopyTwoTone, EditTwoTone, EyeOutlined, LockOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useAccess, useDispatch } from '@umijs/max';
import { FormInstance, Image, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import localeEN from './locale/enUS/proTable';
import localeVN from './locale/viVN/proTable';

const CustomerList: React.FC = () => {
  const formatMessage = getFormatMessage();
  const formTable = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = useAccess();
  const { COPY, UPDATE, UPDATE_STATUS, UPDATE_PASSWORD } = ENUM_SCOPE_TYPE;
  const { CUSTOMER } = ENUM_RESOURCE;

  useEffect(() => {
    dispatch({
      type: 'customer/updateCustomerList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<CustomerItem>[] = [
    {
      title: formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: formatMessage({
          id: 'pages.Admin.Customer.CustomerList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên, email, số điện thoại.',
        }),
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.Admin.Customer.CustomerList.placeholder',
          defaultMessage: 'Nhập mã, tên, email, số điện thoại.',
        }),
      },
    },
    {
      title: formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: CustomerItem) => {
        return (
          <Image
            placeholder={
              <Image height={SIZE_AVATAR.height} src="error" fallback={FALLBACK_STRING} />
            }
            preview={{
              mask: <EyeOutlined />,
            }}
            height={SIZE_AVATAR.height}
            width={SIZE_AVATAR.width}
            src={`${getServerApi()}${record?.avatar}`}
            fallback={FALLBACK_STRING}
          />
        );
      },
    },
    {
      title: formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.phone', defaultMessage: 'Số điện thoại' }),
      dataIndex: 'phone',
      width: 130,
      renderText: (dom) => phoneFormatter(dom),
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.gender', defaultMessage: 'Giới tính' }),
      dataIndex: 'gender',
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.gender.placeholder',
          defaultMessage: 'Chọn giới tính.',
        }),
        onChange: () => {
          formTable.current?.submit();
        },
      },
      width: 120,
      valueType: 'select',
      valueEnum: getGenderEnum(),
    },
    {
      title: formatMessage({ id: 'pages.email', defaultMessage: 'Email' }),
      dataIndex: 'email',
      width: 150,
      search: false,
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
      title: formatMessage({ id: 'pages.status', defaultMessage: 'Trạng thái' }),
      dataIndex: 'status',
      width: 100,
      renderText: (dom, record: CustomerItem) => {
        return <ChangeStatusCustomer status={dom} record={record} />;
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.status.placeholder',
          defaultMessage: 'Chọn trạng thái.',
        }),
        onChange: () => {
          formTable.current?.submit();
        },
      },
      valueType: 'select',
      valueEnum: getStatusEnum(),
      hideInTable: !access.getAccess(CUSTOMER, [UPDATE_STATUS]),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.getAccess(CUSTOMER, [UPDATE, COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.getAccessClass(CUSTOMER, [UPDATE])}`}
          key="update-Customer"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'customer/updateCustomerForm',
                payload: { itemEdit: record, type: UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(CUSTOMER, [COPY])}`}
          key="copy-Customer"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'customer/updateCustomerForm',
                payload: { itemEdit: record, type: COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(CUSTOMER, [UPDATE_PASSWORD])}`}
          key="change-password-Customer"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'customer/updateCustomerForm',
                payload: { itemEdit: record, type: UPDATE_PASSWORD },
              });
            }}
          >
            <LockOutlined style={{ fontSize: '16px', color: 'red' }} />
          </a>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<CustomerItem>
          headerTitle={formatMessage({
            id: 'pages.Admin.Customer.CustomerList.headerTitle',
            defaultMessage: 'Danh sách khách hàng',
          })}
          formRef={formTable}
          actionRef={actionRef}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort) => {
            return await queryCustomers(params, sort);
          }}
          toolBarRender={() => [<CreateCustomer key="create-Customer" />]}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default CustomerList;
