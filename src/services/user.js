import { request } from 'umi';

//列表
export async function logout() {
  return request('', {
    method: 'GET'
  });
}