import { RoleItem } from '@/pages/Admin/Role/data';

export interface RootUserItem {
  avatar: string;
  createdAt: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  phone: string;
  role: RoleItem;
  status: string;
  updatedAt: string;
}

export interface CreateRootUser {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface UpdateRootUser {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  role: string;
}

export interface ChangePasswordRootUser {
  current_password: string;
  confirm_password: stringŻ;
  new_password: string;
}

export interface ChangePasswordRootUser {
  confirm_password: string;
  new_password: string;
  root_user: string;
}

export interface QueryRootUsers {
  data: RootUserItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusRootUser {
  status: string;
  message: string;
}
