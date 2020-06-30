import { randomStrKey } from '@/utils/utils';

export const defaultItem = () => ({
  id: randomStrKey(),
  type: 'imgCube',
  //常规
  // item列表
  list: [
    {
      id: randomStrKey(),
      imgUrl: '',
      title: '',
      goType: '',
      goUrl: '',
    },
    {
      id: randomStrKey(),
      imgUrl: '',
      title: '',
      goType: '',
      goUrl: '',
    },
    {
      id: randomStrKey(),
      imgUrl: '',
      title: '',
      goType: '',
      goUrl: '',
    },
    {
      id: randomStrKey(),
      imgUrl: '',
      title: '',
      goType: '',
      goUrl: '',
    },
  ],
  // wrap属性
  marginTopBottom: 0,
  marginLeftRight: 0,
  paddingTopBottom: 0,
  paddingLeftRight: 0,
  backgroundColor: '',
  borderRadius: 0,
  // item属性
  lineNum: 4, //一行有几个
  imgHeight: 50,
  marginTopBottomItem: 0,
  marginLeftRightItem: 0,
  borderRadiusItem: 0,
  haveTitle: false,
  titleFontSize: 12,
});
