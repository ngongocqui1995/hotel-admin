import { AreaItem } from '@/pages/Hotel/Area/data';
import { FloorItem } from '@/pages/Hotel/Floor/data';
import { RoomTypeItem } from '@/pages/Hotel/RoomType/data';
import { ENUM_ROOM_STATUS } from '@/utils/utils.enum';

export interface RoomItem {
  code: string;
  key: string;
  name: string;
  area: AreaItem;
  floor: FloorItem;
  room_type: RoomTypeItem;
  room_status: ENUM_ROOM_STATUS;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateRoom {
  code: string;
  name: string;
  area: string;
  floor: string;
}

export interface UpdateRoom {
  code: string;
  name: string;
  area: string;
  floor: string;
}

export interface QueryRooms {
  data: RoomItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusRoom {
  status: string;
  message: string;
}
