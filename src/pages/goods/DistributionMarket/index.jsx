import React from 'react';
import { Button, Form, Input, Tabs } from 'antd';
import styles from './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import SwitchContent from './SwitchContent';

const { TabPane } = Tabs;

class SupplygoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
      TabsList: [],
      goodsName: '',
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getTabsList();
  }

  getTabsList = async () => {
    let res = await requestw({
      url: api_goods.querySupplyGoodsTypeList,
      data: { queryType: '1' },
    });

    if (res && res.data.status == 0) {
      let TabsList = res.data.data;
      TabsList.unshift({
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
              <Form.Item style={{ float: 'right' }} name="sosuoName">
                <Input placeholder="请输入商品名称" style={{ width: 180 }} />
              </Form.Item>
              <Button onClick={this.getALlGoods}>搜索</Button>
            </Form>
          </div>
        </div>

        <div className={styles.tab}>
          <Tabs
            defaultActiveKey="0"
            onTabClick={this.tabclick}
            tabPosition={mode}
            style={{ height: 780 }}
          >
            {TabsList.map(i => (
              <TabPane forceRender={false} tab={i.typeName} key={i.typeId}>
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
