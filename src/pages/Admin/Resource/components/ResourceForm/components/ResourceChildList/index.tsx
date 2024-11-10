import { ResourceItem } from '@/pages/Admin/Resource/data';
import { ResourceModalState } from '@/pages/Admin/Resource/model';
import { queryResources } from '@/pages/Admin/Resource/service';
import { getAllScopes } from '@/pages/Admin/Scope/service';
import {
  PAGINATE_OPTIONS,
  getFormatMessage,
  getPopupConfirmDelete,
  getResourceTypeEnum,
  getStatusEnum,
  scrollTable,
} from '@/utils/utils';
import { ENUM_STATUS, RESOURCE_TYPE } from '@/utils/utils.enum';
import {
  CopyOutlined,
  DeleteOutlined,
  EditTwoTone,
  PlusOutlined,
  SaveTwoTone,
  UndoOutlined,
} from '@ant-design/icons';
import { ActionType, EditableProTable, ProColumns } from '@ant-design/pro-components';
import { FormattedMessage, useSelector } from '@umijs/max';
import { Button, Card, Form, FormInstance, Space, Switch, Tag, Tooltip } from 'antd';
import { useRef, useState } from 'react';

type ResourceChildListProps = {
  form: FormInstance;
};

const ResourceChildList: React.FC<ResourceChildListProps> = (props) => {
  const formatMessage = getFormatMessage();
  const actionRef = useRef<ActionType>();
  const [value, setValue] = useState<ResourceItem[]>([]);
  const resource: ResourceModalState = useSelector((state: any) => state?.resource);

  const columns: ProColumns<ResourceItem>[] = [
    {
      title: formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'code',
      width: 250,
      valueType: 'text',
    },
    {
      title: formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 250,
      valueType: 'text',
    },
    {
      title: formatMessage({ id: 'pages.sort', defaultMessage: 'Sắp xếp' }),
      dataIndex: 'sort',
      width: 100,
      valueType: 'digit',
    },
    {
      title: formatMessage({ id: 'pages.hide_in_menu', defaultMessage: 'Ẩn trong menu' }),
      dataIndex: 'hide_in_menu',
      width: 120,
      valueType: 'switch',
      render: (_, record: ResourceItem) => {
        return <Switch checked={record.hide_in_menu} disabled />;
      },
    },
    {
      title: formatMessage({ id: 'pages.type', defaultMessage: 'Loại' }),
      dataIndex: 'type',
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
        allowClear: false,
      },
      width: 120,
      valueType: 'select',
      valueEnum: getResourceTypeEnum(),
      render: (_, record: ResourceItem) => {
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
      title: formatMessage({ id: 'pages.scope', defaultMessage: 'Phạm vi' }),
      dataIndex: 'scopes',
      width: 400,
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.scope.placeholder',
          defaultMessage: 'Chọn phạm vi.',
        }),
        allowClear: false,
        mode: 'multiple',
      },
      valueType: 'select',
      request: async () => {
        const res = await getAllScopes({ status: ENUM_STATUS.ACTIVE });
        if (!res) return [];
        return res?.map((it) => ({ value: it.id, label: it.name }));
      },
    },
    {
      title: formatMessage({ id: 'pages.status', defaultMessage: 'Trạng thái' }),
      dataIndex: 'status',
      width: 150,
      fieldProps: {
        placeholder: formatMessage({
          id: 'pages.status.placeholder',
          defaultMessage: 'Chọn trạng thái.',
        }),
        allowClear: false,
      },
      valueType: 'select',
      valueEnum: getStatusEnum(),
    },
    {
      title: formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      className: 'sm:!sticky sm:right-0 sm:z-[2] sm:bg-white sm:shadow',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 90,
      render: (_, record, __, action) => (
        <Space.Compact key="space" block style={{ justifyContent: 'center' }}>
          <Tooltip title={formatMessage({ id: 'pages.update' })}>
            <Button
              type="dashed"
              key="editable"
              icon={<EditTwoTone />}
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            />
          </Tooltip>
          <EditableProTable.RecordCreator key="copy" record={{ ...record, id: Date.now() }}>
            <Tooltip title={formatMessage({ id: 'pages.copy' })}>
              <Button type="dashed" key="copy" icon={<CopyOutlined />} />
            </Tooltip>
          </EditableProTable.RecordCreator>
        </Space.Compact>
      ),
    },
  ];

  if (!resource.ResourceForm?.type) return null;
  return (
    <Card>
      <Form.Item name="resources" hidden />
      <EditableProTable<any>
        headerTitle={formatMessage({
          id: 'pages.Admin.Resource.ResourceList.headerTitle',
          defaultMessage: 'Danh sách tài nguyên',
        })}
        actionRef={actionRef}
        rowKey="id"
        value={value}
        onChange={(values) => {
          props.form.setFieldsValue({ resources: values });
          setValue(values as ResourceItem[]);
        }}
        recordCreatorProps={false}
        pagination={{ ...PAGINATE_OPTIONS }}
        params={{
          resource: resource.ResourceForm?.itemEdit?.id,
          type: resource.ResourceForm?.type,
        }}
        request={async (params, sort) => {
          const { type, ...body } = params;
          if (!type || !body.resource) return { data: [] };
          const res = await queryResources(body, sort);
          return {
            ...res,
            data: res.data.map((resource) => ({
              ...resource,
              scopes: resource.scopes?.map((it) => it.id),
            })),
          };
        }}
        columns={columns}
        scroll={scrollTable}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              actionRef.current?.addEditRecord?.({ id: Date.now() });
            }}
            icon={<PlusOutlined />}
          >
            <FormattedMessage id="pages.add" defaultMessage="Thêm" />
          </Button>,
        ]}
        editable={{
          type: 'single',
          saveText: (
            <Tooltip title={formatMessage({ id: 'pages.save' })}>
              <Button key="save" icon={<SaveTwoTone />} type="dashed" />
            </Tooltip>
          ),
          cancelText: (
            <Tooltip title={formatMessage({ id: 'pages.Cancel' })}>
              <Button key="cancel" icon={<UndoOutlined />} type="dashed" />
            </Tooltip>
          ),
          deleteText: (
            <Tooltip title={formatMessage({ id: 'pages.delete' })}>
              <Button type="dashed" danger icon={<DeleteOutlined />} />
            </Tooltip>
          ),
          actionRender: (row, __, dom) => [
            <Space.Compact key="space" block style={{ justifyContent: 'center' }}>
              {dom.save}
              {dom.cancel}
              {dom.delete}
            </Space.Compact>,
          ],
          deletePopconfirmMessage: getPopupConfirmDelete(),
          onlyAddOneLineAlertMessage: formatMessage({
            id: 'message.warn.create',
          }),
          onlyOneLineEditorAlertMessage: formatMessage({
            id: 'message.warn.edit',
          }),
        }}
      />
    </Card>
  );
};

export default ResourceChildList;
