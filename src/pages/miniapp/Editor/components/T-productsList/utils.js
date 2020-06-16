import { randomStrKey } from '@/utils/utils';

export const defaultItem = {
  id: randomStrKey(),
  type: 'productsList',
  //常规
  panelTitle: '',
  lineNum: 2, //一行几个  1 2 3
  showName: true,
  showPrice: true,
  showSaledNum: true,
  //item列表
  list: [
    {
      id: randomStrKey(),
      productId: '',
    },
    {
      id: randomStrKey(),
      productId: '',
    },
    {
      id: randomStrKey(),
      productId: '',
    },
    {
      id: randomStrKey(),
      productId: '',
    },
  ],
  //常规 end
  //面板样式
  marginTop: 0,
  marginBottom: 0,
  marginLeftRight: 0,
  paddingTopBottom: 0,
  paddingLeftRight: 0,
  backgroundColor: '',
  borderRadius: 8,
  //元素样式
  marginTopItem: 0,
  marginBottomItem: 0,
  marginLeftRightItem: 0,
  paddingTopBottomItem: 0,
  paddingLeftRightItem: 0,
  backgroundColorItem: '',
  //图片
  imgWidth_line1: 65, //当一行显示的时候，图片宽度
  imgHeight: 70,
  imgMarginBottom: 0,
  imgMarginLeftRight: 0,
  //文字
  textTitle: '',
  textNameLine: 2,
  textNameColor: '#000', //名称颜色
};
