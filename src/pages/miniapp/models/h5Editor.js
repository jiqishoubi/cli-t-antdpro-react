import { router } from 'umi/router';
import template1 from '../TemplateList/template/template1';
import template2 from '../TemplateList/template/template2';

const Model = {
  namespace: 'h5Editor',
  /**
   * state
   */
  state: {
    // 中间面板
    activeItem: null, //当前选中的item
    itemList: template2.itemList,
    h5Type: template2.type,
  },
  /**
   * 异步
   */
  effects: {
    *goEditor({ payload, success, error }, { call, put }) {
      const { json } = payload;
      yield put({
        type: 'save',
        payload: {
          itemList: json.itemList,
          h5Type: json.type,
        },
      });
      router.push('/diy/editor');
    },
  },
  /**
   * 同步
   */
  reducers: {
    save(state, { payload }) {
      const newState = {
        ...state,
        ...payload,
      };
      try {
        return JSON.parse(JSON.stringify(newState));
      } catch (e) {
        return newState;
      }
    },
  },
};

export default Model;
