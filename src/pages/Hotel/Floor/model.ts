import { FloorItem } from '@/pages/Hotel/Floor/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface FloorModalState {
  FloorList?: {
    reload?: () => void;
  };
  FloorForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: FloorItem;
  };
}

export interface FloorModelType {
  namespace: string;
  state: FloorModalState;
  reducers: {
    reset: Reducer<FloorModalState>;
    updateFloorForm: Reducer<FloorModalState>;
    updateFloorList: Reducer<FloorModalState>;
  };
}

const initialState = {
  FloorList: {
    reload: undefined,
  },
  FloorForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const FloorModel: FloorModelType = {
  namespace: 'floor',
  state: initialState,

  reducers: {
    reset() {
      return initialState;
    },
    updateFloorForm(state, action) {
      const FloorForm = state?.FloorForm || {};
      const fields = action.payload;
      Object.assign(FloorForm, fields);
      return { ...state, FloorForm };
    },
    updateFloorList(state, action) {
      const FloorList = state?.FloorList || {};
      const fields = action.payload;
      Object.assign(FloorList, fields);
      return { ...state, FloorList };
    },
  },
};

export default FloorModel;
