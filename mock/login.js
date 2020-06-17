import api_login from '@/services/api/login';

const nbsp = ' ';

export default {
  //登录
  ['POST' + nbsp + api_login.login]: {
    code: 200,
    message: '成功',
    data: {},
  },
};
