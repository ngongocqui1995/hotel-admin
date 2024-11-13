import { RoomItem } from '@/pages/Hotel/Room/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface RoomModalState {
  RoomList?: {
    reload?: () => void;
  };
  RoomForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: RoomItem;
  };
}

export interface RoomModelType {
  namespace: string;
  state: RoomModalState;
  reducers: {
    reset: Reducer<RoomModalState>;
    updateRoomForm: Reducer<RoomModalState>;
    updateRoomList: Reducer<RoomModalState>;
  };
}

const initialState = {
  RoomList: {
    reload: undefined,
  },
  RoomForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const RoomModel: RoomModelType = {
  namespace: 'room',
  state: initialState,

  reducers: {
    reset() {
      return initialState;
    },
    updateRoomForm(state, action) {
      const RoomForm = state?.RoomForm || {};
      const fields = action.payload;
      Object.assign(RoomForm, fields);
      return { ...state, RoomForm };
    },
    updateRoomList(state, action) {
      const RoomList = state?.RoomList || {};
      const fields = action.payload;
      Object.assign(RoomList, fields);
      return { ...state, RoomList };
    },
  },
};

export default RoomModel;
