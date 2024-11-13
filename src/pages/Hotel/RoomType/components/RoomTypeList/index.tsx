import LocaleProTable from '@/components/Locale/ProTable';
import ChangeStatusRoomType from '@/pages/Hotel/RoomType/components/RoomTypeList/components/ChangeStatusRoomType';
import CreateRoomType from '@/pages/Hotel/RoomType/components/RoomTypeList/components/ToolBar/CreateRoomType';
import { RoomTypeItem } from '@/pages/Hotel/RoomType/data';
import { deleteRoomType, queryRoomTypes } from '@/pages/Hotel/RoomType/service';
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

type RoomTypeListProps = {
  id?: string;
};

const RoomTypeList: React.FC<RoomTypeListProps> = (props) => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const formTable = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const { ROOM_TYPE } = ENUM_RESOURCE;
  const { UPDATE_STATUS, UPDATE, COPY, DELETE } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    if (props.id) return;

    dispatch({
      type: 'roomType/updateRoomTypeList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<RoomTypeItem>[] = [
    {
      title: formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã, tên.',
        }),
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.Hotel.RoomType.RoomTypeList.placeholder',
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
      title: formatMessage({ id: 'pages.price', defaultMessage: 'Giá tiền' }),
      dataIndex: 'price',
      renderText: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
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
      renderText: (dom, record: RoomTypeItem) => {
        return <ChangeStatusRoomType status={dom} record={record} />;
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
      hideInTable: !access.getAccess(ROOM_TYPE, [UPDATE_STATUS]),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.getAccess(ROOM_TYPE, [UPDATE, COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.getAccessClass(ROOM_TYPE, [UPDATE])}`}
          key="update-RoomType"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'roomType/updateRoomTypeForm',
                payload: { itemEdit: record, type: UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(ROOM_TYPE, [COPY])}`}
          key="copy-RoomType"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'roomType/updateRoomTypeForm',
                payload: { itemEdit: record, type: COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(ROOM_TYPE, [DELETE])}`}
          key="delete-RoomType"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteRoomType(record?.id);
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
        <ProTable<RoomTypeItem>
          headerTitle={formatMessage({
            id: 'pages.Hotel.RoomType.RoomTypeList.headerTitle',
            defaultMessage: 'Danh sách loại phòng',
          })}
          formRef={formTable}
          actionRef={actionRef}
          rowKey="id"
          search={props.id ? false : undefined}
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          params={{ RoomType: props.id }}
          request={async (params, sort) => {
            return await queryRoomTypes(params, sort);
          }}
          toolBarRender={() => {
            if (props.id) return [];
            return [<CreateRoomType key="create-RoomType" />];
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default RoomTypeList;
