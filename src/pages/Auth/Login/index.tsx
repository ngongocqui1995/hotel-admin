import { useLoginStyles } from '@/pages/Auth/Login/styles';
import { getFormatMessage, getLocales, saveToken, validationPassWord } from '@/utils/utils';
import { dashboardPath } from '@/utils/utils.enum';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Helmet, SelectLang, history, useModel } from '@umijs/max';
import { useSetState } from 'ahooks';
import to from 'await-to-js';
import React, { useEffect } from 'react';
import LottiePlayer from './components/LottiePlayer';
import { LoginParams, RegisterParams } from './data';
import { authLogin, authProfile, authRegister } from './services';
import { Tabs } from 'antd';
import { TextEmail, TextName, TextPassword, TextPhone } from '@/components/ProForm';

type KeyTab = 'login' | 'register';

type LoginState = {
  tab: KeyTab;
};

const Login: React.FC = () => {
  const [form] = ProForm.useForm();
  const { styles } = useLoginStyles();
  const { initialState, setInitialState } = useModel('@@initialState');
  const formatMessage = getFormatMessage();
  const [state, setState] = useSetState<LoginState>({ tab: 'login' });
  // const settingDrawer = getSettingDrawer();

  useEffect(() => {
    if (initialState?.currentUser) {
      history.push(dashboardPath);
      window.location.reload();
    }
  }, [initialState?.currentUser]);

  const handleLogin = async (values: LoginParams) => {
    const res = await authLogin({ username: values.username, password: values.password });
    if (!res) return;

    saveToken(res.accessToken, res.refreshToken);

    const [, userInfo] = await to(authProfile());
    await setInitialState({ ...initialState, currentUser: userInfo });
  };

  const handleRegister = async (values: RegisterParams) => {
    await authRegister(values);
    setState({ tab: 'login' });
  };

  const renderSubmitText = () => {
    switch (state.tab) {
      case 'login':
        return formatMessage({ id: 'menu.login' });
      case 'register':
        return formatMessage({ id: 'menu.register' });
      default:
        return '';
    }
  };

  const onFinish = async (values: any) => {
    switch (state.tab) {
      case 'login':
        await handleLogin(values);
        break;
      case 'register':
        await handleRegister(values);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{formatMessage({ id: 'pages.login.title' })}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Helmet>
      <div className={styles.lang} data-lang>
        <SelectLang postLocalesData={() => getLocales()} />
      </div>
      <LoginFormPage
        form={form}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        title="Hotel Management"
        subTitle="Welcome to Hotel Management"
        initialValues={{ autoLogin: true }}
        activityConfig={{
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          action: (
            <div className="bg-login">
              <LottiePlayer src="/background/gstation.json" />
            </div>
          ),
        }}
        submitter={{
          searchConfig: {
            submitText: renderSubmitText(),
          },
        }}
        onFinish={onFinish}
      >
        <Tabs
          activeKey={state.tab}
          centered
          onChange={(activeKey) => setState({ tab: activeKey as KeyTab })}
        >
          <Tabs.TabPane
            key="login"
            destroyInactiveTabPane
            tab={formatMessage({ id: 'menu.login' })}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
                style: { maxWidth: '100%' },
              }}
              // placeholder={formatMessage({ id: 'pages.login.username.placeholder' })}
              placeholder="root@gmail.com"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'pages.login.username.required' }),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              // placeholder={formatMessage({ id: 'pages.login.password.placeholder' })}
              placeholder="Root1@"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'pages.login.password.required' }),
                },
                { validator: (_, value) => validationPassWord('UPPERCASE', value) },
                { validator: (_, value) => validationPassWord('LOWERCASE', value) },
                { validator: (_, value) => validationPassWord('NUMBER', value) },
                { validator: (_, value) => validationPassWord('SPECIAL', value) },
              ]}
            />
            <div style={{ marginBottom: 24 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                {formatMessage({ id: 'pages.login.rememberMe' })}
              </ProFormCheckbox>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            key="register"
            destroyInactiveTabPane
            tab={formatMessage({ id: 'menu.register' })}
          >
            <TextName />
            <TextPhone />
            <TextEmail />
            <TextPassword
              name="password"
              label={formatMessage({
                id: 'pages.password',
                defaultMessage: 'Mật khẩu',
              })}
              placeholder={formatMessage({
                id: 'pages.password.placeholder',
                defaultMessage: 'Nhập mật khẩu',
              })}
            />
            <TextPassword
              name="confirm_password"
              label={formatMessage({
                id: 'pages.confirm_password',
                defaultMessage: 'Mật khẩu xác nhận',
              })}
              placeholder={formatMessage({
                id: 'pages.confirm_password.placeholder',
                defaultMessage: 'Nhập mật khẩu xác nhận',
              })}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || form.getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      formatMessage({
                        id: 'pages.confirm_password.notMatch',
                        defaultMessage: 'Mật khẩu xác nhận không khớp!',
                      }),
                    );
                  },
                },
              ]}
            />
          </Tabs.TabPane>
        </Tabs>
      </LoginFormPage>
    </div>
  );
};

export default Login;
