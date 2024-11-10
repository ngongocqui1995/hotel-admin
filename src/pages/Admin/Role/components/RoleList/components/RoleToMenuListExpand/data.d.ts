import { MenuItem } from '@/pages/Admin/Menu/data';
import { PermissionItem } from '@/pages/Admin/Permission/data';
import { RoleItem } from '@/pages/Admin/Role/data';
import { RESOURCE_TYPE_KEYS } from '@/utils/utils.enum';

export interface RoleToMenuExpand {
  id: string;
  role: RoleItem;
  menu: MenuItem;
  type: RESOURCE_TYPE_KEYS;
  permissions: PermissionItem[];
  createdAt: string;
  updatedAt: string;
}

export interface QueryRoleToMenuExpand {
  data: RoleToMenuExpand[];
  total: number;
  success: boolean;
}
