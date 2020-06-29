/**
 * props
 *
 * callback
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Tabs, Table, Button } from 'antd';
import { getProductsListAjax } from '@/services/goods';
import { isIMG, pathimgHeader } from '@/utils/utils';
import styles from './index.less';
import './index_localName.less';

const { TabPane } = Tabs;

export const getGreeImg = productPic => {
  let pic = '';
  let picStr = '';
  if (productPic) {
    let productPicArr = productPic.split(',');
    for (let i = 0; i < productPicArr.length; i++) {
      if (productPicArr[i] && isIMG(productPicArr[i])) {
        pic = productPicArr[i];
        break;
      }
    }
  }
  if (pic.indexOf('http') > -1) {
    picStr = pic;
  } else {
    picStr = pathimgHeader + pic;
  }
  return picStr;
};

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

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextState) == JSON.stringify(this.state)) {
      return false;
    }
    return true;
  }

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  tabChange = key => {
    this.setState({ activeKey: key }, () => {
      this.getProduct();
    });
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

  clickTableRow = record => {
    this.close();
    if (this.props.callback) {
      this.props.callback(record);
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

    const modalHeight = 650;

    const index = this.findIndex(activeKey);
    const showProductList = productList[index];

    const columns = [
      {
        align: 'left',
        title: '商品图片',
        key: '1',
        width: 350,
        render: record => {
          let pic = getGreeImg(record.productPic);
          return (
            <div className={styles.product_img_wrap}>
              <img className={styles.product_img} src={pic} />
              <div>{record.productName}</div>
            </div>
          );
        },
      },
      { align: 'center', title: '销量', key: 'productTotalSale', dataIndex: 'productTotalSale' },
      { align: 'center', title: '库存', key: 'stockNumber', dataIndex: 'stockNumber' },
      {
        align: 'center',
        title: '状态',
        key: 'productStatus',
        dataIndex: 'productStatus',
        render: v => (v == '0' ? '下架' : '上架'),
      },
    ];

    return (
      <Modal
        visible={visible}
        centered
        maskClosable={false}
        footer={[<Button onClick={this.close}>取消</Button>]}
        width={900}
        bodyStyle={{ height: modalHeight }}
        onCancel={this.close}
      >
        <div className={styles.container} id="editor_chooseProductModal_tabs_container">
          <div className={styles.tabs} id="editor_chooseProductModal_tabs_container_tabs">
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
            <Table
              rowKey="productId"
              size="small"
              columns={columns}
              dataSource={showProductList || []}
              loading={loading_product}
              pagination={false}
              scroll={{ y: modalHeight - (24 * 2 + 35) }}
              rowClassName="editor_chooseProductModal_tabs_container_table_row"
              onRow={record => {
                return {
                  onClick: () => {
                    this.clickTableRow(record);
                  }, // 点击行
                };
              }}
            />
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
