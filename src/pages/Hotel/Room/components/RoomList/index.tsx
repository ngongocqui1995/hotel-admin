import LocaleProTable from '@/components/Locale/ProTable';
import ChangeStatusRoom from '@/pages/Hotel/Room/components/RoomList/components/ChangeStatusRoom';
import CreateRoom from '@/pages/Hotel/Room/components/RoomList/components/ToolBar/CreateRoom';
import { RoomItem } from '@/pages/Hotel/Room/data';
import { deleteRoom, queryRooms } from '@/pages/Hotel/Room/service';
import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getDeleteTooltip,
  getFormatMessage,
  getPopupConfirmDelete,
  getRoomStatusEnum,
  getStatusEnum,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { ENUM_RESOURCE, ENUM_ROOM_STATUS, ENUM_SCOPE_TYPE, ROOM_STATUS } from '@/utils/utils.enum';
import { CopyTwoTone, DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useAccess, useDispatch } from '@umijs/max';
import { FormInstance, Popconfirm, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import localeEN from './locale/enUS/proTable';
import localeVN from './locale/viVN/proTable';
import { SelectArea, SelectFloor, SelectRoomType } from '@/components/ProForm';

type RoomListProps = {
  id?: string;
};

const RoomList: React.FC<RoomListProps> = (props) => {
  const formatMessage = getFormatMessage();
  const dispatch = useDispatch();
  const formTable = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const { ROOM } = ENUM_RESOURCE;
  const { UPDATE_STATUS, UPDATE, COPY, DELETE } = ENUM_SCOPE_TYPE;

  useEffect(() => {
    if (props.id) return;

    dispatch({
      type: 'room/updateRoomList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<RoomItem>[] = [
    {
      title: formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: formatMessage({
          id: 'pages.Hotel.Room.RoomList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo mã.',
        }),
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.Hotel.Room.RoomList.placeholder',
          defaultMessage: 'Nhập mã.',
        }),
      },
    },
    {
      title: formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'key',
      width: 250,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.area', defaultMessage: 'Khu vực' }),
      dataIndex: 'area.name',
      renderFormItem: () => (
        <SelectArea
          noStyle
          rules={[]}
          allowClear
          onChange={() => {
            formTable.current?.submit();
          }}
        />
      ),
      width: 150,
      renderText: (_, record: RoomItem) => {
        return record?.area?.id && <Tag>{record?.area?.name}</Tag>;
      },
    },
    {
      title: formatMessage({ id: 'pages.floor', defaultMessage: 'Tầng' }),
      dataIndex: 'floor.name',
      renderFormItem: () => (
        <SelectFloor
          noStyle
          rules={[]}
          allowClear
          onChange={() => {
            formTable.current?.submit();
          }}
        />
      ),
      width: 150,
      renderText: (_, record: RoomItem) => {
        return record?.floor?.id && <Tag>{record?.floor?.name}</Tag>;
      },
    },
    {
      title: formatMessage({ id: 'pages.room_type', defaultMessage: 'Loại phòng' }),
      dataIndex: 'room_type.name',
      renderFormItem: () => (
        <SelectRoomType
          noStyle
          rules={[]}
          allowClear
          onChange={() => {
            formTable.current?.submit();
          }}
        />
      ),
      width: 150,
      renderText: (_, record: RoomItem) => {
        return record?.room_type?.id && <Tag>{record?.room_type?.name}</Tag>;
      },
    },
    {
      title: formatMessage({ id: 'pages.price', defaultMessage: 'Giá tiền' }),
      dataIndex: ['room_type', 'price'],
      renderText: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      width: 150,
      search: false,
    },
    {
      title: formatMessage({ id: 'pages.room_status', defaultMessage: 'Trạng thái phòng' }),
      dataIndex: ['room_status'],
      width: 150,
      render: (_, record: RoomItem) => {
        const id = ROOM_STATUS[record?.room_status]?.id as any;
        let color = '';
        if (record?.room_status === ENUM_ROOM_STATUS.AVAILABLE) color = 'green';
        if (record?.room_status === ENUM_ROOM_STATUS.BOOKED) color = 'red';
        return <Tag color={color}>{id && formatMessage({ id })}</Tag>;
      },
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.room_status.placeholder',
          defaultMessage: 'Chọn trạng thái phòng.',
        }),
        onChange: () => {
          formTable.current?.submit();
        },
      },
      valueType: 'select',
      valueEnum: getRoomStatusEnum(),
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
      renderText: (dom, record: RoomItem) => {
        return <ChangeStatusRoom status={dom} record={record} />;
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
      hideInTable: !access.getAccess(ROOM, [UPDATE_STATUS]),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.getAccess(ROOM, [UPDATE, COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.getAccessClass(ROOM, [UPDATE])}`}
          key="update-Room"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'room/updateRoomForm',
                payload: { itemEdit: record, type: UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(ROOM, [COPY])}`}
          key="copy-Room"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'room/updateRoomForm',
                payload: { itemEdit: record, type: COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.getAccessClass(ROOM, [DELETE])}`}
          key="delete-Room"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteRoom(record?.id);
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
        <ProTable<RoomItem>
          headerTitle={formatMessage({
            id: 'pages.Hotel.Room.RoomList.headerTitle',
            defaultMessage: 'Danh sách phòng',
          })}
          formRef={formTable}
          actionRef={actionRef}
          rowKey="id"
          search={props.id ? false : undefined}
          sticky={true}
          pagination={{ ...PAGINATE_OPTIONS }}
          params={{ Room: props.id }}
          request={async (params, sort) => {
            return await queryRooms(params, sort);
          }}
          toolBarRender={() => {
            if (props.id) return [];
            return [<CreateRoom key="create-Room" />];
          }}
          columns={columns}
          scroll={scrollTable}
        />
      </LocaleProTable>
    </div>
  );
};

export default RoomList;
