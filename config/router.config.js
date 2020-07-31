const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/', redirect: '/user/login' },
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  //无侧边栏的layout
  {
    path: '/nside',
    component: '../layouts/NoSideLayout',
    routes: [
      // //创建商品页面
      // {
      //   path: '/nside/addgoods',
      //   name: '商品',
      //   component: './goods/goodsDetail/goods',
      // },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      { path: '/', redirect: '/user/login' },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            name: '商品',
            path: '/app/home_yuzhi',
            component: './index/index',
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
