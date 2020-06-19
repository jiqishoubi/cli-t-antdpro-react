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
      productExist: getUrlParam('productExist'),
      teamId: localDB.getItem('teamId'),
    };
    // this.modifydata = this.modifydata.bind(this);
    this.goodsDrawer = React.createRef();
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    let productId = getUrlParam('productId');
    let productExist = getUrlParam('productExist');
    console.log(productId);
    let teamId = localDB.getItem('teamId');
    console.log(teamId);

    // getMarketGoodsAjax
    let postData = {
      productId,
      teamId: teamId,
    };
    let res = await getMarketGoodsAjax(postData);
    console.log(res);
    let SupplyPriceList = [];
    let PriceList = [];
    let num = [];
    if (res.status == 0) {
      res.data[0].skuPropertyList.map((item, ind) => {
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
      console.log(Allstock);

      console.log(MinPrice, MaxPrice, MinSupplyPrice, MaxSupplyPrice);

      this.setState({
        MinPrice,
        MaxPrice,
        MinSupplyPrice,
        MaxSupplyPrice,
        Allstock,
        productExist,
        productDetail: JSON.parse(res.data[0].productDetail),
        detailData: res.data[0],
      });
    }
  };
  setGoodDetail = () => {
    console.log('编辑');
  };
  setGoodState = () => {
    console.log('上架下架');
  };
  deleteGood = () => {
    console.log('删除');
  };
  skuClick = (titlename, name, e) => {
    let { detailData, monetydata, SupplyPriceList, PriceList, namedata } = this.state;
    let namelist = namedata;
    namelist[0] = name;
    let SupplyPrice = SupplyPriceList;
    let Price = PriceList;
    detailData.skuPropertyList.map((item, ind) => {
      console.log(JSON.parse(item.skuJson)[titlename]);
      let obj = {};
      if (JSON.parse(item.skuJson)[titlename] == name) {
        console.log(1);
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

      console.log(namestr.substr(0, namestr.length - 1));
      detailData.skuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          console.log(item.supplyPrice, item.price, '相同');
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
    detailData.skuPropertyList.map((item, ind) => {
      let obj = {};
      if (JSON.parse(item.skuJson)[titlename] == name) {
        console.log('第二条可以了');

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
    console.log(SupplyPriceList, PriceList);
    let namestr = '';
    if (SupplyPriceList.length == detailData.skuPropertys.length) {
      namedata.map(item => {
        namestr += item + '、';
      });

      console.log(namestr.substr(0, namestr.length - 1));
      detailData.skuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          console.log(item.supplyPrice, item.price, '相同');
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
    detailData.skuPropertyList.map((item, ind) => {
      console.log(JSON.parse(item.skuJson)[titlename]);
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
    console.log(SupplyPriceList, PriceList);
    let namestr = '';
    if (SupplyPriceList.length == detailData.skuPropertys.length) {
      namedata.map(item => {
        namestr += item + '、';
      });

      detailData.skuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          console.log(item.supplyPrice, item.price, '相同');
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
    detailData.skuPropertyList.map((item, ind) => {
      console.log(JSON.parse(item.skuJson)[titlename]);
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

      console.log(namestr.substr(0, namestr.length - 1));
      detailData.skuPropertyList.map((item, ind) => {
        if (item.skuProperty == namestr.substr(0, namestr.length - 1)) {
          console.log(item.supplyPrice, item.price, '相同');
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
    console.log('上架到本店');
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
      productExist,
      productDetail,
      teamId,
    } = this.state;
    console.log('render重新执行');
    console.log(productExist);
    console.log(productExist === 'ture');

    return (
      <div style={{ height: '1000px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>分销市场商品详情</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ width: '100%', height: '360px' }}>
          <ImageCarousel />

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
                    <b>{detailData.priceRange ? detailData.priceRange.maxSupplyPrice : '0'}￥</b>
                  </span>
                  <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                    库存:
                    <b>{detailData.skuPropertyList ? detailData.skuPropertyList[0].stock : 0}</b>
                  </span>
                  <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                    运费:<b>{detailData.transportAmount}</b>
                  </span>
                </p>
                <p>
                  <span style={{ fontSize: '16px' }}>
                    建议售价:
                    <b>
                      {detailData.priceRange
                        ? (detailData.priceRange.maxPrice * 0.01).toFixed(0)
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
            {productExist === 'true' ? (
              ''
            ) : (
              <>
                {detailData && detailData.teamId == this.state.teamId ? null : (
                  <div style={{ width: '50%', height: '30px', float: 'left' }}>
                    <Button onClick={this.goMyshop}>上架到本店</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <p
          style={{
            width: '100%',
            height: '35px',
            background: '#ccc',
            textAlign: 'center',
            borderRadius: '5px',
          }}
        >
          <div style={{ margin: '0 auto', width: '100px', fontSize: '16px', height: '30px' }}>
            {' '}
            商品详情
          </div>
        </p>
        <div style={{ width: '100%', minHeight: '200px', marginTop: '-20px' }}>
          {/*  */}
          {productDetail &&
            productDetail.map((item, ind) => {
              if (item.type == '1') {
                return (
                  <p
                    style={{ width: '100%', height: '30px', marginTop: '5px', textAlign: 'center' }}
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
        </div>

        <GoodsDrawer
          onRef={e => {
            this.goodsDrawer.current = e;
          }}
          supplyGoodsList={detailData}
        />
      </div>
    );
  }
}

export default SupplygoodsDetail;
