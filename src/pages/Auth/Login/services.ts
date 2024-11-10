import { ChangePasswordUser, UserItem } from '@/pages/Admin/User/data';
import { RegisterParams } from '@/pages/Auth/Login/data';
import { getAccessToken, removeToken } from '@/utils/utils';
import { request } from '@umijs/max';
import to from 'await-to-js';
import axios from 'axios';

type LoginRequest = {
  username: string;
  password: string;
};

type LoginReponse = {
  accessToken: string;
  refreshToken: string;
};

export const authLogin = async (data: LoginRequest): Promise<LoginReponse> => {
  const res = await request(`auth/login`, { method: 'POST', data });
  return res;
};

export const authProfile = async (): Promise<UserItem | undefined> => {
  if (!getAccessToken()) return undefined;

  const [err, res] = await to(request<UserItem>('auth/profile', { method: 'GET' }));
  if (err) {
    removeToken();
    return undefined;
  }

  return res;
};

export const authRefresh = async (refreshToken: string) => {
  const res = await axios.post('auth/refresh', { refreshToken });
  return res.data;
};

export const authRegister = async (data: RegisterParams) => {
  const res = await request('auth/register', { method: 'POST', data });
  return res;
};

export async function authChangePassword(data: ChangePasswordUser) {
  return await request(`auth/change-password`, { method: 'PUT', data });
}
