import requestw from '@/utils/requestw';
import api_goods from './api/goods';

// 商品分类
export async function getGoodsTypeAjax(teamId) {
  return requestw({
    type: 'post',
    url: api_goods.getGoodsTypeApi,
    data: { teamId },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}

// 获取商品
export async function getProductsAjax(params) {
  return requestw({
    type: 'get',
    url: api_goods.getProductsApi,
    data: params,
  });
}

// 编辑商品
export async function updateProductAjax(params) {
  return requestw({
    url: api_goods.updateProductApi,
    data: params,
  });
}
// 编辑供货商品
export async function updateProductAjaxs(params) {
  return requestw({
    url: api_goods.SupplyupdateProduct,
    data: params,
  });
}
// 新增商品
export async function addProductAjax(params) {
  return requestw({
    url: api_goods.addProductApi,
    data: params,
  });
}
// 新增供货商品
export async function addProductAjaxs(params) {
  return requestw({
    url: api_goods.createSupplyProduct,
    data: params,
  });
}
