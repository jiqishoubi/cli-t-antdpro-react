import { randomStrKey } from '@/utils/utils';

export const defaultItem = () => ({
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
    // {
    //   "productPic": "36b77218-4e95-4ce0-963c-6195d301ce51.jpg,c25574e7-a532-4c57-837a-6548f9e69032.jpg,edd4a12a-5d41-497f-b173-b0d861a45967.jpg,ec9a57de-881a-4be0-be76-a485d8b44198.jpg",
    //   "productName": "格力（GREE）3匹 辽之韵变频3级能效 立式冷暖家用分体空调",
    //   "price": 688000,
    //   "productTotalSale": 0
    // }
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
});
