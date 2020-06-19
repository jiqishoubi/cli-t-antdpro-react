import { setAuthority } from '@/utils/authority';
import { localDB } from '@/utils/utils';
import { getGoodsTypeAjax } from '@/services/goods';

const Model = {
  namespace: 'goods',

  state: {
    //select
    goodsTypeList: [], //商品分类
  },

  effects: {
    *getGoodsType({ payload }, { call, put }) {
      const teamId = localDB.getItem('teamId');
      const res = yield call(getGoodsTypeAjax, teamId);
      if (res && res.code == 200 && res.data) {
        yield put({
          type: 'save',
          payload: {
            goodsTypeList: res.data,
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
  },
};

export default Model;
