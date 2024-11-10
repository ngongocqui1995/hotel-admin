import { ResourceItem } from '@/pages/Admin/Resource/data';
import { ENUM_SCOPE_TYPE } from '@/utils/utils.enum';
import { Reducer } from '@umijs/max';

export interface ResourceModalState {
  ResourceList?: {
    reload?: () => void;
  };
  ResourceForm?: {
    type?: ENUM_SCOPE_TYPE;
    itemEdit?: ResourceItem;
  };
}

export interface ResourceModelType {
  namespace: string;
  state: ResourceModalState;
  reducers: {
    reset: Reducer<ResourceModalState>;
    updateResourceForm: Reducer<ResourceModalState>;
    updateResourceList: Reducer<ResourceModalState>;
  };
}

const initialState = {
  ResourceList: {
    reload: undefined,
  },
  ResourceForm: {
    type: undefined,
    itemEdit: undefined,
  },
};

const ResourceModel: ResourceModelType = {
  namespace: 'resource',
  state: initialState,

  reducers: {
    reset() {
      return initialState;
    },
    updateResourceForm(state, action) {
      const ResourceForm = state?.ResourceForm || {};
      const fields = action.payload;
      Object.assign(ResourceForm, fields);
      return { ...state, ResourceForm };
    },
    updateResourceList(state, action) {
      const ResourceList = state?.ResourceList || {};
      const fields = action.payload;
      Object.assign(ResourceList, fields);
      return { ...state, ResourceList };
    },
  },
};

export default ResourceModel;
