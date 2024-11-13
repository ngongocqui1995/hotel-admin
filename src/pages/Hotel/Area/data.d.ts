export interface AreaItem {
  code: string;
  name: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateArea {
  code: string;
  name: string;
}

export interface UpdateArea {
  code: string;
  name: string;
}

export interface QueryAreas {
  data: AreaItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusArea {
  status: string;
  message: string;
}
