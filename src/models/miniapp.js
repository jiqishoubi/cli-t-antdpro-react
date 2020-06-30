import { message } from 'antd';
import { localDB } from '@/utils/utils';
import { miniappStateKey } from '@/utils/consts';
import {
  getAuthAjax,
  getMiniappInfoAjax,
  verifyListAjax,
  getTesterAjax,
  publishAppAjax,
  cancelSubmitAjax,
} from '@/services/miniapp';

const Model = {
  namespace: 'miniapp',

  state: {
    appid: 'wxf11c5947dc4e38b6',
    miniappInfo: null,
    miniappStatus: '',

    verifyList: [], //审核列表
    testerList: [], //体验成员列表
  },

  effects: {
    *getAuth({ payload }, { call, put }) {
      const res = yield call(getAuthAjax, payload);
      if (res.code !== 200) {
        message.warning(res.message || '网络异常');
        return;
      }
      yield put({
        type: 'saveDB',
        payload: {
          appid: res.data.authorizationInfo.authorizerAppid,
        },
      });
      yield put({ type: 'getMiniappInfo' });
    },

    //获取基本信息
    *getMiniappInfo({}, { call, put, select }) {
      const miniappState = yield select(state => state.miniapp);
      const appid = miniappState.appid;
      const res = yield call(getMiniappInfoAjax, appid);
      if (!res || res.code !== 200) {
        message.warning(res.message || '网络异常');
        return;
      }
      yield put({
        type: 'saveDB',
        payload: {
          miniappInfo: res.data.authorizerInfo,
          miniappStatus: res.data.auditStatus,
        },
      });
    },

    //撤销审核
    *cancelVerify({}, { call, put, select }) {
      const miniappState = yield select(state => state.miniapp);
      const { appid } = miniappState;
      const res = yield call(cancelSubmitAjax, appid);
      if (res && res.code == 200 && res.data && res.data.status == 0) {
        message.success((res.data && res.data.data) || res.message);
        yield put({ type: 'getVerifyList' });
        yield put({ type: 'getMiniappInfo' });
      } else {
        message.warning((res.data && res.data.data) || res.message);
      }
    },

    //发布上线
    *publishApp({}, { call, put, select }) {
      const miniappState = yield select(state => state.miniapp);
      const { appid } = miniappState;
      // const res = yield call(publishAppAjax, appid);
      yield call(publishAppAjax, appid);
      // if (res && res.code == 200 && res.data && res.data.status == 0) {
      //   message.success((res.data && res.data.message) || res.message);
      // } else {
      //   message.warning((res.data && res.data.message) || res.message);
      //   return;
      // }

      // yield put({ type: 'getVerifyList' });
      yield put({ type: 'getMiniappInfo' });
    },

    //获取审核列表
    *getVerifyList({}, { call, put, select }) {
      const miniappState = yield select(state => state.miniapp);
      const { appid } = miniappState;
      const res = yield call(verifyListAjax, appid);
      if (res && res.code == 200 && res.data) {
        yield put({
          type: 'save',
          payload: {
            verifyList: res.data,
          },
        });
      }
    },

    //获取体验成员
    *getTesterList({}, { call, put, select }) {
      const miniappState = yield select(state => state.miniapp);
      const { appid } = miniappState;
      const res = yield call(getTesterAjax, appid);
      if (res && res.code == 200 && res.data && res.data.status == 0 && res.data.data) {
        yield put({
          type: 'save',
          payload: {
            testerList: res.data.data,
          },
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
      localDB.setItem(miniappStateKey, newState);
      return newState;
    },
  },
};

export default Model;
