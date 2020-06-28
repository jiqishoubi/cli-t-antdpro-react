import React from 'react';
// import { connect } from 'dva';
import {
  Button,
  // Card,
  // Row,
  // Col,
  // Radio,
  // Modal,
  // message,
  Form,
  // Select,
  Input,
  Tabs,
} from 'antd';
// import {  } from '@/utils/utils';
import styles from './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
// import Tablew from '@/components/Tablew';
// import ImageCarousel from '@/components/ImageCarousel';
// import EditModal from '@/components/EditModal';
// import { getUrlParam } from '@/utils/utils';
// import moment from 'moment';
import SwitchContent from './SwitchContent';

// import router from 'umi/router';
const { TabPane } = Tabs;
class SupplygoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
      TabsList: [],
      goodsName: '',
    };
    // this.modifydata = this.modifydata.bind(this);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    // this.getData();
    this.getTabsList();
    // this.child.getData()
  }

  getTabsList = async () => {
    let res = await requestw({
      url: api_goods.querySupplyGoodsTypeList,
      data: { queryType: '1' },
    });

    if (res && res.data.status == 0) {
      let TabsList = res.data.data;
      TabsList.unshift({
        // teamId: 2,
        typeGct: '2020-06-11 16:10:15',
        typeId: '',
        typeName: '全部',
        typeSortValue: 1,
        typeVisible: 0,
        supplyType: '',
      });

      this.setState({
        TabsList,
      });
    }
  };

  setGoodDetail = () => {};

  setGoodState = () => {};

  deleteGood = () => {};

  getALlGoods = async () => {
    let values = await this.formRef.current.validateFields();
    this.setState(
      {
        goodsName: values.sosuoName,
      },
      () => {
        this.child.getData();
      },
    );
  };

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  tabclick = e => {
    this.setState(
      {
        supplyType: e,
      },
      () => {
        this.child.getData();
      },
    );
  };

  onRef = ref => {
    this.child = ref;
  };

  render() {
    const { TabsList, supplyType } = this.state;
    const { mode } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    return (
      <div style={{ height: '800px' }}>
        <div className={styles.header}>
          <div className={styles.headerleft}>
            <div className={styles.logo}></div>
            <div className={styles.teamname}>便利电云商城分销市场</div>
          </div>
          <div className={styles.headerright}>
            <Form
              {...formItemLayout}
              ref={this.formRef}
              // ref='formRef'
              style={{ float: 'right' }}
            >
              {/* <Form.Item
                style={{ float: 'left' }}
                name="selectName"
              // initialValue={item.defaultValue ? item.defaultValue : ''}
              >
                <Select placeholder={'请选择搜索类型'} style={{ width: 80 }}>
                  <Option value="1">123</Option>
                  <Option value="2">234</Option>
                </Select>
              </Form.Item> */}

              <Form.Item style={{ float: 'right' }} name="sosuoName">
                <Input placeholder="请输入商品名称" style={{ width: 180 }} />
              </Form.Item>
              <Button onClick={this.getALlGoods}>搜索</Button>
            </Form>
          </div>
        </div>

        <div className={styles.tab}>
          {/* <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
            <Radio.Button value="top">Horizontal</Radio.Button>
            <Radio.Button value="left">Vertical</Radio.Button>
          </Radio.Group> */}
          <Tabs
            defaultActiveKey="0"
            onTabClick={this.tabclick}
            tabPosition={mode}
            style={{ height: 780 }}
          >
            {TabsList.map(i => (
              <TabPane forceRender={false} tab={i.typeName} key={i.typeId}>
                {/* Content of tab {i.typeName} */}
                <SwitchContent
                  onRef={this.onRef}
                  supplyType={supplyType}
                  goodsName={this.state.goodsName}
                />
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SupplygoodsDetail;
