import LocaleProTable from '@/components/Locale/ProTable';
import ChangeStatusArea from '@/pages/Hotel/Area/components/AreaList/components/ChangeStatusArea';
import CreateArea from '@/pages/Hotel/Area/components/AreaList/components/ToolBar/CreateArea';
import { AreaItem } from '@/pages/Hotel/Area/data';
import { deleteArea, queryAreas } from '@/pages/Hotel/Area/service';
import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getDeleteTooltip,
  getFormatMessage,
  getPopupConfirmDelete,
  getStatusEnum,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { ENUM_RESOURCE, ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { CopyTwoTone, DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useAccess, useDispatch } from '@umijs/max';
import { FormInstance, Popconfirm, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import localeEN from './locale/enUS/proTable';
import localeVN from './locale/viVN/proTable';

type AreaListProps = {
  id?: string;
};

const AreaList: React.FC<AreaListProps> = (props) => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const formTable = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const { AREA } = ENUM_RESOURCE;
  const { UPDATE_STATUS, UPDATE, COPY, DELETE } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    if (props.id) return;

    dispatch({
      type: 'area/updateAreaList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<AreaItem>[] = [
    {
      title: formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: formatMessage({
          id: 'pages.Hotel.Area.AreaList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã, tên.',
        }),
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.Hotel.Area.AreaList.placeholder',
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
      renderText: (dom, record: AreaItem) => {
        return <ChangeStatusArea status={dom} record={record} />;
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
      hideInTable: !access.getAccess(AREA, [UPDATE_STATUS]),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.getAccess(AREA, [UPDATE, COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.getAccessClass(AREA, [UPDATE])}`}
          key="update-area"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'area/updateAreaForm',
                payload: { itemEdit: record, type: UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(AREA, [COPY])}`}
          key="copy-area"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'area/updateAreaForm',
                payload: { itemEdit: record, type: COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(AREA, [DELETE])}`}
          key="delete-area"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteArea(record?.id);
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
        <ProTable<AreaItem>
          headerTitle={formatMessage({
            id: 'pages.Hotel.Area.AreaList.headerTitle',
            defaultMessage: 'Danh sách khu vực',
          })}
          formRef={formTable}
          actionRef={actionRef}
          rowKey="id"
          search={props.id ? false : undefined}
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          params={{ Area: props.id }}
          request={async (params, sort) => {
            return await queryAreas(params, sort);
          }}
          toolBarRender={() => {
            if (props.id) return [];
            return [<CreateArea key="create-area" />];
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default AreaList;
