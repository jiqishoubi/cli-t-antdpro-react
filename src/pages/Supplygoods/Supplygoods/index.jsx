import React from 'react';
import { connect } from 'dva';
import { Button, Card, Row, Col, Breadcrumb, Radio, Modal, message } from 'antd';
import { getUrlParam } from '@/utils/utils';
import styles from './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import GoodsDrawer from '@/components/SupplyGoods/GoodsDrawer';
import SublimeVideo from 'react-sublime-video';

// import EditModal from '@/components/EditModal';
import { pathimgHeader, pathVideoHeader, localDB } from '@/utils/utils';
import moment from 'moment';
// import router from 'umi/router';
class productManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageNo: 1,
      tableDate: [],
      productStatusValue: '',
      upType: '',
      upOrDown: false,
      productId: '',
      delGoods: false,
      productStatus: '',
      supplyGoodsList: [],
      teamId: localDB.getItem('teamId'),
    };
    this.goodsDrawer = React.createRef();
    // this.modifydata = this.modifydata.bind(this);
  }
  componentDidMount() {
    // this.getData();
    this.getgoodstypeList();
  }
  getgoodstypeList = async () => {
    let res = await requestw({
      url: api_goods.querySupplyGoodsTypeList,
    });
    if (res.code == 200) {
      this.setState({
        supplyGoodsList: res.data.data,
      });
    }
  };
  modifydata(e) {
    let newObj = {};
    newObj.data = e.data.list;
    newObj.rowTop = e.total;
    return newObj;
  }
  recordEdit(record) {
    // history.push('/goodsAdd?id=' + record.productId);
    this.goodsDrawer.current.open(record);
  }
  onRadioChange = e => {
    let getCode = e.target.value;
    this.setState(
      {
        goodsStatus: getCode,
      },
      () => {
        // this.getData();
        this.Tablew.getData();
      },
    );
  };
  //上架下架
  upOrDownMethod = e => {
    if (e.productStatus == 0) {
      this.setState({
        productStatusValue: '上架',
        upType: '1',
      });
    } else {
      this.setState({
        productStatusValue: '下架',
        upType: '0',
      });
    }
    this.setState({ upOrDown: true, productStatus: e.productStatus, productId: e.productId });
  };
  closeAddressModals = () => {
    this.setState({
      upOrDown: false,
    });
  };
  addressModalsOk = async () => {
    const { productId, upType } = this.state;
    let postdata = {
      productId,
      type: upType,
    };
    let res = await requestw({
      type: 'get',
      url: api_goods.supplyProductupperOrDownProduct,
      data: postdata,
    });
    this.setState({
      upOrDown: false,
    });
    if (res.data.status == 0) {
      if (upType == '1') {
        message.success('上架成功');
        this.Tablew.getData();
      } else {
        message.success('下架成功');
        this.Tablew.getData();
      }
    } else {
      message.warning('操作商品失败');
    }
  };
  ///删除 商品
  deleteGoods(e) {
    this.setState({
      delGoods: true,
      delProductId: e.productId,
    });
  }
  //关闭删除商品弹框
  closedeleteGoodsModals = () => {
    this.setState({
      delGoods: false,
    });
  };
  //删除商品接口
  deleteGoodsModalsOk = async () => {
    let postdata = {
      productId: this.state.delProductId,
    };
    let res = await requestw({
      url: api_goods.supplyProductDelete,
      data: postdata,
      type: 'get',
    });
    this.setState({ delGoods: false });
    if (res.data.status == 0) {
      message.success('删除商品成功');
      this.Tablew.getData();
    } else {
      message.warning('删除商品失败');
    }
  };
  addGoods = () => {
    this.goodsDrawer.current.open();
  };
  render() {
    const {
      tableDate,
      goodsStatus,
      productStatusValue,
      upType,
      upOrDown,
      productId,
      productStatus,
      delGoods,
      supplyGoodsList,
    } = this.state;

    let pageTiaojian = (
      <>
        <Radio.Group onChange={this.onRadioChange} defaultValue="a">
          <Radio.Button value="3">全部</Radio.Button>
          <Radio.Button value="1">已上架</Radio.Button>
          <Radio.Button value="0">未上架</Radio.Button>
          <Radio.Button value="2">已售馨</Radio.Button>
        </Radio.Group>
        <Button style={{ marginLeft: '630px' }} onClick={this.addGoods}>
          添加商品
        </Button>
      </>
    );
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>供货商品管理</Breadcrumb.Item>
        </Breadcrumb>

        <Tablew
          onRef={c => (this.Tablew = c)}
          //外部添加查询条件
          Externalplacement={pageTiaojian}
          modifydata={this.modifydata}
          //查询条件
          querystyle={{ float: 'right' }}
          routerUrl="/supplyGoodsDetail"
          queryItems={[
            {
              title: '商品名称',
              key: 'productName',
              type: '',
              limitDateRange: 28,
            },
          ]}
          postdates={{
            teamId: this.state.teamId,
            queryType: 'SUPPLY',
          }}
          restype={goodsStatus}
          retType="post"
          //表格
          queryApi={api_goods.queySupplyProduct}
          columns={[
            {
              title: '商品图片',
              key: '',
              alent: 'left',
              width: 300,
              render: v => {
                return (
                  <>
                    <dl>
                      <dt
                        style={{
                          float: 'left',
                          width: '80px',
                          height: '80px',
                          marginRight: '10px',
                          overflow: 'hidden',
                        }}
                      >
                        {' '}
                        {v.productPic.split(',')[0].split('.')[1] == 'mp4' ? (
                          <SublimeVideo
                            loop
                            style={{ width: '80px', height: '80px' }}
                            src={pathVideoHeader + v.productPic.split(',')[0]}
                          />
                        ) : (
                          <img
                            style={{ width: '80px', height: '80px', marginRight: '10px' }}
                            src={pathimgHeader + v.productPic.split(',')[0]}
                          />
                        )}
                      </dt>
                      <dd style={{ width: '100%', textAlign: 'left' }}>
                        {' '}
                        <div>{v.productName}</div>
                      </dd>
                      <dd style={{ width: '100%' }}>
                        {' '}
                        <div style={{ color: '#f00', paddingLeft: '10px', textAlign: 'left' }}>
                          {(v.price / 100).toFixed(2) + '元'}
                        </div>
                      </dd>
                    </dl>
                  </>
                );
              },
            },
            // {
            //   title: '商品类型',
            //   key: 'type',
            //   render: (type) => {
            //     return <>{type == 'PRE_SALE' ? <span>认筹商品</span> : <span>普通商品</span>}</>;
            //   },
            // },
            { title: '所属分类', key: 'typeName' },
            { title: '销量', key: 'productTotalSale' },
            { title: '库存', key: 'stockNumber' },
            {
              title: '上架时间',
              key: 'upperTime',
              render: upperTime => {
                let time = moment(upperTime).format();
                let d = new Date(time);
                let batchTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                return <span>{batchTime}</span>;
              },
            },
            {
              title: '状态',
              key: 'productStatus',
              render: productStatus => {
                return <>{productStatus == '0' ? <span>下架</span> : <span>上架</span>}</>;
              },
            },
            // { title: '完成时间', key: 'FINISH_DATE_STR' },
            {
              title: '操作',
              key: '',
              // type: 'caozuo',
              render: record => (
                <>
                  <a
                    data-value="编辑"
                    style={{ marginRight: '5px' }}
                    onClick={() => {
                      this.recordEdit(record);
                    }}
                  >
                    编辑
                  </a>
                  {record.productStatus == 1 ? (
                    <a
                      data-value="下架"
                      style={{ marginRight: '5px' }}
                      onClick={() => {
                        this.upOrDownMethod(record);
                      }}
                    >
                      下架
                    </a>
                  ) : null}
                  {record.productStatus == 0 ? (
                    <a
                      data-value="上架"
                      style={{ marginRight: '5px' }}
                      onClick={() => {
                        this.upOrDownMethod(record);
                      }}
                    >
                      上架
                    </a>
                  ) : null}
                  {record.productStatus == 0 ? (
                    <a
                      data-value="删除"
                      onClick={() => {
                        this.deleteGoods(record);
                      }}
                    >
                      删除
                    </a>
                  ) : null}
                </>
              ),
            },
          ]}
        />
        <Modal
          title="商品操作"
          visible={upOrDown}
          closable={false}
          onCancel={this.closeAddressModals}
          onOk={this.addressModalsOk}
        >
          <div>是否{productStatusValue}该商品？</div>
        </Modal>
        <Modal
          title="删除商品"
          visible={delGoods}
          closable={false}
          onCancel={this.closedeleteGoodsModals}
          onOk={this.deleteGoodsModalsOk}
        >
          <div>确定要删除该商品么？</div>
        </Modal>
        <GoodsDrawer
          onRef={e => {
            this.goodsDrawer.current = e;
          }}
          supplyGoodsList={supplyGoodsList}
          callback={() => {
            this.Tablew.getData();
          }}
        />
      </div>
    );
  }
}

export default connect(({ miniapp, loading }) => ({
  miniapp,
  loadingGetMiniappInfo: loading.effects['miniapp/getMiniappInfo'],
}))(productManager);
