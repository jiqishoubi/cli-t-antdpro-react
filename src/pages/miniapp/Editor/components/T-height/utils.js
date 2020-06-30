import { randomStrKey } from '@/utils/utils';

export const defaultItem = () => ({
  id: randomStrKey(),
  type: 'height',
  height: 30,
  haveLine: false,
  marginLeftRight: 0,
});
