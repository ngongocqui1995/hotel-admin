export interface ScopeItem {
  code: string;
  name: string;
  color: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateScope {
  code: string;
  name: string;
  color: string;
}

export interface UpdateScope {
  code: string;
  name: string;
  color: string;
}

export interface QueryScopes {
  data: ScopeItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusScope {
  status: string;
  message: string;
}
