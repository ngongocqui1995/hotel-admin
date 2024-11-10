import { ResourceItem } from '@/pages/Admin/Resource/data';
import { ScopeItem } from '@/pages/Admin/Scope/data';

export interface MenuItem {
  id: string;
  menu: MenuItem;
  menus: MenuItem[];
  resource: ResourceItem;
  scopes: ScopeItem[];
}

export interface RoleItem {
  code: string;
  createdAt: string;
  id: string;
  menus: MenuItem[];
  avatar: string;
  name: string;
  color: string;
  status: string;
  updatedAt: string;
}

export interface CreateRole {
  code: string;
  avatar: string;
  name: string;
  color: string;
}

export interface UpdateRole {
  code: string;
  avatar: string;
  name: string;
  color: string;
}

export interface QueryRoles {
  data: RoleItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusRole {
  status: string;
  message: string;
}
