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
import { pathimgHeader, pathVideoHeader } from '@/utils/utils';
import moment from 'moment';
// import router from 'umi/router';
class SupplygoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.modifydata = this.modifydata.bind(this);
  }
  componentDidMount() {
    // this.getData();
  }
  setGoodDetail = () => {
    console.log('编辑');
  };
  setGoodState = () => {
    console.log('上架下架');
  };
  deleteGood = () => {
    console.log('删除');
  };
  render() {
    const {} = this.state;

    return (
      <div style={{ height: '1000px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>供货商品详情</Breadcrumb.Item>
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
            这里就是商品名字了
          </p>
          <div
            style={{
              background: '#f00',
              float: 'left',
              marginLeft: '40px',
              width: '500px',
              height: '270px',
            }}
          >
            <p>
              <span style={{ fontSize: '16px' }}>
                供货价:<b>16￥</b>
              </span>
              <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                库存:<b>20</b>
              </span>
              <span style={{ fontSize: '16px', marginLeft: '30px' }}>
                运费:<b>0</b>
              </span>
            </p>
            <p>
              <span style={{ fontSize: '16px' }}>
                建议售价:<b>16￥</b>
              </span>
            </p>
            {/* 待定部位 */}
          </div>
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            width: '90%',
            height: '50px',
            float: 'left',
          }}
        >
          <div style={{ margin: '0 auto', width: '300px', height: '100%', lineHeight: '50px' }}>
            <Button style={{ margin: '0 5px' }} onClick={this.setGoodDetail}>
              编辑
            </Button>
            <Button style={{ margin: '0 5px' }} onClick={this.setGoodState}>
              下架
            </Button>
            <Button style={{ margin: '0 5px' }} onClick={this.deleteGood}>
              删除
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SupplygoodsDetail;
