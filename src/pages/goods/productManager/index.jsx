import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import SublimeVideo from 'react-sublime-video';
import { Button, Breadcrumb, Radio, Modal, message } from 'antd';
import { pathimgHeader, pathVideoHeader } from '@/utils/utils';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import GoodsDrawer from '@/components/goods/GoodsDrawer';

class productManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productStatusValue: '',
      upType: '',
      upOrDown: false,
      productId: '',
      delGoods: false,
    };
    // this.modifydata = this.modifydata.bind(this);
    this.goodsDrawer = React.createRef();
  }

  recordEdit(record) {
    this.goodsDrawer.current.open(record);
  }

  modifydata = e => {
    const newObj = {};
    newObj.data = e.list;
    newObj.rowTop = e.total;
    return newObj;
  };

  addGoods = () => {
    this.goodsDrawer.current.open();
  };

  onRadioChange = e => {
    const getCode = e.target.value;
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

  // 上架下架
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
    this.setState({ upOrDown: true, productId: e.productId });
  };

  closeAddressModals = () => {
    this.setState({
      upOrDown: false,
    });
  };

  addressModalsOk = async () => {
    const { productId, upType } = this.state;
    const postdata = {
      productId,
      type: upType,
    };
    const res = await requestw({
      type: 'get',
      url: api_goods.upOrDown,
      data: postdata,
    });
    this.setState({
      upOrDown: false,
    });
    if (res.status == 0) {
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

  // 删除 商品
  deleteGoods(e) {
    this.setState({
      delGoods: true,
      delProductId: e.productId,
    });
  }

  // 关闭删除商品弹框
  closedeleteGoodsModals = () => {
    this.setState({
      delGoods: false,
    });
  };

  // 删除商品接口
  deleteGoodsModalsOk = async () => {
    const postdata = {
      productId: this.state.delProductId,
    };
    const res = await requestw({
      url: api_goods.deleteGoods,
      data: postdata,
      type: 'get',
    });
    this.setState({ delGoods: false }); // haode
    if (res.status == 0) {
      message.success('删除商品成功');
      this.Tablew.getData();
    } else {
      message.warning('删除商品失败');
    }
  };

  render() {
    const { goodsStatus, productStatusValue, upOrDown, delGoods } = this.state;

    const pageTiaojian = (
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
          <Breadcrumb.Item>商品管理1</Breadcrumb.Item>
        </Breadcrumb>

        <Tablew
          onRef={c => {
            this.Tablew = c;
          }}
          // 外部添加查询条件
          Externalplacement={pageTiaojian}
          modifydata={this.modifydata}
          // 查询条件
          querystyle={{ float: 'right' }}
          queryItems={[
            {
              title: '商品名称',
              key: 'productName',
              type: '',
              limitDateRange: 28,
            },
          ]}
          postdates={{
            teamId: 2,
          }}
          restype={goodsStatus}
          retType="get"
          // 表格
          queryApi={api_goods.getGoodsList}
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
                            src={
                              v.productPic.split(',')[0].indexOf('http') > -1
                                ? v.productPic.split(',')[0]
                                : pathVideoHeader + v.productPic.split(',')[0]
                            }
                          />
                        ) : (
                          <img
                            style={{ width: '80px', height: '80px', marginRight: '10px' }}
                            src={
                              v.productPic.split(',')[0].indexOf('http') > -1
                                ? v.productPic.split(',')[0]
                                : pathimgHeader + v.productPic.split(',')[0]
                            }
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
            {
              title: '商品类型',
              key: 'type',
              render: type => {
                return <>{type == 'PRE_SALE' ? <span>认筹商品</span> : <span>普通商品</span>}</>;
              },
            },
            { title: '所属分类', key: 'typeName' },
            { title: '销量', key: 'productTotalSale' },
            { title: '库存', key: 'stockNumber' },
            {
              title: '上架时间',
              key: 'upperTime',
              render: upperTime => {
                const time = moment(upperTime).format();
                const d = new Date(time);
                const batchTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
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
                    style={{ marginRight: '5px' }}
                    onClick={() => {
                      this.recordEdit(record);
                    }}
                  >
                    编辑
                  </a>
                  {record.productStatus == 1 ? (
                    <a
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
          title="退单"
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
