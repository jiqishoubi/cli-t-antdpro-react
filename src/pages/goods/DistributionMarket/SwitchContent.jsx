import React from 'react';
import { connect } from 'dva';
import {
  Button,
  Card,
  Row,
  Col,
  Breadcrumb,
  Radio,
  Modal,
  message,
  Form,
  Select,
  Input,
  Tabs,
  Pagination,
} from 'antd';
import { getUrlParam, localDB } from '@/utils/utils';
import styles from './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import ImageCarousel from '@/components/ImageCarousel';
// import EditModal from '@/components/EditModal';
import { pathimgHeader, pathVideoHeader } from '@/utils/utils';
import moment from 'moment';
import router from 'umi/router';
const { TabPane } = Tabs;
class SwitchContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      goodsList: [],
      total: 0,
    };
    //this.modifydata = this.modifydata.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
    this.getData();
  }
  getData = async () => {
    let { supplyType } = this.props;
    let { pageNum, pageSize } = this.state;
    let teamId = localDB.getItem('teamId');
    let res = await requestw({
      url: api_goods.queySupplyProduct,
      data: {
        supplyType,
        pageNum,
        pageSize,
        teamId,
      },
    });
    console.log(res);
    if (res && res.data.status == 0) {
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
    console.log(toDetail);
    router.push({
      pathname: '/DistributionDetail',
      query: {
        productId: toDetail.productId,
      },
    });
  };
  render() {
    const { goodsList, total } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    return (
      <>
        <div style={{ width: '100%', minHeight: '314px' }}>
          {goodsList.map((item, ind) => {
            return (
              <div
                className={styles.goodsbox}
                onClick={() => {
                  this.toDetail(item);
                }}
              >
                <div className={styles.goodstopimg}>
                  <img
                    style={{ width: '100%', height: '200px' }}
                    src={item.productPic}
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
