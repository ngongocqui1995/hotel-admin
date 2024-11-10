import LocaleProTable from '@/components/Locale/ProTable';
import ChangeStatusResource from '@/pages/Admin/Resource/components/ResourceList/components/ChangeStatusResource';
import CreateResource from '@/pages/Admin/Resource/components/ResourceList/components/ToolBar/CreateResource';
import { ResourceItem } from '@/pages/Admin/Resource/data';
import { deleteResource, queryResources } from '@/pages/Admin/Resource/service';
import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getDeleteTooltip,
  getFormatMessage,
  getPopupConfirmDelete,
  getResourceTypeEnum,
  getStatusEnum,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { ENUM_RESOURCE, ENUM_SCOPE_TYPE, RESOURCE_TYPE } from '@/utils/utils.enum';
import { CopyTwoTone, DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useAccess, useDispatch } from '@umijs/max';
import { FormInstance, Popconfirm, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import localeEN from './locale/enUS/proTable';
import localeVN from './locale/viVN/proTable';

type ResourceListProps = {
  id?: string;
};

const ResourceList: React.FC<ResourceListProps> = (props) => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const formTable = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const { RESOURCE } = ENUM_RESOURCE;
  const { UPDATE_STATUS, UPDATE, COPY, DELETE } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    if (props.id) return;

    dispatch({
      type: 'resource/updateResourceList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<ResourceItem>[] = [
    {
      title: formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: formatMessage({
          id: 'pages.Admin.Resource.ResourceList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã, tên.',
        }),
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.Admin.Resource.ResourceList.placeholder',
          defaultMessage: 'Nhập mã, tên.',
        }),
      },
    },
    {
      title: formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'code',
      width: 250,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 250,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.sort', defaultMessage: 'Sắp xếp' }),
      dataIndex: 'sort',
      width: 100,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.hide_in_menu', defaultMessage: 'Ẩn trong menu' }),
      dataIndex: 'hide_in_menu',
      width: 120,
      search: false,
      render: (dom) => (dom ? <Tag color="success">Có</Tag> : <Tag color="red">Không</Tag>),
    },
    {
      title: formatMessage({ id: 'pages.type', defaultMessage: 'Loại' }),
      dataIndex: 'type',
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
        onChange: () => {
          formTable.current?.submit();
        },
      },
      width: 120,
      valueType: 'select',
      valueEnum: getResourceTypeEnum(),
      renderText: (_, record: ResourceItem) => {
        return (
          record?.type && (
            <Tag color={RESOURCE_TYPE[record?.type]?.color}>
              {RESOURCE_TYPE[record?.type]?.text}
            </Tag>
          )
        );
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
      title: formatMessage({ id: 'pages.status', defaultMessage: 'Trạng thái' }),
      dataIndex: 'status',
      width: 100,
      renderText: (dom, record: ResourceItem) => {
        return <ChangeStatusResource status={dom} record={record} />;
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
      hideInTable: !access.getAccess(RESOURCE, [UPDATE_STATUS]),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.getAccess(RESOURCE, [UPDATE, COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.getAccessClass(RESOURCE, [UPDATE])}`}
          key="update-resource"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'resource/updateResourceForm',
                payload: { itemEdit: record, type: UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(RESOURCE, [COPY])}`}
          key="copy-resource"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'resource/updateResourceForm',
                payload: { itemEdit: record, type: COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(RESOURCE, [DELETE])}`}
          key="delete-resource"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteResource(record?.id);
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
        <ProTable<ResourceItem>
          headerTitle={formatMessage({
            id: 'pages.Admin.Resource.ResourceList.headerTitle',
            defaultMessage: 'Danh sách tài nguyên',
          })}
          formRef={formTable}
          actionRef={actionRef}
          rowKey="id"
          search={props.id ? false : undefined}
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          params={{ resource: props.id }}
          request={async (params, sort) => {
            return await queryResources(params, sort);
          }}
          toolBarRender={() => {
            if (props.id) return [];
            return [<CreateResource key="create-resource" />];
          }}
          expandable={{
            expandedRowRender: (record) => <ResourceList id={record.id} />,
            rowExpandable: (record) => record.resources?.length > 0,
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default ResourceList;
