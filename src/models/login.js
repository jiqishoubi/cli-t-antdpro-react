import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, localDB } from '@/utils/utils';
import { loginStateKey } from '@/utils/consts';
import { loginAjax, getMenuAjax } from '@/services/login';
import { dealMenu, findFirstMenuUrl, dealMenu2, findFirstMenuUrl2 } from '@/utils/login';

const Model = {
  namespace: 'login',

  state: {
    loginInfo: null,
    allMenu: [],
    menuTree: [],
    rightsArr: [],
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(loginAjax, payload);
      if (response.status !== 0) {
        return;
      }

      let menuTree = response.data.menuPermissions;
      let dealMenuRes = dealMenu2(menuTree);

      yield put({
        type: 'saveDB',
        payload: {
          loginInfo: response.data,
          menuTree: dealMenuRes.menuTree,
          rightsArr: dealMenuRes.rightsArr,
        },
      });
      localDB.setItem('teamId', response.data.currentTeamId);
      // localStorage.setItem('loginSessionId', response.data.userOpenId)
      // yield put({ type: 'getMenu' });

      // 四、跳转主页  找到树形菜单结构的 第一菜单路径，进行跳转
      const firstUrl = findFirstMenuUrl2({
        arr: dealMenuRes.menuTree,
        urlKey: 'menuUrl',
      });
      console.log(firstUrl);
      history.replace(firstUrl);
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

    *getMenu({ payload }, { call, put, select }) {
      const response = yield call(getMenuAjax);
      console.log(response);

      let allMenu = response.data;
      let dealMenuRes = dealMenu(allMenu);
      let menuTree = dealMenuRes.menuTree;
      let rightsArr = dealMenuRes.rightsArr;
      yield put({
        type: 'saveDB',
        payload: {
          allMenu,
          menuTree,
          rightsArr,
        },
      });

      // 四、跳转主页  找到树形菜单结构的 第一菜单路径，进行跳转
      const firstUrl = findFirstMenuUrl({
        arr: menuTree,
        urlKey: 'menuUrl',
      });
      history.replace(firstUrl);
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
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
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
