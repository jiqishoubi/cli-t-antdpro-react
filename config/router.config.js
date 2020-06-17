const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  //编辑器
  {
    path: '/diy/editor',
    name: '编辑器',
    icon: 'smile',
    component: './miniapp/Editor',
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/miniapp/auth',
            name: '授权',
            icon: 'smile',
            component: './miniapp/Auth',
          },
          {
            path: '/miniapp/templatelist',
            name: '模板列表',
            icon: 'smile',
            component: './miniapp/TemplateList',
          },
          ////自营商品  zysp
          {
            path: '/productManager',
            name: '自营商品管理',
            icon: 'smile',
            component: './goods/productManager',
          },

          {
            path: '/typeManager',
            name: '一级分类',
            icon: 'smile',
            component: './goods/typeManager',
          },
          {
            path: '/twoTypeManager',
            name: '一级分类',
            icon: 'smile',
            component: './goods/twoTypeManager',
          },

          //////供货商品      ghsp
          {
            path: '/Supplygoods',
            name: '供货商品管理',
            icon: 'smile',
            component: './Supplygoods/Supplygoods',
          },
          {
            path: '/SupplygoodsDetail',
            name: '供货商品管理',
            icon: 'smile',
            component: './Supplygoods/SupplygoodsDetail',
          },
          /////////分销市场 fxsc
          {
            path: '/DistributionMarket',
            name: '分销市场',
            icon: 'smile',
            component: './goods/DistributionMarket',
          },
          { component: './404' },
        ],
      },
      { component: './404' },
    ],
  },
  { component: './404' },
];

export default routes;
