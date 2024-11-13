import { RoomTypeItem } from '@/pages/Hotel/RoomType/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface RoomTypeModalState {
  RoomTypeList?: {
    reload?: () => void;
  };
  RoomTypeForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: RoomTypeItem;
  };
}

export interface RoomTypeModelType {
  namespace: string;
  state: RoomTypeModalState;
  reducers: {
    reset: Reducer<RoomTypeModalState>;
    updateRoomTypeForm: Reducer<RoomTypeModalState>;
    updateRoomTypeList: Reducer<RoomTypeModalState>;
  };
}

const initialState = {
  RoomTypeList: {
    reload: undefined,
  },
  RoomTypeForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const RoomTypeModel: RoomTypeModelType = {
  namespace: 'roomType',
  state: initialState,

  reducers: {
    reset() {
      return initialState;
    },
    updateRoomTypeForm(state, action) {
      const RoomTypeForm = state?.RoomTypeForm || {};
      const fields = action.payload;
      Object.assign(RoomTypeForm, fields);
      return { ...state, RoomTypeForm };
    },
    updateRoomTypeList(state, action) {
      const RoomTypeList = state?.RoomTypeList || {};
      const fields = action.payload;
      Object.assign(RoomTypeList, fields);
      return { ...state, RoomTypeList };
    },
  },
};

export default RoomTypeModel;
