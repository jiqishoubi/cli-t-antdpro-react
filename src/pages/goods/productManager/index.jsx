import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import SublimeVideo from 'react-sublime-video';
import { pathimgHeader, pathVideoHeader, localDB } from '@/utils/utils';
import { Button, Breadcrumb, Radio, Modal, message, Input, Switch } from 'antd';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import GoodsDrawer from '@/components/goods/GoodsDrawer';
import styles from './index.less';

class productManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productStatusValue: '',
      upType: '',
      upOrDown: false,
      productId: '',
      delGoods: false,
      teamId: localDB.getItem('teamId'),
      isSwitch: false,
      FenModals: false,
      account: '',
      account1: '',
    };
    // this.modifydata = this.modifydata.bind(this);
    this.goodsDrawer = React.createRef();
  }

  recordEdit(record) {
    this.goodsDrawer.current.open(record);
  }

  modifydata = e => {
    const newObj = {};
    if (e) {
      newObj.data = e.list;
      newObj.rowTop = e.total;
    }
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

  onSwitchChange = () => {
    let { isSwitch } = this.state;
    this.setState({
      isSwitch: !isSwitch,
    });
  };

  setFenModals = async e => {
    let res = await requestw({
      url: '/web/goodsLevel/queryDatas',
      data: {
        goodsId: e.productId,
        teamId: this.state.teamId,
      },
    });
    if (res.code == 200) {
      if (res.data.length != 0) {
        if (res.data[0].useType == 0) {
          this.setState({
            isSwitch: true,
          });
        } else {
          this.setState({
            isSwitch: false,
          });
        }
      }
      if (res.data.length > 1) {
        this.setState({
          account: res.data[0].account,
          account1: res.data[1].account,
          fenList: res.data,
        });
      }
    }

    this.setState({
      FenModals: true,
      fenGoodsId: e.productId,
    });
  };

  closeFenModals = () => {
    this.setState({
      FenModals: false,
      account: '',
      account1: '',
    });
  };

  openFenModalsOk = async () => {
    let { fenGoodsId, teamId, isSwitch, fenList } = this.state;
    let account1 = this.state.account;
    let account2 = this.state.account1;
    let postdata = [
      {
        account: account1,
        goodsId: fenGoodsId,
        level: 1,
        teamId: teamId,
        useType: isSwitch ? 0 : 1,
      },
      {
        account: account2,
        goodsId: fenGoodsId,
        level: 2,
        teamId: teamId,
        useType: isSwitch ? 0 : 1,
      },
    ];
    if (fenList) {
      postdata[0].id = fenList[0].id;
      postdata[1].id = fenList[1].id;
    }

    // account1 = ''
    // account1 = ''
    let res = await requestw({
      url: api_goods.goodsLevelCreateOrUpdate,
      type: 'formdata',
      data: postdata,
    });
    if (res.code == 200) {
      message.success('修改商品分润成功');
      this.setState({
        FenModals: false,
      });
    } else {
      message.warning(res.message);
    }
  };

  keyupEvent = (e, ipt) => {
    e.target.value = e.target.value.replace(/[^\d.]/g, '');
    e.target.value = e.target.value.replace(/\.{2,}/g, '.');
    e.target.value = e.target.value.replace(/^\./g, '0.');
    e.target.value = e.target.value.replace(
      /^\d*\.\d*\./g,
      e.target.value.substring(0, e.target.value.length - 1),
    );
    e.target.value = e.target.value.replace(/^0[^\.]+/g, '0');
    e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
    if (ipt == '1') {
      this.setState({
        account: e.target.value,
      });
    } else {
      this.setState({
        account1: e.target.value,
      });
    }
  };

  render() {
    const { goodsStatus, productStatusValue, upOrDown, delGoods, isSwitch, FenModals } = this.state;

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
          <Breadcrumb.Item>自营商品管理</Breadcrumb.Item>
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
            teamId: this.state.teamId,
            productType: 'SELF_SUPPORT_GOODS',
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
                      style={{ marginRight: '5px' }}
                      onClick={() => {
                        this.deleteGoods(record);
                      }}
                    >
                      删除
                    </a>
                  ) : null}
                  <a
                    data-value="商品分润"
                    onClick={() => {
                      this.setFenModals(record);
                    }}
                  >
                    商品分润
                  </a>
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
        <Modal
          destroyOnClose={true}
          title="分润比例"
          visible={FenModals}
          closable={false}
          onCancel={this.closeFenModals}
          onOk={this.openFenModalsOk}
        >
          <div style={{ width: '100%', height: '150px' }}>
            <div className={styles.Fenleft}>
              <div style={{ width: '100%' }}>
                一级销售：{' '}
                <Input
                  onChange={e => {
                    this.keyupEvent(e, '1');
                  }}
                  value={this.state.account}
                  // defaultValue={fenList && fenList.length > 0 ? fenList[0].account : null}
                  style={{ width: '150px' }}
                />{' '}
                {isSwitch ? <span>元</span> : <span>%</span>}
              </div>
              <div style={{ width: '100%', marginTop: '20px' }}>
                二级销售：{' '}
                <Input
                  onChange={e => {
                    this.keyupEvent(e, '2');
                  }}
                  value={this.state.account1}
                  // defaultValue={fenList && fenList.length > 0 ? fenList[1].account : null}
                  style={{ width: '150px' }}
                />{' '}
                {isSwitch ? <span style={{ marginRight: '3px' }}>元</span> : <span>%</span>}
              </div>
            </div>
            <div className={styles.Fenright}>
              <p style={{ marginBottom: '20px' }}>请选择分润方法</p>
              <span style={{ marginRight: '5px' }}>百分比</span>
              <Switch defaultChecked={isSwitch} onChange={this.onSwitchChange} />
              <span style={{ margingLeft: '5px' }}>金额</span>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(({ miniapp, loading }) => ({
  miniapp,
  loadingGetMiniappInfo: loading.effects['miniapp/getMiniappInfo'],
}))(productManager);
