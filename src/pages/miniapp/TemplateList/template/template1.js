const template = {
  type: 'card',
  itemList: [
    {
      id: '1123',
      type: 'banner',
      //常规
      list: [
        {
          id: '12',
          imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardh3cindex_banner_new1_01.png',
          goType: 'miniapp',
          goUrl: '',
        },
        {
          id: '13',
          imgUrl: 'https://cdn.s.bld365.com/jiesuanbaocardh3cindex_banner_new2_02.png',
          goType: '',
          goUrl: '',
        },
      ],
      //样式
      marginTop: 0,
      marginBottom: 0,
      marginLeftRight: 10,
      height: 145,
      borderRadius: 8,
    },
    {
      id: '1123222',
      type: 'imgCube',
      // wrap属性
      marginTopBottom: 10,
      marginLeftRight: 10,
      paddingTopBottom: 8,
      paddingLeftRight: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      // item属性
      haveTitle: true,
      lineNum: 5, //一行有几个
      marginTopBottomItem: 5,
      marginLeftRightItem: 6,
      borderRadiusItem: 0,
      titleFontSize: 12,
      imgHeight: 40,
      // item列表
      list: [
        {
          id: '12',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/3300505c-b38b-41fe-a3fb-7b91599c0e7e.png',
          title: '家用空调',
          goType: '',
          goUrl: '',
        },
        {
          id: '133',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/d915a263-ceb8-4301-a16c-155453f1ec20.png',
          title: '中央空调',
          goType: '',
          goUrl: '',
        },
        {
          id: '135',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/57536976-0ff3-4811-9bdd-dbf4e63121a1.png',
          title: '冰洗专区',
          goType: '',
          goUrl: '',
        },
        {
          id: '136',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/36e6c410-0cd2-4064-a207-8a4f2b8752fc.png',
          title: '物联手机',
          goType: '',
          goUrl: '',
        },
        {
          id: '137',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/21fadac9-92aa-4c4a-8920-8e16ff7c42a5.png',
          title: '环境电器',
          goType: '',
          goUrl: '',
        },

        {
          id: '126',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/49855df4-d2ef-4eac-8f7a-7966147cdf14.png',
          title: '厨卫大电',
          goType: '',
          goUrl: '',
        },
        {
          id: '1336',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/e6107962-0b28-42b0-9a42-229baca451b7.png',
          title: '生活小电',
          goType: '',
          goUrl: '',
        },
        {
          id: '1356',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/348a87ed-1db6-40ce-92a8-1b5f7bbf2f3d.png',
          title: '其它电器',
          goType: '',
          goUrl: '',
        },
        {
          id: '1366',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/0e918798-71f7-41a9-a945-65dbe5c33d4b.png',
          title: '除湿机',
          goType: '',
          goUrl: '',
        },
        {
          id: '1376',
          imgUrl:
            'https://greecardcrm.bld365.com/static/img/75983ad3-0c32-48fa-9a19-2447ab1d6185.png',
          title: '清洗服务',
          goType: '',
          goUrl: '',
        },
      ],
    },
    {
      id: 's11',
      type: 'productsList',
      //常规
      panelTitle: '热销商品',
      lineNum: 3, //一行几个  1 2 3
      showName: true,
      showPrice: true,
      showSaledNum: false,
      //item列表
      list: [
        {
          id: 's13',
          productId: '',
        },
        {
          id: 's14',
          productId: '',
        },
        {
          id: 's15',
          productId: '',
        },
      ],
      //常规 end
      //面板样式
      marginTop: 0,
      marginBottom: 10,
      marginLeftRight: 10,
      paddingTopBottom: 7,
      paddingLeftRight: 4,
      backgroundColor: '#fff',
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
      imgMarginLeftRight: 5,
      //文字
      textTitle: '',
      textNameLine: 2,
      textNameColor: '#000', //名称颜色
    },
    {
      id: 's1155',
      type: 'productsList',
      //常规
      panelTitle: '推荐商品',
      lineNum: 2, //一行几个  1 2 3
      showName: true,
      showPrice: true,
      showSaledNum: true,
      //item列表
      list: [
        {
          id: 's13',
          productId: '',
        },
        {
          id: 's14',
          productId: '',
        },
        {
          id: 's15',
          productId: '',
        },
        {
          id: 's16',
          productId: '',
        },
      ],
      //常规 end
      //面板样式
      marginTop: 0,
      marginBottom: 10,
      marginLeftRight: 5,
      paddingTopBottom: 7,
      paddingLeftRight: 4,
      backgroundColor: '',
      borderRadius: 8,
      //元素样式
      marginTopItem: 0,
      marginBottomItem: 10,
      marginLeftRightItem: 5,
      paddingTopBottomItem: 0,
      paddingLeftRightItem: 0,
      backgroundColorItem: '#fff',
      borderRadiusItem: 8,
      //图片
      imgWidth_line1: 65, //当一行显示的时候，图片宽度
      imgHeight: 112,
      imgMarginBottom: 0,
      imgMarginLeftRight: 0,
      //文字
      textTitle: '',
      textNameLine: 2,
      textNameColor: '#000', //名称颜色
    },
  ],
};

export default template;
