import { randomStrKey } from '@/utils/utils';

export const defaultItem = () => ({
  id: randomStrKey(),
  type: 'img',
  //常规
  imgUrl: '',
  goType: '',
  goUrl: '',
  //样式
  height: 0,
  marginTop: 0,
  marginBottom: 0,
  marginLeftRight: 0,
  borderRadius: 0,
});
