import LocaleProTable from '@/components/Locale/ProTable';
import ChangeStatusRole from '@/pages/Admin/Role/components/RoleList/components/ChangeStatusRole';
import RoleToMenuListExpand from '@/pages/Admin/Role/components/RoleList/components/RoleToMenuListExpand';
import CreateRole from '@/pages/Admin/Role/components/RoleList/components/ToolBar/CreateRole';
import { RoleItem } from '@/pages/Admin/Role/data';
import { deleteRole, queryRoles } from '@/pages/Admin/Role/service';
import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getDeleteTooltip,
  getFormatMessage,
  getPopupConfirmDelete,
  getServerApi,
  getStatusEnum,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { ENUM_RESOURCE, ENUM_SCOPE_TYPE, FALLBACK_STRING, SIZE_AVATAR } from '@/utils/utils.enum';
import { CopyTwoTone, DeleteOutlined, EditTwoTone, EyeOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useAccess, useDispatch } from '@umijs/max';
import { FormInstance, Image, Popconfirm, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import localeEN from './locale/enUS/proTable';
import localeVN from './locale/viVN/proTable';

const RoleList: React.FC = () => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const formTable = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const { UPDATE, UPDATE_STATUS, COPY, DELETE } = ENUM_SCOPE_TYPE;
  const { ROLE } = ENUM_RESOURCE;

  useEffect(() => {
    dispatch({
      type: 'role/updateRoleList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<RoleItem>[] = [
    {
      title: formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: formatMessage({
          id: 'pages.Admin.Role.RoleList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên.',
        }),
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.Admin.Role.RoleList.placeholder',
          defaultMessage: 'Nhập tên.',
        }),
      },
    },
    {
      title: formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: RoleItem) => {
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
      title: formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'code',
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.color', defaultMessage: 'Màu sắc' }),
      dataIndex: 'color',
      width: 150,
      renderText: (dom) => dom && <Tag color={dom}>{dom}</Tag>,
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
      renderText: (dom, record: RoleItem) => {
        return <ChangeStatusRole status={dom} record={record} />;
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
      hideInTable: !access.getAccess(ROLE, [UPDATE_STATUS]),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.getAccess(ROLE, [UPDATE, COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.getAccessClass(ROLE, [UPDATE])}`}
          key="update-role"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'role/updateRoleForm',
                payload: { itemEdit: record, type: UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(ROLE, [COPY])}`}
          key="copy-role"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'role/updateRoleForm',
                payload: { itemEdit: record, type: COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(ROLE, [DELETE])}`}
          key="delete-resource"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteRole(record?.id);
              actionRef.current?.reload();
            }}
            okText={formatMessage({ id: 'pages.OK', defaultMessage: 'Ok' })}
            cancelText={formatMessage({ id: 'pages.Cancel', defaultMessage: 'Huỷ' })}
          >
            <DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />
          </Popconfirm>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <LocaleProTable localeVN={localeVN} localeEN={localeEN}>
        <ProTable<RoleItem>
          headerTitle={formatMessage({
            id: 'pages.Admin.Role.RoleList.headerTitle',
            defaultMessage: 'Danh sách role',
          })}
          actionRef={actionRef}
          formRef={formTable}
          rowKey="id"
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          request={async (params, sort) => {
            return await queryRoles(params, sort);
          }}
          toolBarRender={() => [<CreateRole key="create-role" />]}
          columns={columns}
          scroll={scrollTable}
          expandable={{
            expandedRowRender: (record) => <RoleToMenuListExpand data={record} />,
            rowExpandable: (record) => record?.id !== 'Not Expandable',
          }}
        />
      </LocaleProTable>
    </div>
  );
};

export default RoleList;
