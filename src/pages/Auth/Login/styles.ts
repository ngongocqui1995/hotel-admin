import { createStyles } from 'antd-style';

export const useLoginStyles = createStyles(({ token }) => {
  return {
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
      zIndex: 1,
    },
    container: {
      height: '100%',
    },

    // '.ant-pro-form-login-page-notice': {
    //   backgroundColor:
    //     setting?.navTheme === 'realDark' ? '#000000' : initialState?.settings?.token?.bgLayout,
    // },
    // '.ant-pro-form-login-page-container': {
    //   backgroundColor:
    //     setting?.navTheme === 'realDark' ? '#000000' : initialState?.settings?.token?.bgLayout,
    // },
    // '.ant-pro-form-login-page-desc': {
    //   color: setting?.colorPrimary,
    // },
    // '.title-login': {
    //   marginBottom: 10,
    //   textAlign: 'center',
    //   color: setting?.colorPrimary,
    // },
    // '.ant-input-affix-wrapper': {
    //   backgroundColor: initialState?.settings?.token?.bgLayout,
    //   svg: {
    //     color: setting?.colorPrimary,
    //   },
    //   input: {
    //     backgroundColor: `${initialState?.settings?.token?.bgLayout} !important`,
    //   },
    // },
    // '.remember-password': {
    //   color: setting?.colorPrimary,
    // },
    // '.forget-password': {
    //   color: setting?.colorPrimary,
    //   float: 'right',
    // },
    // '.ant-checkbox': {
    //   '.ant-checkbox-inner': {
    //     backgroundColor: `${setting?.colorPrimary} !important`,
    //     borderColor: `${setting?.colorPrimary} !important`,
    //   },
    //   '&:hover .ant-checkbox-inner': {
    //     backgroundColor: `${setting?.colorPrimary} !important`,
    //     borderColor: `transparent !important`,
    //   },
    // },
    // '.btn-login': {
    //   backgroundColor: setting?.colorPrimary,
    //   '&:hover': {
    //     backgroundColor: `${setting?.colorPrimary} !important`,
    //   },
    // },
  };
});
