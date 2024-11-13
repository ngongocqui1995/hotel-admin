import { CustomerItem } from '@/pages/Admin/Customer/data';
import { RoomItem } from '@/pages/Hotel/Room/data';

export interface RentalVoucherItem {
  room: RoomItem;
  checkin_date: string;
  checkout_date: string;
  customers: CustomerItem[];
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateRentalVoucher {
  room: string;
  checkin_date: string;
  checkout_date: string;
  status: string;
}

export interface UpdateRentalVoucher {
  room: string;
  checkin_date: string;
  checkout_date: string;
  status: string;
}

export interface QueryRentalVouchers {
  data: RentalVoucherItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusRentalVoucher {
  status: string;
  message: string;
}
