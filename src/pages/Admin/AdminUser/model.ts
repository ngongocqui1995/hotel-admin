import { AdminUserItem } from '@/pages/Admin/AdminUser/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface AdminUserModalState {
  AdminUserList?: {
    reload?: () => void;
  };
  AdminUserForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: AdminUserItem;
  };
}

export interface AdminUserModelType {
  namespace: string;
  state: AdminUserModalState;
  reducers: {
    reset: Reducer<AdminUserModalState>;
    updateAdminUserForm: Reducer<AdminUserModalState>;
    updateAdminUserList: Reducer<AdminUserModalState>;
  };
}

const initialState = {
  AdminUserList: {
    reload: undefined,
  },
  AdminUserForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const AdminUserModel: AdminUserModelType = {
  namespace: 'adminUser',
  state: initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateAdminUserForm(state, action) {
      const AdminUserForm = state?.AdminUserForm || {};
      const fields = action.payload;
      Object.assign(AdminUserForm, fields);
      return { ...state, AdminUserForm };
    },
    updateAdminUserList(state, action) {
      const AdminUserList = state?.AdminUserList || {};
      const fields = action.payload;
      Object.assign(AdminUserList, fields);
      return { ...state, AdminUserList };
    },
  },
};

export default AdminUserModel;
