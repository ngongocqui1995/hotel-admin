import { RootUserItem } from '@/pages/Admin/RootUser/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface RootUserModalState {
  RootUserList?: {
    reload?: () => void;
  };
  RootUserForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: RootUserItem;
  };
}

export interface RootUserModelType {
  namespace: string;
  state: RootUserModalState;
  reducers: {
    reset: Reducer<RootUserModalState>;
    updateRootUserForm: Reducer<RootUserModalState>;
    updateRootUserList: Reducer<RootUserModalState>;
  };
}

const initialState = {
  RootUserList: {
    reload: undefined,
  },
  RootUserForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const RootUserModel: RootUserModelType = {
  namespace: 'rootUser',
  state: initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateRootUserForm(state, action) {
      const RootUserForm = state?.RootUserForm || {};
      const fields = action.payload;
      Object.assign(RootUserForm, fields);
      return { ...state, RootUserForm };
    },
    updateRootUserList(state, action) {
      const RootUserList = state?.RootUserList || {};
      const fields = action.payload;
      Object.assign(RootUserList, fields);
      return { ...state, RootUserList };
    },
  },
};

export default RootUserModel;
