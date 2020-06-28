import React from 'react';
// import { connect } from 'dva';
import { Pagination } from 'antd';
import { localDB } from '@/utils/utils';
import styles from './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';

// import EditModal from '@/components/EditModal';
import router from 'umi/router';

class SwitchContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      goodsList: [],
      total: 0,
      teamId: localDB.getItem('teamId'),
    };
    //this.modifydata = this.modifydata.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.getData();
  }

  getData = async () => {
    let { supplyType, goodsName } = this.props;
    let { pageNum, pageSize } = this.state;
    let teamId = localDB.getItem('teamId');
    let data = {
      supplyType,
      pageNo: pageNum,
      pageSize,
      teamId,
      queryType: 'RETAIL',
    };
    if (goodsName != '') {
      data.productName = goodsName;
    }
    let res = await requestw({
      url: api_goods.queySupplyProduct,
      data: data,
    });
    if (res.data && res.data.status == 0) {
      this.setState({
        goodsList: res.data.data.list,
        total: res.data.data.total,
      });
    }
  };

  onChange = pageNum => {
    this.setState(
      {
        pageNum,
      },
      () => {
        this.getData();
      },
    );
  };

  toDetail = toDetail => {
    router.push({
      pathname: '/DistributionDetail',
      query: {
        productId: toDetail.productId,
        productExist: toDetail.productExist,
      },
    });
  };

  render() {
    const { goodsList, total } = this.state;
    // const formItemLayout = {
    //   labelCol: { span: 4 },
    //   wrapperCol: { span: 15 },
    // };
    return (
      <>
        <div style={{ width: '100%', minHeight: '640px' }}>
          {goodsList.map(item => {
            return (
              <div
                className={styles.goodsbox}
                onClick={() => {
                  this.toDetail(item);
                }}
              >
                {item.productExist ? (
                  <div className={styles.goodsimgmin}>该商品已在本店上架</div>
                ) : null}
                {item.teamId == this.state.teamId ? (
                  <div className={styles.goodsimgmin}>该商品为本店上架商品</div>
                ) : null}
                <div className={styles.goodstopimg}>
                  <img
                    style={{ width: '100%', height: '200px' }}
                    src={item.productPic.split(',')[0]}
                    alt="路径错误"
                  />
                </div>
                <div className={styles.goodstitle}>
                  <div className={styles.goodsname}>{item.productName}</div>
                  <p>
                    供货价：￥{item.priceRange.minSupplyPrice}-￥{item.priceRange.maxSupplyPrice}{' '}
                  </p>
                  <p>
                    建议售价：￥{item.priceRange.minPrice}-￥{item.priceRange.maxPrice}{' '}
                  </p>
                  <p>月销量：{item.priceRange.monthSale} </p>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ width: '100%', height: '30px' }}>
          <Pagination
            style={{ float: 'right' }}
            defaultCurrent={6}
            onChange={this.onChange}
            total={total}
          />
        </div>
      </>
    );
  }
}

export default SwitchContent;
