import { UserItem } from '@/pages/Admin/User/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface UserModalState {
  UserList?: {
    reload?: () => void;
  };
  UserForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: UserItem;
  };
}

export interface UserModelType {
  namespace: string;
  state: UserModalState;
  reducers: {
    reset: Reducer<UserModalState>;
    updateUserForm: Reducer<UserModalState>;
    updateUserList: Reducer<UserModalState>;
  };
}

const initialState = {
  UserList: {
    reload: undefined,
  },
  UserForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const UserModel: UserModelType = {
  namespace: 'user',
  state: initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateUserForm(state, action) {
      const UserForm = state?.UserForm || {};
      const fields = action.payload;
      Object.assign(UserForm, fields);
      return { ...state, UserForm };
    },
    updateUserList(state, action) {
      const UserList = state?.UserList || {};
      const fields = action.payload;
      Object.assign(UserList, fields);
      return { ...state, UserList };
    },
  },
};

export default UserModel;
