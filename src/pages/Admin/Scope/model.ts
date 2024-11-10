import { ScopeItem } from '@/pages/Admin/Scope/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface ScopeModalState {
  ScopeList?: {
    reload?: () => void;
  };
  ScopeForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: ScopeItem;
  };
}

export interface ScopeModelType {
  namespace: string;
  state: ScopeModalState;
  reducers: {
    reset: Reducer<ScopeModalState>;
    updateScopeForm: Reducer<ScopeModalState>;
    updateScopeList: Reducer<ScopeModalState>;
  };
}

const initialState = {
  ScopeList: {
    reload: undefined,
  },
  ScopeForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const ScopeModel: ScopeModelType = {
  namespace: 'scope',
  state: initialState,

  reducers: {
    reset() {
      return initialState;
    },
    updateScopeForm(state, action) {
      const ScopeForm = state?.ScopeForm || {};
      const fields = action.payload;
      Object.assign(ScopeForm, fields);
      return { ...state, ScopeForm };
    },
    updateScopeList(state, action) {
      const ScopeList = state?.ScopeList || {};
      const fields = action.payload;
      Object.assign(ScopeList, fields);
      return { ...state, ScopeList };
    },
  },
};

export default ScopeModel;
