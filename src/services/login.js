import requestw from '@/utils/requestw';
import api_login from './api/login';

//登录
export async function loginAjax(params) {
  return requestw({
    url: api_login.loginApi,
    data: params,
  });
}

//用token获取菜单权限
export async function getMenuRights(params) {
  return requestw({
    url: api_login.getMenuApi,
    data: params
  })
}
