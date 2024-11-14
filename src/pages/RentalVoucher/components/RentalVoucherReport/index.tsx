import { RentalVoucherModalState } from '@/pages/RentalVoucher/model';
import {
  getRentalVoucherMonthReport,
  getRentalVoucherYearReport,
} from '@/pages/RentalVoucher/service';
import {
  ProForm,
  ProFormDatePicker,
  ProFormDependency,
  ProFormGroup,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, Space, Tabs, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import generatePDF from 'react-to-pdf';

const RentalVoucherReport = () => {
  const rentalVoucher: RentalVoucherModalState = useSelector((state: any) => state?.rentalVoucher);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalYear, setTotalYear] = useState(0);
  const [monthLoading, setMonthLoading] = useState(false);
  const [yearLoading, setYearLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [form] = ProForm.useForm();

  useEffect(() => {
    if (rentalVoucher.RentalVoucherReport?.type) {
      (async () => {
        setMonthLoading(true);
        setYearLoading(true);
        const [dataMonth, dataYear] = await Promise.all([
          getRentalVoucherMonthReport(dayjs().toISOString()),
          getRentalVoucherYearReport(dayjs().toISOString()),
        ]);
        setMonth(dataMonth?.data || []);
        setYear(dataYear?.data || []);
        setTotalMonth(dataMonth?.total || 0);
        setTotalYear(dataYear?.total || 0);
        form.setFieldsValue({
          month: dayjs().format('YYYY-MM'),
          year: dayjs().format('YYYY'),
        });
        setMonthLoading(false);
        setYearLoading(false);
      })();
    }
    setModalVisible(!!rentalVoucher.RentalVoucherReport?.type);
  }, [rentalVoucher.RentalVoucherReport?.type]);

  const getMonthReport = async (month: string) => {
    setMonthLoading(true);
    const data = await getRentalVoucherMonthReport(month);
    setMonth(data?.data || []);
    setTotalMonth(data?.total || 0);
    setMonthLoading(false);
  };

  const getYearReport = async (year: string) => {
    setYearLoading(true);
    const data = await getRentalVoucherYearReport(year);
    setYear(data?.data || []);
    setTotalYear(data?.total || 0);
    setYearLoading(false);
  };

  const onCancel = () => {
    dispatch({
      type: 'rentalVoucher/updateRentalVoucherReport',
      payload: { type: '' },
    });
    form.resetFields();
  };

  return (
    <Modal
      width={786}
      title="Báo cáo phiếu thuê"
      forceRender
      destroyOnClose
      open={modalVisible}
      onCancel={onCancel}
      footer={false}
    >
      <ProForm
        form={form}
        layout="horizontal"
        submitter={{
          render: (_: any, dom: any) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
          searchConfig: {
            submitText: 'In báo cáo',
          },
          resetButtonProps: {
            className: 'hidden',
          },
        }}
        onFinish={async () => {
          switch (activeKey) {
            case '1':
              await generatePDF(() => document.getElementById('report-month'), {
                filename: 'report-month',
              });
              break;
            case '2':
              await generatePDF(() => document.getElementById('report-year'), {
                filename: 'report-year',
              });
              break;
            default:
              break;
          }
        }}
      >
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          onChange={(activeKey) => setActiveKey(activeKey)}
          centered
        >
          <Tabs.TabPane tab="Thống kê theo tháng" key="1" forceRender>
            <ProFormDatePicker
              width="md"
              name="month"
              label="Chọn tháng"
              allowClear={false}
              fieldProps={{
                picker: 'month',
                format: 'YYYY-MM',
                onChange: async (value) => {
                  await getMonthReport(dayjs(value).toISOString());
                },
              }}
            />
            <div id="report-month" className="p-4">
              <Typography.Title level={3} className="text-center">
                Thống kê doanh thu tháng
              </Typography.Title>
              <br />
              <ProForm.Group>
                <ProFormDependency name={['month']}>
                  {({ month }) => (
                    <ProFormText label="Tháng">{dayjs(month).format('YYYY-MM')}</ProFormText>
                  )}
                </ProFormDependency>
                <ProFormText label="Tổng doanh thu">
                  {totalMonth.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </ProFormText>
              </ProForm.Group>
              <ProTable
                columns={[
                  { title: 'Loại phòng', dataIndex: 'room_type' },
                  {
                    title: 'Doanh thu',
                    dataIndex: 'price',
                    renderText: (text) =>
                      text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                  },
                  { title: 'Phần trăm', valueType: 'percent', dataIndex: 'percentage' },
                ]}
                loading={monthLoading}
                dataSource={month}
                search={false}
                options={false}
                pagination={false}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thống kê theo năm" key="2" forceRender>
            <ProFormDatePicker
              width="md"
              name="year"
              label="Chọn năm"
              allowClear={false}
              fieldProps={{
                picker: 'year',
                format: 'YYYY',
                onChange: async (value) => {
                  await getYearReport(dayjs(value).toISOString());
                },
              }}
            />
            <div id="report-year" className="p-4">
              <Typography.Title level={3} className="text-center">
                Thống kê doanh thu năm
              </Typography.Title>
              <br />
              <ProFormGroup>
                <ProFormDependency name={['year']}>
                  {({ year }) => (
                    <ProFormText label="Năm">{dayjs(year).format('YYYY')}</ProFormText>
                  )}
                </ProFormDependency>
                <ProFormText label="Tổng doanh thu">
                  {totalYear.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </ProFormText>
              </ProFormGroup>
              <ProTable
                columns={[
                  { title: 'Tháng', dataIndex: 'month' },
                  {
                    title: 'Doanh thu',
                    dataIndex: 'price',
                    renderText: (text) =>
                      text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                  },
                  { title: 'Phần trăm', valueType: 'percent', dataIndex: 'percentage' },
                ]}
                loading={yearLoading}
                dataSource={year}
                search={false}
                options={false}
                pagination={false}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </ProForm>
    </Modal>
  );
};

export default RentalVoucherReport;
