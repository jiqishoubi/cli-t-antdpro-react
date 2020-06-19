import React from 'react';
import { connect } from 'dva';
import { Button, Card, Row, Col, Breadcrumb, Radio, Modal, message } from 'antd';
import { getUrlParam } from '@/utils/utils';
import styles from './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import SublimeVideo from 'react-sublime-video';
import ImageCarousel from '@/components/ImageCarousel';
// import EditModal from '@/components/EditModal';
import { pathimgHeader, pathVideoHeader, localDB } from '@/utils/utils';
import moment from 'moment';
import GoodsDrawer from '@/components/DistributionMarket/GoodsDrawer';
import router from 'umi/router';

import { getMarketGoodsAjax } from '@/services/goods';
function sum(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
// import router from 'umi/router';
class SupplygoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: {},
      currentIndex: '0',
      currentIndex1: '0',
      currentIndex2: '0',
      currentIndex3: '0',
      SupplyPriceList: [],
      PriceList: [],
      Allstock: null,
      namedata: [],
      // productExist: getUrlParam('productExist'),
      teamId: localDB.getItem('teamId'),
      isfenxiao: '',
      upOrDown: false,
      productStatus: '',
      productId: '',
      delGoods: false,
      delProductId: '',
    };
    // this.modifydata = this.modifydata.bind(this);
    this.goodsDrawer = React.createRef();
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    let productId = getUrlParam('productId');
    let productType = getUrlParam('productType');
    let teamId = localDB.getItem('teamId');

    // getMarketGoodsAjax
    let postData = {
      productId,
      teamId: teamId,
      productType,
    };
    let res = await getMarketGoodsAjax(postData);
    let SupplyPriceList = [];
    let PriceList = [];
    let num = [];
    if (res.status == 0) {
      // if (res.data[0].specsType == 0) {

      // }
      res.data[0].retailProductSkuPropertyList.map((item, ind) => {
        SupplyPriceList.push(item.supplyPrice);
        PriceList.push(item.price);
        num.push(item.stock);
      });
      let MinSupplyPrice;
      let MaxSupplyPrice;
      if (SupplyPriceList.length > 1) {
        MinSupplyPrice = Math.min.apply(null, SupplyPriceList);
        MaxSupplyPrice = Math.max.apply(null, SupplyPriceList);
      }
      let MinPrice;
      let MaxPrice;
      if (PriceList.length > 1) {
        MinPrice = Math.min.apply(null, PriceList);
        MaxPrice = Math.max.apply(null, PriceList);
      }
      let Allstock = sum(num);

      let imglist = res.data[0].productPic.split(',');

      // productPic
      this.setState({
        MinPrice,
        MaxPrice,
        MinSupplyPrice,
        MaxSupplyPrice,
        Allstock,
        // productExist,
        productDetail: JSON.parse(res.data[0].productDetail),
        detailData: res.data[0],
        imglist,
      });
    }
  };
  setGoodDetail = record => {
    console.log('编辑');
    this.setState(
      {
        isfenxiao: 'fenxiao',
      },
      () => {
        this.goodsDrawer.current.open(record);
      },
    );
  };
  setGoodState = e => {
    console.log('上架下架');
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
      url: api_goods.retailProductupperOrDownProduct,
      data: postdata,
    });
    console.log(res);
    this.setState({
      upOrDown: false,
    });
    if (res.data.status == 0) {
      if (upType == '1') {
        message.success('上架成功');
        // this.Tablew.getData();
        router.push('/DistributionGoods');
      } else {
        message.success('下架成功');
        // this.Tablew.getData();
        router.push('/DistributionGoods');
      }
    } else {
      message.warning(res.data.message);
    }
  };
  deleteGood = e => {
    console.log('删除');
    this.setState({
      delGoods: true,
      delProductId: e.productId,
    });
  };
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
      url: api_goods.retailProductDelete,
      data: postdata,
      type: 'get',
    });
    this.setState({ delGoods: false });
    console.log(res);
    if (res.data.status == 0) {
      message.success('删除商品成功');
      router.push('/DistributionGoods');
      // this.Tablew.getData();
    } else {
      message.warning('删除商品失败');
    }
  };
  skuClick = (titlename, name, e) => {
    let { detailData, monetydata, SupplyPriceList, PriceList, namedata } = this.state;
    let namelist = namedata;
    namelist[0] = name;
    let SupplyPrice = SupplyPriceList;
    let Price = PriceList;
    detailData.retailProductSkuPropertyList.map((item, ind) => {
      let obj = {};
      if (JSON.parse(item.skuJson)[titlename] == name) {
        SupplyPriceList[0] = item.supplyPrice;
        // moneryList.Price.push(item.price)
        PriceList[0] = item.price;
      }
    });
    let MinSupplyPrice;
    let MaxSupplyPrice;
    if (SupplyPriceList.length > 1) {
      MinSupplyPrice = Math.min.apply(null, SupplyPriceList);
      MaxSupplyPrice = Math.max.apply(null, SupplyPriceList);
    }
    let MinPrice;
    let MaxPrice;
    if (PriceList.length > 1) {
      MinPrice = Math.min.apply(null, PriceList);
      MaxPrice = Math.max.apply(null, PriceList);
    }
    let namestr = '';
    if (SupplyPriceList.length == detailData.skuPropertys.length) {
      namedata.map(item => {
        namestr += item + '、';
      });

      detailData.retailProductSkuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          // console.log(item.supplyPrice, item.price, '相同');
          this.setState({
            AllsupplyPrice: item.supplyPrice,
            Allprice: item.price,
            itemstock: item.stock,
          });
        }
      });
    }

    this.setState({
      namedata,
      MinSupplyPrice,
      MaxSupplyPrice,
      MinPrice,
      MaxPrice,
      SupplyPriceList,
      PriceList,
      currentIndex: parseInt(e.currentTarget.getAttribute('index'), 10),
    });
  };
  skuClick1 = (titlename, name, e) => {
    let { detailData, monetydata, SupplyPriceList, PriceList, namedata } = this.state;
    let namelist = namedata;
    namelist[1] = name;
    let SupplyPrice = SupplyPriceList;
    let Price = PriceList;
    detailData.retailProductSkuPropertyList.map((item, ind) => {
      let obj = {};
      if (JSON.parse(item.skuJson)[titlename] == name) {
        SupplyPriceList[1] = item.supplyPrice;
        // moneryList.Price.push(item.price)
        PriceList[1] = item.price;
      }
    });

    let MinSupplyPrice;
    let MaxSupplyPrice;
    if (SupplyPriceList.length > 1) {
      MinSupplyPrice = Math.min.apply(null, SupplyPriceList);
      MaxSupplyPrice = Math.max.apply(null, SupplyPriceList);
    }
    let MinPrice;
    let MaxPrice;
    if (PriceList.length > 1) {
      MinPrice = Math.min.apply(null, PriceList);
      MaxPrice = Math.max.apply(null, PriceList);
    }
    let namestr = '';
    if (SupplyPriceList.length == detailData.skuPropertys.length) {
      namedata.map(item => {
        namestr += item + '、';
      });

      detailData.retailProductSkuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          // console.log(item.supplyPrice, item.price, '相同');
          this.setState({
            AllsupplyPrice: item.supplyPrice,
            Allprice: item.price,
            itemstock: item.stock,
          });
        }
      });
    }

    this.setState({
      namedata,
      MinSupplyPrice,
      MaxSupplyPrice,
      MinPrice,
      MaxPrice,
      SupplyPriceList,
      PriceList,
      currentIndex1: parseInt(e.currentTarget.getAttribute('index'), 10),
    });
  };
  skuClick2 = (titlename, name, e) => {
    let { detailData, monetydata, SupplyPriceList, PriceList, namedata } = this.state;

    let namelist = namedata;
    namelist[2] = name;
    let SupplyPrice = SupplyPriceList;
    let Price = PriceList;
    detailData.retailProductSkuPropertyList.map((item, ind) => {
      // console.log(JSON.parse(item.skuJson)[titlename]);
      let obj = {};
      if (JSON.parse(item.skuJson)[titlename] == name) {
        SupplyPriceList[2] = item.supplyPrice;
        // moneryList.Price.push(item.price)
        PriceList[2] = item.price;
      }
    });
    let MinSupplyPrice;
    let MaxSupplyPrice;
    if (SupplyPriceList.length > 1) {
      MinSupplyPrice = Math.min.apply(null, SupplyPriceList);
      MaxSupplyPrice = Math.max.apply(null, SupplyPriceList);
    }
    let MinPrice;
    let MaxPrice;
    if (PriceList.length > 1) {
      MinPrice = Math.min.apply(null, PriceList);
      MaxPrice = Math.max.apply(null, PriceList);
    }
    // console.log(SupplyPriceList, PriceList);
    let namestr = '';
    if (SupplyPriceList.length == detailData.skuPropertys.length) {
      namedata.map(item => {
        namestr += item + '、';
      });

      detailData.retailProductSkuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          // console.log(item.supplyPrice, item.price, '相同');
          this.setState({
            AllsupplyPrice: item.supplyPrice,
            Allprice: item.price,
            itemstock: item.stock,
          });
        }
      });
    }
    this.setState({
      namedata,
      MinSupplyPrice,
      MaxSupplyPrice,
      MinPrice,
      MaxPrice,
      SupplyPriceList,
      PriceList,
      currentIndex2: parseInt(e.currentTarget.getAttribute('index'), 10),
    });
  };
  skuClick3 = (titlename, name, e) => {
    let { detailData, monetydata, SupplyPriceList, PriceList, namedata } = this.state;
    let namelist = namedata;
    namelist[3] = name;
    let SupplyPrice = SupplyPriceList;
    let Price = PriceList;
    detailData.retailProductSkuPropertyList.map((item, ind) => {
      // console.log(JSON.parse(item.skuJson)[titlename]);
      let obj = {};
      if (JSON.parse(item.skuJson)[titlename] == name) {
        SupplyPriceList[3] = item.supplyPrice;
        // moneryList.Price.push(item.price)
        PriceList[3] = item.price;
      }
    });
    let MinSupplyPrice;
    let MaxSupplyPrice;
    if (SupplyPriceList.length > 1) {
      MinSupplyPrice = Math.min.apply(null, SupplyPriceList);
      MaxSupplyPrice = Math.max.apply(null, SupplyPriceList);
    }
    let MinPrice;
    let MaxPrice;
    if (PriceList.length > 1) {
      MinPrice = Math.min.apply(null, PriceList);
      MaxPrice = Math.max.apply(null, PriceList);
    }
    let namestr = '';
    if (SupplyPriceList.length == detailData.skuPropertys.length) {
      namedata.map(item => {
        namestr += item + '、';
      });

      // console.log(namestr.substr(0, namestr.length - 1));
      detailData.retailProductSkuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          // console.log(item.supplyPrice, item.price, '相同');
          this.setState({
            AllsupplyPrice: item.supplyPrice,
            Allprice: item.price,
            itemstock: item.stock,
          });
        }
      });
    }
    this.setState({
      namedata,
      MinSupplyPrice,
      MaxSupplyPrice,
      MinPrice,
      MaxPrice,
      SupplyPriceList,
      PriceList,
      currentIndex3: parseInt(e.currentTarget.getAttribute('index'), 10),
    });
  };
  goMyshop = () => {
    // console.log('上架到本店');
    let { detailData } = this.state;
    this.goodsDrawer.current.open(detailData);
  };
  render() {
    const {
      detailData,
      currentIndex,
      currentIndex1,
      currentIndex2,
      currentIndex3,
      SupplyPriceList,
      PriceList,
      MinSupplyPrice,
      MaxSupplyPrice,
      MinPrice,
      MaxPrice,
      Allstock,
      AllsupplyPrice,
      Allprice,
      itemstock,
      // productExist,
      productDetail,
      teamId,
      imglist,
      upOrDown,
      productStatus,
      productId,
      productStatusValue,
      delGoods,
    } = this.state;
    // console.log('render重新执行');
    // console.log(productExist);
    // console.log(productExist === 'ture');
    console.log(Allprice);

    return (
      <div style={{ height: '1000px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>分销市场商品详情</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ width: '100%', height: '360px' }}>
          <ImageCarousel imglist={imglist} />

          <p
            style={{
              paddingLeft: '40px',
              width: '500px',
              marginTop: '20px',
              float: 'left',
              fontSize: '22px',
              fontWeight: '800',
              marginBottom: '40px',
            }}
          >
            {detailData.productName}
          </p>
          <div
            style={{
              float: 'left',
              marginLeft: '40px',
              width: '500px',
              height: '270px',
            }}
          >
            {detailData.specsType == 1 ? (
              <>
                <p>
                  {AllsupplyPrice ? (
                    <span style={{ fontSize: '16px' }}>
                      供货价:<b>{AllsupplyPrice}￥</b>
                    </span>
                  ) : (
                    <>
                      <span style={{ fontSize: '16px' }}>
                        供货价:
                        <b>
                          {MinSupplyPrice}￥-{MaxSupplyPrice}￥
                        </b>
                      </span>
                    </>
                  )}

                  {itemstock ? (
                    <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                      库存:<b>{itemstock}</b>
                    </span>
                  ) : (
                    <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                      库存:<b>{Allstock}</b>
                    </span>
                  )}

                  <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                    运费:<b>{detailData.transportAmount}</b>
                  </span>
                </p>
                <p>
                  {/* <span style={{ fontSize: '16px' }}>
                建议售价:<b>16￥</b>
              </span> */}
                  {Allprice ? (
                    <span style={{ fontSize: '16px' }}>
                      建议售价:<b>{Allprice}￥</b>
                    </span>
                  ) : (
                    <>
                      {PriceList.length > 1 ? (
                        <span style={{ fontSize: '16px' }}>
                          建议售价:
                          <b>
                            {(MinPrice * 0.01).toFixed(0)}￥-{(MaxPrice * 0.01).toFixed(0)}￥
                          </b>
                        </span>
                      ) : (
                        <span style={{ fontSize: '16px' }}>
                          建议售价:<b>0￥</b>
                        </span>
                      )}
                    </>
                  )}
                </p>
              </>
            ) : (
              <>
                <p>
                  <span style={{ fontSize: '16px' }}>
                    供货价:
                    <b>
                      {detailData.retailProductSkuPropertyList
                        ? detailData.retailProductSkuPropertyList[0].supplyPrice
                        : '0'}
                      ￥
                    </b>
                  </span>
                  <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                    库存:
                    <b>
                      {detailData.retailProductSkuPropertyList
                        ? detailData.retailProductSkuPropertyList[0].stock
                        : 0}
                    </b>
                  </span>
                  <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                    运费:<b>{detailData.transportAmount}</b>
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: '16px' }}>
                    建议售价:
                    <b>
                      {detailData.retailProductSkuPropertyList
                        ? (detailData.retailProductSkuPropertyList[0].price * 0.01).toFixed(0)
                        : '0'}
                      ￥
                    </b>
                  </span>
                </p>
              </>
            )}

            {/* 待定部位 */}

            <div>
              {detailData.specsType == 1 ? (
                <>
                  {// detailData.skuPropertys[0].map((item, ind) => {
                  //   return (
                  //     <p key={ind}><span>{item.skuName}</span>
                  //       {
                  //         JSON.parse(item.skuValue).map((items, inds) => {
                  //           return (
                  //             <>
                  //               <button className={currentIndex === inds ? styles.actvie : ''}
                  //                 key={inds} index={inds} onClick={(e) => { this.skuClick(items.name, e) }}>{items.name}</button>
                  //             </>
                  //           )
                  //         })
                  //       }
                  //     </p>
                  //   )
                  // })
                  detailData.skuPropertys[0] ? (
                    <p style={{ marginBottom: '5px' }}>
                      <span>{detailData.skuPropertys[0].skuName}</span>
                      {JSON.parse(detailData.skuPropertys[0].skuValue).map((items, inds) => {
                        return (
                          <>
                            <button
                              style={{ border: '1px solid #ccc', margin: '0 5px' }}
                              className={currentIndex === inds ? styles.actvie : ''}
                              key={inds}
                              index={inds}
                              onClick={e => {
                                this.skuClick(detailData.skuPropertys[0].skuName, items.name, e);
                              }}
                            >
                              {items.name}
                            </button>
                          </>
                        );
                      })}
                    </p>
                  ) : null}
                  {detailData.skuPropertys[1] ? (
                    <p style={{ marginBottom: '5px' }}>
                      <span>{detailData.skuPropertys[1].skuName}</span>
                      {JSON.parse(detailData.skuPropertys[1].skuValue).map((items, inds) => {
                        return (
                          <>
                            <button
                              style={{ border: '1px solid #ccc', margin: '0 5px' }}
                              className={currentIndex1 === inds + 100 ? styles.actvie : ''}
                              key={inds + 100}
                              index={inds + 100}
                              onClick={e => {
                                this.skuClick1(detailData.skuPropertys[1].skuName, items.name, e);
                              }}
                            >
                              {items.name}
                            </button>
                          </>
                        );
                      })}
                    </p>
                  ) : null}
                  {detailData.skuPropertys[2] ? (
                    <p style={{ marginBottom: '5px' }}>
                      <span>{detailData.skuPropertys[2].skuName}</span>
                      {JSON.parse(detailData.skuPropertys[2].skuValue).map((items, inds) => {
                        return (
                          <>
                            <button
                              style={{ border: '1px solid #ccc', margin: '0 5px' }}
                              className={currentIndex2 === inds + 200 ? styles.actvie : ''}
                              key={inds + 200}
                              index={inds + 200}
                              onClick={e => {
                                this.skuClick2(detailData.skuPropertys[2].skuName, items.name, e);
                              }}
                            >
                              {items.name}
                            </button>
                          </>
                        );
                      })}
                    </p>
                  ) : null}
                  {detailData.skuPropertys[3] ? (
                    <p style={{ marginBottom: '5px' }}>
                      <span>{detailData.skuPropertys[3].skuName}</span>
                      {JSON.parse(detailData.skuPropertys[3].skuValue).map((items, inds) => {
                        return (
                          <>
                            <button
                              style={{ border: '1px solid #ccc', margin: '0 5px' }}
                              className={currentIndex3 === inds + 300 ? styles.actvie : ''}
                              key={inds + 300}
                              index={inds + 300}
                              onClick={e => {
                                this.skuClick3(detailData.skuPropertys[3].skuName, items.name, e);
                              }}
                            >
                              {items.name}
                            </button>
                          </>
                        );
                      })}
                    </p>
                  ) : null}
                </>
              ) : null}
            </div>
            {/* {productExist === 'true' ? (
              ''
            ) : (
                <>
                  {
                    detailData && detailData.teamId == this.state.teamId ? null :
                      <div style={{ width: '50%', height: '30px', float: 'left' }}>
                        <Button onClick={this.goMyshop}>上架到本店</Button>
                      </div>
                  }
                </>
              )} */}
          </div>
        </div>
        <p
          style={{
            width: '100%',
            height: '35px',
            background: '#ccc',
            textAlign: 'center',
            borderRadius: '5px',
            marginBottom: '40px',
          }}
        >
          <div style={{ margin: '0 auto', width: '100px', fontSize: '16px', height: '30px' }}>
            {' '}
            商品详情
          </div>
        </p>
        <div style={{ width: '100%', minHeight: '200px', marginTop: '-20px' }}>
          <>
            {productDetail ? (
              <>
                {productDetail &&
                  productDetail.map((item, ind) => {
                    if (item.type == '1') {
                      return (
                        <p
                          style={{
                            width: '100%',
                            height: '30px',
                            marginTop: '5px',
                            textAlign: 'center',
                            fontSize: '22px',
                            marginBottom: '10px',
                          }}
                        >
                          {item.value}
                        </p>
                      );
                    } else {
                      return (
                        <div style={{ width: '300px', height: '200px', margin: '0 auto' }}>
                          <img
                            style={{ width: '100%', height: '100%' }}
                            src={item.value}
                            alt="图片路径错误"
                          />
                        </div>
                      );
                    }
                  })}
              </>
            ) : (
              <p
                style={{
                  width: '100%',
                  height: '35px',
                  textAlign: 'center',
                  borderRadius: '5px',
                  marginBottom: '40px',
                }}
              >
                <div style={{ margin: '0 auto', width: '100px', fontSize: '16px', height: '30px' }}>
                  {' '}
                  暂无详情
                </div>
              </p>
            )}
          </>
        </div>
        <div className={styles.footer}>
          <div className={styles.btnbox}>
            <Button onClick={() => this.setGoodDetail(detailData)} style={{ marginRight: '5px' }}>
              编辑
            </Button>
            {detailData.productStatus == 0 ? (
              <Button onClick={() => this.setGoodState(detailData)} style={{ marginRight: '5px' }}>
                上架
              </Button>
            ) : (
              ''
            )}
            {detailData.productStatus == 1 ? (
              <Button onClick={() => this.setGoodState(detailData)} style={{ marginRight: '5px' }}>
                下架
              </Button>
            ) : (
              ''
            )}
            <Button onClick={() => this.deleteGood(detailData)}>删除</Button>
          </div>
        </div>
        <GoodsDrawer
          type={this.state.isfenxiao}
          onRef={e => {
            this.goodsDrawer.current = e;
          }}
          supplyGoodsList={[detailData]}
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
      </div>
    );
  }
}

export default SupplygoodsDetail;
