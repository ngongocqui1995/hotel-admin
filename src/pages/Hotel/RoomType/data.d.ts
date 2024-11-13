export interface RoomTypeItem {
  code: string;
  name: string;
  price: number;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateRoomType {
  code: string;
  name: string;
  price: number;
}

export interface UpdateRoomType {
  code: string;
  name: string;
  price: number;
}

export interface QueryRoomTypes {
  data: RoomTypeItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusRoomType {
  status: string;
  message: string;
}
