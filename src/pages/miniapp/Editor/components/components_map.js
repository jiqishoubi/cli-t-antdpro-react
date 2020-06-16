import { randomStrKey } from '@/utils/utils';
import {
  GoldOutlined,
  PictureOutlined,
  ColumnHeightOutlined,
  FontColorsOutlined,
  AppstoreOutlined,
  HddOutlined,
} from '@ant-design/icons';

//组件列表
export const com_map = {
  //轮播图
  banner: {
    title: '轮播图',
    icon: <GoldOutlined />,
    component: () => {
      return require('./T-banner/index');
    },
    panel: () => {
      return require('./T-banner/panel');
    },
    createItem: () => {
      return require('./T-banner/utils').defaultItem;
    },
  },
  //图片
  img: {
    title: '图片',
    icon: <PictureOutlined />,
    component: () => {
      return require('./T-img/index');
    },
    panel: () => {
      return require('./T-img/panel');
    },
    createItem: () => {
      return require('./T-img/utils').defaultItem;
    },
  },
  //间隔
  height: {
    title: '间隔',
    icon: <ColumnHeightOutlined />,
    component: () => {
      return require('./T-height/index');
    },
    panel: () => {
      return require('./T-height/panel');
    },
    createItem: () => {
      return require('./T-height/utils').defaultItem;
    },
  },
  //文字
  text: {
    title: '文字',
    icon: <FontColorsOutlined />,
    component: () => {
      return require('./T-text/index');
    },
    panel: () => {
      return require('./T-text/panel');
    },
    createItem: () => {
      return require('./T-text/utils').defaultItem;
    },
  },
  //图片魔方
  imgCube: {
    title: '图片魔方',
    icon: <AppstoreOutlined />,
    component: () => {
      return require('./T-imgCube/index');
    },
    panel: () => {
      return require('./T-imgCube/panel');
    },
    createItem: () => {
      return require('./T-imgCube/utils').defaultItem;
    },
  },
  //商品列表
  productsList: {
    title: '商品列表',
    icon: <HddOutlined />,
    component: () => {
      return require('./T-productsList/index');
    },
    panel: () => {
      return require('./T-productsList/panel');
    },
    createItem: () => {
      return require('./T-productsList/utils').defaultItem;
    },
  },
  //enter
  enter: {
    title: '介绍导航',
    icon: <HddOutlined />,
    component: () => {
      return require('./T-enter/index');
    },
    panel: () => {
      return require('./T-enter/panel');
    },
    createItem: () => {
      return require('./T-enter/utils').defaultItem;
    },
  },
};

export const getComponent = item => {
  let key = item.type;
  return com_map[key].component().default;
};

export const getComponentPanel = item => {
  if (item) {
    let key = item.type;
    return com_map[key].panel().default;
  }
  return null;
};
