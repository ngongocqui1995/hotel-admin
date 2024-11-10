import { getAccessToken, getFormatMessage, getServerApi } from '@/utils/utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, ColProps, Form, FormInstance, Row, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { NamePath } from 'antd/es/form/interface';
import { UploadChangeParam } from 'antd/es/upload';
import sizeOf from 'image-size';
import React, { useState } from 'react';

interface ProFormAvatarProps {
  name?: NamePath[] | NamePath;
  label?: string;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

const ProFormAvatar: React.FC<ProFormAvatarProps> = (props) => {
  const formatMessage = getFormatMessage();
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  const beforeUpload = async (file: any) => {
    const isImage = !!file.type.match(/(jpg|jpeg|png|gif)/);
    if (!isImage) {
      message.error(
        formatMessage({
          id: 'pages.ProForm.Avatar.errors.type',
          defaultMessage: 'Bạn chỉ có thể up lên file JPG/PNG/JPEG/GIF!',
        }),
      );
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error(
        formatMessage({
          id: 'pages.ProForm.Avatar.errors.size',
          defaultMessage: 'Ảnh phải có kích thước nhở 5MB!',
        }),
      );
    }

    if (isImage && isLt5M) return true;
    return false;
  };

  const handleChange = (info: UploadChangeParam, form: FormInstance) => {
    if (info.file?.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file?.status === 'done') {
      form.setFieldsValue({ [props.name || 'avatar']: info.file.response?.link });
      setLoading(false);
      return;
    }
  };

  return (
    <Form.Item noStyle shouldUpdate>
      {(form) => {
        const values = form.getFieldsValue();
        return (
          <Form.Item
            name="avatar"
            label={formatMessage({ id: 'pages.ProForm.Avatar.title', defaultMessage: 'Ảnh' })}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 10 }}
            {...props}
          >
            <ImgCrop
              rotationSlider
              modalTitle={formatMessage({
                id: 'pages.ProForm.Avatar.Update.title',
                defaultMessage: 'Chỉnh sửa ảnh',
              })}
              modalOk={formatMessage({ id: 'pages.OK', defaultMessage: 'Đồng ý' })}
              modalCancel={formatMessage({ id: 'pages.Cancel', defaultMessage: 'Huỷ' })}
              aspect={dimensions.width / dimensions.height}
              beforeCrop={async (file) => {
                const { width, height } = sizeOf(Buffer.from(await file.arrayBuffer()));
                setDimensions({ width: width || 1, height: height || 1 });

                return true;
              }}
            >
              <Upload
                name="file"
                listType="picture-card"
                showUploadList={false}
                maxCount={1}
                beforeUpload={beforeUpload}
                onChange={(info) => handleChange(info, form)}
                method="POST"
                action={`${getServerApi()}/uploads/image`}
                headers={{
                  Authorization: `Bearer ${getAccessToken()}`,
                }}
              >
                {values[props.name || 'avatar'] ? (
                  <Card size="small">
                    <img
                      src={`${getServerApi()}${values[props.name || 'avatar']}`}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
                  </Card>
                ) : (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>{loading ? <LoadingOutlined /> : <PlusOutlined />}</Col>
                    <Col span={24}>Upload</Col>
                  </Row>
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

export default ProFormAvatar;
