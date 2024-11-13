export interface FloorItem {
  code: string;
  name: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateFloor {
  code: string;
  name: string;
}

export interface UpdateFloor {
  code: string;
  name: string;
}

export interface QueryFloors {
  data: FloorItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusFloor {
  status: string;
  message: string;
}
