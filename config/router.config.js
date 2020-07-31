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
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      { path: '/', redirect: '/user/login' },
      //NoSideLayout 无侧边栏的layout
      {
        path: '/app',
        component: '../layouts/NoSideLayout',
        routes: [
          {
            name: '首页',
            path: '/app/home_yuzhi',
            component: './index/index',
          },
          { component: './404' },
        ],
      },
      //BasicLayout
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            name: '订单管理',
            path: '/order/installorderlist2',
            component: './order/index',
          },
          {
            name: '订单分润',
            path: '/order/profitrecord',
            component: './order/fenrun',
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
