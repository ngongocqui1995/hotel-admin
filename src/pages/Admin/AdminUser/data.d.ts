import { RoleItem } from '@/pages/Admin/Role/data';

export interface AdminUserItem {
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

export interface CreateAdminUser {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface UpdateAdminUser {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  role: string;
}

export interface ChangePasswordAdminUser {
  current_password: string;
  confirm_password: string;
  new_password: string;
}

export interface ChangePasswordAdminUser {
  confirm_password: string;
  new_password: string;
  AdminUser: string;
}

export interface QueryAdminUsers {
  data: AdminUserItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusAdminUser {
  status: string;
  message: string;
}
