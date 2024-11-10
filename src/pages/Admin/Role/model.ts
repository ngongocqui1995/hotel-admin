import { RoleToMenu } from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/data';
import { RoleItem } from '@/pages/Admin/Role/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface RoleModalState {
  RoleList?: {
    reload?: () => void;
  };
  RoleForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: RoleItem;
  };
  MenuList?: {
    reload?: () => void;
  };
  MenuForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: RoleToMenu;
  };
}

export interface RoleModelType {
  namespace: string;
  state: RoleModalState;
  reducers: {
    reset: Reducer<RoleModalState>;
    updateRoleForm: Reducer<RoleModalState>;
    updateRoleList: Reducer<RoleModalState>;
    updateMenuForm: Reducer<RoleModalState>;
    updateMenuList: Reducer<RoleModalState>;
  };
}

const initialState = {
  RoleList: {
    reload: undefined,
  },
  RoleForm: {
    type: undefined,
    itemEdit: undefined,
  },
  MenuList: {
    reload: undefined,
  },
  MenuForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const RoleModel: RoleModelType = {
  namespace: 'role',
  state: initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateRoleForm(state, action) {
      const RoleForm = state?.RoleForm || {};
      const fields = action.payload;
      Object.assign(RoleForm, fields);
      return { ...state, RoleForm };
    },
    updateRoleList(state, action) {
      const RoleList = state?.RoleList || {};
      const fields = action.payload;
      Object.assign(RoleList, fields);
      return { ...state, RoleList };
    },
    updateMenuForm(state, action) {
      const MenuForm = state?.MenuForm || {};
      const fields = action.payload;
      Object.assign(MenuForm, fields);
      return { ...state, MenuForm };
    },
    updateMenuList(state, action) {
      const MenuList = state?.MenuList || {};
      const fields = action.payload;
      Object.assign(MenuList, fields);
      return { ...state, MenuList };
    },
  },
};

export default RoleModel;
