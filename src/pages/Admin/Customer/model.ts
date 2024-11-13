import { CustomerItem } from '@/pages/Admin/Customer/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface CustomerModalState {
  CustomerList?: {
    reload?: () => void;
  };
  CustomerForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: CustomerItem;
  };
}

export interface CustomerModelType {
  namespace: string;
  state: CustomerModalState;
  reducers: {
    reset: Reducer<CustomerModalState>;
    updateCustomerForm: Reducer<CustomerModalState>;
    updateCustomerList: Reducer<CustomerModalState>;
  };
}

const initialState = {
  CustomerList: {
    reload: undefined,
  },
  CustomerForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const CustomerModel: CustomerModelType = {
  namespace: 'customer',
  state: initialState,
  reducers: {
    reset() {
      return initialState;
    },
    updateCustomerForm(state, action) {
      const CustomerForm = state?.CustomerForm || {};
      const fields = action.payload;
      Object.assign(CustomerForm, fields);
      return { ...state, CustomerForm };
    },
    updateCustomerList(state, action) {
      const CustomerList = state?.CustomerList || {};
      const fields = action.payload;
      Object.assign(CustomerList, fields);
      return { ...state, CustomerList };
    },
  },
};

export default CustomerModel;
