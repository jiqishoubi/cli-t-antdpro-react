import requestw from '@/utils/requestw';
import api_login from './api/login';

export async function loginAjax(params) {
  return requestw({
    url: api_login.login,
    data: params,
  });
}

export async function getMenuAjax() {
  return requestw({
    url: api_login.getMenu,
  });
}
