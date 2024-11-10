import { RoleItem } from '@/pages/Admin/Role/data';

export interface UserItem {
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

export interface CreateUser {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface UpdateUser {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  role: string;
}

export interface ChangePasswordUser {
  current_password: string;
  confirm_password: string;
  new_password: string;
}

export interface ChangePasswordCustomer {
  confirm_password: string;
  new_password: string;
  user: string;
}

export interface QueryUsers {
  data: UserItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusUser {
  status: string;
  message: string;
}
