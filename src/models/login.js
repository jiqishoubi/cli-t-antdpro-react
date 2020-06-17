import { stringify } from 'querystring';
import { router } from 'umi';
import { localDB } from '@/utils/utils';
import { loginStateKey } from '@/utils/consts';
import { loginAjax } from '@/services/login';
import { dealMenu2, findFirstMenuUrl2 } from '@/utils/login';
import { CodeSandboxCircleFilled } from '@ant-design/icons';

const defaultState = {
  loginInfo: null,
  allMenu: [],
  menuTree: [],
  rightsArr: [],
};

const Model = {
  namespace: 'login',

  state: defaultState,

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(loginAjax, payload);
      if (res.status !== 0) {
        return;
      }

      let menuTree = res.data.menuPermissions;
      let dealMenuRes = dealMenu2(menuTree);

      yield put({
        type: 'saveDB',
        payload: {
          loginInfo: res.data,
          menuTree: dealMenuRes.menuTree,
          rightsArr: dealMenuRes.rightsArr,
        },
      });

      localDB.setItem('teamId', res.data.currentTeamId);

      // 四、跳转主页  找到树形菜单结构的 第一菜单路径，进行跳转
      const firstUrl = findFirstMenuUrl2({
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
