import { router } from 'umi';
import { localDB } from '@/utils/utils';
import { loginStateKey } from '@/utils/consts';
import { loginAjax, getMenuRights } from '@/services/login';
import { dealMenu, findFirstMenuUrl } from '@/utils/login_old';
import { handleRes } from '@/utils/requestw';

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
      if (!handleRes(res)) {
        return false;
      }

      let loginInfo = {
        ...res.data.staffInfo,
        token: res.data.loginSessionId,
      };

      yield put({
        type: 'saveDB',
        payload: {
          loginInfo,
        },
      });

      //这里是异步的 没阻塞
      yield put({
        type: 'getMenuRightsFunc',
      });

      return res;
    },

    //获取菜单权限，列表
    *getMenuRightsFunc({ }, { call, put }) {
      //获取菜单权限
      const res = yield call(getMenuRights);
      if (!handleRes(res)) {
        return res;
      }

      let allMenu = res.data;
      console.time('菜单')
      let dealMenuRes = dealMenu(allMenu);
      console.timeEnd('菜单')

      yield put({
        type: 'saveDB',
        payload: {
          allMenu,
          menuTree: dealMenuRes.menuTree,
          rightsArr: dealMenuRes.rightsArr,
        },
      });

      //跳转主页  找到树形菜单结构的 第一菜单路径，进行跳转
      setTimeout(() => {
        const firstUrl = findFirstMenuUrl({
          arr: dealMenuRes.menuTree,
          urlKey: 'menuUrl',
        });
        router.replace(firstUrl);
        // router.replace('/order/installorderlist2');
      }, 5);
    },

    // 重新登录
    *loginAgain({ }, { put }) {
      if (localDB.getItem(loginStateKey)) {
        const loginState = localDB.getItem(loginStateKey);
        yield put({
          type: 'saveDB',
          payload: loginState,
        });
      }
    },

    //注销
    *logout({ }, { put }) {
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
    //mix模式下 上面菜单 index
    saveMixMenuActiveIndex(state, { payload }) {
      if (payload == -1 || payload == '-1') {
        return state;
      }
      let newState = {
        ...state,
        mixMenuActiveIndex: payload,
      };
      localDB.setItem(loginStateKey, newState);
      return newState;
    },
  },
};

export default Model;
