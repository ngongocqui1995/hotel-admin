import { RentalVoucherItem } from '@/pages/RentalVoucher/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface RentalVoucherModalState {
  RentalVoucherList?: {
    reload?: () => void;
  };
  RentalVoucherForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: RentalVoucherItem;
  };
  RentalVoucherReport?: {
    type?: ENUM_SCOPE_TYPE;
  };
}

export interface RentalVoucherModelType {
  namespace: string;
  state: RentalVoucherModalState;
  reducers: {
    reset: Reducer<RentalVoucherModalState>;
    updateRentalVoucherForm: Reducer<RentalVoucherModalState>;
    updateRentalVoucherList: Reducer<RentalVoucherModalState>;
    updateRentalVoucherReport: Reducer<RentalVoucherModalState>;
  };
}

const initialState = {
  RentalVoucherList: {
    reload: undefined,
  },
  RentalVoucherForm: {
    type: undefined,
    itemEdit: undefined,
  },
  RentalVoucherReport: {
    type: undefined,
  },
};

const RentalVoucherModel: RentalVoucherModelType = {
  namespace: 'rentalVoucher',
  state: initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateRentalVoucherForm(state, action) {
      const RentalVoucherForm = state?.RentalVoucherForm || {};
      const fields = action.payload;
      Object.assign(RentalVoucherForm, fields);
      return { ...state, RentalVoucherForm };
    },
    updateRentalVoucherList(state, action) {
      const RentalVoucherList = state?.RentalVoucherList || {};
      const fields = action.payload;
      Object.assign(RentalVoucherList, fields);
      return { ...state, RentalVoucherList };
    },
    updateRentalVoucherReport(state, action) {
      const RentalVoucherReport = state?.RentalVoucherReport || {};
      const fields = action.payload;
      Object.assign(RentalVoucherReport, fields);
      return { ...state, RentalVoucherReport };
    },
  },
};

export default RentalVoucherModel;
