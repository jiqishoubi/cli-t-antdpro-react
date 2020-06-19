const api = {
  getGoodsList: '/skuProduct/getProduct',
  upOrDown: '/skuProduct/upperOrDownProduct',
  deleteGoods: '/skuProduct/deleteProduct',

  getGoodsTypeApi: '/web/product/type/query', //获取商品分类
  getGoodstypeAll: '/web/product/type/queryPage',
  upload: 'file/upload', //上传图片文件
  createGoodsProduct: '/web/product/type/create', //创建一级分类
  updateGoodsProduct: '/web/product/type/update',
  deleteGoodsType: '/web/product/type/delete',
  /////////////////二级分类
  getTwoQueryPage: '/web/product/subType/queryPage',
  twoTypeCreate: '/web/product/subType/create',
  twoUpdataPorduct: '/web/product/subType/update', //二级更新
  twoDeleteType: '/web/product/subType/delete',

  getProductsApi: '/product/get/products', //获取商品  productId=86&teamId=2
  updateProductApi: '/skuProduct/updateProduct', //编辑商品
  addProductApi: '/skuProduct/addProduct', //新增商品

  //////////////////////////供货商品
  querySupplyGoodsTypeList: '/supplyProduct/querySupplyGoodsTypeList', //获取分类
  createSupplyProduct: '/supplyProduct/createSupplyProduct', //创建商品
  SupplyupdateProduct: '/skuProduct/updateProduct', //修改商品
  queySupplyProduct: '/supplyProduct/queySupplyProduct', //获取供货商品
  supplyProductupperOrDownProduct: '/supplyProduct/upperOrDownProduct', //上下架供货商品
  createRetailProduct: '/retailProduct/createRetailProduct', //上架到本店
  supplyProductDelete: '/supplyProduct/deleteProduct', //删除

  ////分销商品
  queyRetailProduct: '/retailProduct/queyRetailProduct', //获取本店分销商品
  updateRetailProduct: '/retailProduct/updateRetailProduct', //编辑分销商品
  retailProductupperOrDownProduct: '/retailProduct/upperOrDownProduct', //上下架
  retailProductDelete: '/retailProduct/deleteProduct', //删除

  ////////////////////////////商品分润
  goodsLevelCreateOrUpdate: '/web/goodsLevel/createOrUpdate',
};

export default api;
