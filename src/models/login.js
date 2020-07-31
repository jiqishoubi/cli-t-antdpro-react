import { router } from 'umi';
import { localDB } from '@/utils/utils';
import { loginStateKey } from '@/utils/consts';
import { loginAjax, getMenuRights } from '@/services/login';
import { dealMenu, findFirstMenuUrl } from '@/utils/login';
import { handleRes } from '@/utils/requestw'

const defaultState = {
  loginInfo: null,
  allMenu: [],
  menuTree: [],
  rightsArr: [],
  mixMenuActiveIndex: '0', //mix模式
};

const Model = {
  namespace: 'login',

  state: defaultState,

  effects: {
    //登录
    *login({ payload }, { call, put }) {
      const res = yield call(loginAjax, payload);
      console.log(res)
      if (!handleRes(res)) {
        return false
      }

      let loginInfo = {
        ...res.data.staffInfo,
        token: res.data.loginSessionId,
      }

      yield put({
        type: 'saveDB',
        payload: {
          loginInfo
        },
      });

      //这里是异步的 没阻塞
      yield put({
        type: 'getMenuRightsFunc',
      });

      return res
    },

    //获取菜单权限，列表
    *getMenuRightsFunc({ payload, success }, { call, put, select }) {
      //获取菜单权限
      const res = yield call(getMenuRights);
      if (!handleRes(res)) {
        return res
      }

      let allMenu = res.data
      let dealMenuRes = dealMenu(allMenu);

      yield put({
        type: 'saveDB',
        payload: {
          allMenu,
          menuTree: dealMenuRes.menuTree,
          rightsArr: dealMenuRes.rightsArr,
        },
      });

      // 四、跳转主页  找到树形菜单结构的 第一菜单路径，进行跳转
      const firstUrl = findFirstMenuUrl({
        arr: dealMenuRes.menuTree,
        urlKey: 'menuUrl',
      });
      router.replace(firstUrl);
    },

    // 重新登录
    *loginAgain({ payload, success, error }, { call, put }) {
      if (localDB.getItem(loginStateKey)) {
        const loginState = localDB.getItem(loginStateKey);
        yield put({
          type: 'saveDB',
          payload: loginState,
        });
      }
    },

    //注销
    *logout({ payload, success, error }, { call, put }) {
      if (window.location.pathname !== '/user/login') {
        yield put({
          type: 'save',
          payload: defaultState,
        });
        localDB.deleteItem(loginStateKey);
        router.replace({
          pathname: '/user/login',
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveDB(state, { payload }) {
      let newState = {
        ...state,
        ...payload,
      };
      localDB.setItem(loginStateKey, newState);
      return newState;
    },
  },
};

export default Model;
