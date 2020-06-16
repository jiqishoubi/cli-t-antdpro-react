import { randomStrKey } from '@/utils/utils';

export const defaultItem = {
  id: randomStrKey(),
  type: 'banner',
  //常规
  list: [
    //img
    {
      id: randomStrKey(),
      imgUrl: '',
      goType: '',
      goUrl: '',
    },
  ],
  //样式
  marginTop: 0,
  marginBottom: 0,
  marginLeftRight: 0,
  height: 145,
  borderRadius: 0,
};
