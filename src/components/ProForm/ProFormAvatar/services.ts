import { request } from '@umijs/max';

export const uploadImage = async (data: FormData) => {
  return await request('uploads/image', {
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
