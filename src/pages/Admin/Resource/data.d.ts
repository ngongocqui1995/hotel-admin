import { RoleItem } from '@/pages/Admin/Role/data';
import { ScopeItem } from '@/pages/Admin/Scope/data';
import { RESOURCE_TYPE_KEYS } from '@/utils/utils.enum';

export interface ResourceItem {
  code: string;
  name: string;
  type: RESOURCE_TYPE_KEYS;
  hide_in_menu: boolean;
  sort: number;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
  scopes: ScopeItem[];
  resources: ResourceItem[];
  roles: {
    id: string;
    role: RoleItem;
    scopes: ScopeItem[];
  }[];
}

export interface CreateResource {
  url: string;
  type: string;
}

export interface UpdateResource {
  url: string;
  type: string;
}

export interface QueryResources {
  data: ResourceItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusResource {
  status: string;
  message: string;
}
