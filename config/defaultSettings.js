import defaultTheme from './theme/defaultTheme';

export default {
  navTheme: 'dark', //'light' | 'dark';
  layout: 'mixmenu', //'sidemenu' | 'topmenu' | 'mixmenu';
  contentWidth: 'Fluid', //'Fluid' | 'Fixed';
  fixedHeader: true,
  autoHideHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: { locale: false },
  title: 'BLD',

  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: '',

  /**
   * 自定义
   */
  isTabs: false, //是否多tab
  mixNeedJump: true, //如果是mix模式，点击mixMenu需要跳转吗？
};
