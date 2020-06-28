/**
 * props
 *
 * callback
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Tabs, Spin } from 'antd';
import { getProductsListAjax } from '@/services/goods';
import styles from './index.less';
import './index_localName.less';

const { TabPane } = Tabs;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      productList: [],
      activeKey: '',
      //loading
      loading_product: false,
    };
  }

  async componentDidMount() {
    this.props.onRef(this);
    await this.getType();
    this.getProduct();
  }

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  onOk = () => {
    if (this.props.callback) {
      this.props.callback();
    }
  };

  tabChange = key => {
    this.setState({ activeKey: key });
  };

  getType = () => {
    return new Promise(resolve => {
      const { dispatch } = this.props;

      dispatch({
        type: 'goods/getGoodsType',
      }).then(() => {
        const { goods } = this.props;
        const { goodsTypeList } = goods;
        this.setState(
          {
            activeKey: (goodsTypeList[0] && goodsTypeList[0].typeId + '') || '',
          },
          () => {
            resolve();
          },
        );
      });
    });
  };

  findIndex = activeKey => {
    const { goods } = this.props;
    const { goodsTypeList } = goods;
    let index = 0;
    for (let i = 0; i < goodsTypeList.length; i++) {
      if (goodsTypeList[i].typeId + '' == activeKey + '') {
        index = i;
        break;
      }
    }
    return index;
  };

  getProduct = async () => {
    const { activeKey } = this.state;
    const { login } = this.props;
    const { loginInfo } = login;

    let index = this.findIndex(activeKey);
    if (this.state.productList[index] && this.state.productList[index].length > 0) {
      return;
    }

    let postData = {
      teamId: loginInfo.userTeamId || loginInfo.currentTeamId,
      productType: 'SELF_SUPPORT_GOODS',
      pageSize: 600,
      pageNo: 1,
      typeId: activeKey,
    };
    this.setState({ loading_product: true });
    let res = await getProductsListAjax(postData);
    if (res && res.status == 0 && res.data && res.data.list && res.data.list.length > 0) {
      const { productList } = this.state;
      productList[index] = res.data.list;
      this.setState({
        productList,
        loading_product: false,
      });
    } else {
      this.setState({ loading_product: false });
    }
  };

  render() {
    const {
      visible,
      productList,
      activeKey,
      //loading
      loading_product,
    } = this.state;
    const { goods } = this.props;
    const { goodsTypeList } = goods;

    const modalHeight = 600;

    const index = this.findIndex(activeKey);
    const showProductList = productList[index];

    return (
      <Modal
        visible={visible}
        centered
        cancelText="取消"
        okText="确定"
        width={800}
        bodyStyle={{ height: modalHeight }}
        onCancel={this.close}
        onOk={this.onOk}
      >
        <div className={styles.container} id="editor_chooseProductModal_tabs_container">
          <div className={styles.tabs}>
            <Tabs
              tabPosition="left"
              activeKey={activeKey}
              onChange={this.tabChange}
              style={{ height: modalHeight - 24 * 2 }}
            >
              {goodsTypeList.map(obj => (
                <TabPane key={obj.typeId} tab={obj.typeName} />
              ))}
            </Tabs>
          </div>
          <div className={styles.content}>
            {showProductList && showProductList.length > 0
              ? showProductList.map(obj => (
                  <div key={obj.productId} className={styles.product_item}>
                    商品
                  </div>
                ))
              : null}
          </div>
          {/* loading */}
          <div
            className={styles.loading_mask}
            style={{ display: loading_product ? 'flex' : 'none' }}
          >
            <Spin />
          </div>
        </div>
      </Modal>
    );
  }
}

export default connect(({ goods, login }) => ({
  goods,
  login,
}))(Index);
