import { AreaItem } from '@/pages/Hotel/Area/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface AreaModalState {
  AreaList?: {
    reload?: () => void;
  };
  AreaForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: AreaItem;
  };
}

export interface AreaModelType {
  namespace: string;
  state: AreaModalState;
  reducers: {
    reset: Reducer<AreaModalState>;
    updateAreaForm: Reducer<AreaModalState>;
    updateAreaList: Reducer<AreaModalState>;
  };
}

const initialState = {
  AreaList: {
    reload: undefined,
  },
  AreaForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const AreaModel: AreaModelType = {
  namespace: 'area',
  state: initialState,

  reducers: {
    reset() {
      return initialState;
    },
    updateAreaForm(state, action) {
      const AreaForm = state?.AreaForm || {};
      const fields = action.payload;
      Object.assign(AreaForm, fields);
      return { ...state, AreaForm };
    },
    updateAreaList(state, action) {
      const AreaList = state?.AreaList || {};
      const fields = action.payload;
      Object.assign(AreaList, fields);
      return { ...state, AreaList };
    },
  },
};

export default AreaModel;
