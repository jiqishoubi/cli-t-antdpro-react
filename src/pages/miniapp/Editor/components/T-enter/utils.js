import { randomStrKey } from '@/utils/utils';

export const defaultItem = {
  id: randomStrKey(),
  type: 'enter',
  //常规
  // item列表
  list: [
    {
      id: randomStrKey(),
      imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardindex_newenter_01_01.png',
      goType: '',
      goUrl: '',
      title: '灵活用工',
      desc: '灵活用工是共享经济下一种新的高效生产组织形式',
    },
    {
      id: randomStrKey(),
      imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardindex_newenter_02_02.png',
      goType: '',
      goUrl: '',
      title: '解决方案',
      desc: '节算宝平台提供企业灵活用工整体系统解决方案',
    },
    {
      id: randomStrKey(),
      imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardindex_newenter_03_03.png',
      goType: '',
      goUrl: '',
      title: '政策依据',
      desc: '国家政策支持，税法依法合规',
    },
    {
      id: randomStrKey(),
      imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardindex_newenter_04_04.png',
      goType: '',
      goUrl: '',
      title: '行业案例',
      desc: '解决方案适用零售和服务型行业大中小企业',
    },
    {
      id: randomStrKey(),
      imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardindex_newenter_05_05.png',
      goType: '',
      goUrl: '',
      title: '关于我们',
      desc: '公司是提供企业行业互联网解决方案的高科技公司',
    },
    {
      id: randomStrKey(),
      imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardindex_newenter_06_06.png',
      goType: '',
      goUrl: '',
      title: '合作流程',
      desc: '企业调研，合同签约，系统对接',
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
  lineNum: 2, //一行有几个
  itemHeight: 200,
  marginTopBottomItem: 0,
  marginLeftRightItem: 0,
  borderRadiusItem: 0,
};
