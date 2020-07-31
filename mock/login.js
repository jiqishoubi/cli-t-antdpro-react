import api_login from '@/services/api/login';

const nbsp = ' ';

export default {
  //登录
  ['POST' + nbsp + api_login.login]: {
    "code": 0,
    "data":
    {
      "loginSessionId": "LSIDC70505D3C62B0E339C8DB8D26936DD34",
      "staffInfo": { "createDate": 1572347023000, "createDateStr": "2019-10-29 19:03:43", "createPerson": "admin", "departCode": "DPTBASE001", "departKind": "HEAD_DEPART", "departName": "总部", "departRouteStr": "DPTBASE001", "disabled": 0, "disabledName": "有效", "id": 1, "lastLoginTime": 1596159710000, "loginName": "sysadmin", "roleName": "东北客服中心", "staffAlias": "系统平台管理员", "staffCode": "STFSYSTEMMGR", "staffName": "系统平台管理员", "staffRole": "ADMIN", "staffRoleName": "管理员", "updateDate": 1578035909000, "updateDateStr": "2020-01-03 15:18:29", "updatePerson": "sysadmin" }
    },
    "message": "登录成功"
  },
};

