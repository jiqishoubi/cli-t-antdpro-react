import React from 'react';
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
      // eslint-disable-next-line
      return require('./T-banner/index');
    },
    panel: () => {
      // eslint-disable-next-line
      return require('./T-banner/panel');
    },
    createItem: () => {
      // eslint-disable-next-line
      return require('./T-banner/utils').defaultItem();
    },
  },
  //图片
  img: {
    title: '图片',
    icon: <PictureOutlined />,
    component: () => {
      // eslint-disable-next-line
      return require('./T-img/index');
    },
    panel: () => {
      // eslint-disable-next-line
      return require('./T-img/panel');
    },
    createItem: () => {
      // eslint-disable-next-line
      return require('./T-img/utils').defaultItem();
    },
  },
  //间隔
  height: {
    title: '间隔',
    icon: <ColumnHeightOutlined />,
    component: () => {
      // eslint-disable-next-line
      return require('./T-height/index');
    },
    panel: () => {
      // eslint-disable-next-line
      return require('./T-height/panel');
    },
    createItem: () => {
      // eslint-disable-next-line
      return require('./T-height/utils').defaultItem();
    },
  },
  //文字
  text: {
    title: '文字',
    icon: <FontColorsOutlined />,
    component: () => {
      // eslint-disable-next-line
      return require('./T-text/index');
    },
    panel: () => {
      // eslint-disable-next-line
      return require('./T-text/panel');
    },
    createItem: () => {
      // eslint-disable-next-line
      return require('./T-text/utils').defaultItem();
    },
  },
  //图片魔方
  imgCube: {
    title: '图片魔方',
    icon: <AppstoreOutlined />,
    component: () => {
      // eslint-disable-next-line
      return require('./T-imgCube/index');
    },
    panel: () => {
      // eslint-disable-next-line
      return require('./T-imgCube/panel');
    },
    createItem: () => {
      // eslint-disable-next-line
      return require('./T-imgCube/utils').defaultItem();
    },
  },
  //商品列表
  productsList: {
    title: '商品列表',
    icon: <HddOutlined />,
    component: () => {
      // eslint-disable-next-line
      return require('./T-productsList/index');
    },
    panel: () => {
      // eslint-disable-next-line
      return require('./T-productsList/panel');
    },
    createItem: () => {
      // eslint-disable-next-line
      return require('./T-productsList/utils').defaultItem();
    },
  },
  //enter
  enter: {
    title: '介绍导航',
    icon: <HddOutlined />,
    component: () => {
      // eslint-disable-next-line
      return require('./T-enter/index');
    },
    panel: () => {
      // eslint-disable-next-line
      return require('./T-enter/panel');
    },
    createItem: () => {
      // eslint-disable-next-line
      return require('./T-enter/utils').defaultItem();
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
