import { randomStrKey } from '@/utils/utils';

export const defaultItem = () => ({
  id: randomStrKey(),
  type: 'text',
  //常规
  content: '',
  goType: '',
  goUrl: '',
  //样式
  height: '',
  fontSize: 14,
  color: '#000000',
  fontWeight: 'normal',
  justifyContent: '',
  backgroundColor: '',
});
