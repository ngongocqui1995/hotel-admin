import { RoleItem } from '@/pages/Admin/Role/data';

export interface CustomerItem {
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

export interface CreateCustomer {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  password: string;
  role: string;
}

export interface UpdateCustomer {
  avatar: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  role: string;
}

export interface ChangePasswordCustomer {
  current_password: string;
  confirm_password: string;
  new_password: string;
}

export interface ChangePasswordCustomer {
  confirm_password: string;
  new_password: string;
  Customer: string;
}

export interface QueryCustomers {
  data: CustomerItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusCustomer {
  status: string;
  message: string;
}
