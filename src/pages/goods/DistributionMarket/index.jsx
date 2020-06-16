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
} from 'antd';
import { getUrlParam } from '@/utils/utils';
import './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import ImageCarousel from '@/components/ImageCarousel';
// import EditModal from '@/components/EditModal';
import { pathimgHeader, pathVideoHeader } from '@/utils/utils';
import moment from 'moment';
// import router from 'umi/router';
const { TabPane } = Tabs;
class SupplygoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
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
  getALlGoods = () => {
    console.log('搜索全部商品');
  };

  handleModeChange = e => {
    const mode = e.target.value;
    this.setState({ mode });
  };
  tabclick = e => {
    console.log(e);
  };
  render() {
    const {} = this.state;
    const { mode } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    return (
      <div style={{ height: '1000px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>分销市场</Breadcrumb.Item>
        </Breadcrumb>
        <div className="header">
          <div className="headerleft">
            <div className="logo">1</div>
            <div className="teamname">便利电云商城分销市场</div>
          </div>
          <div className="headerright">
            <Form
              {...formItemLayout}
              ref={this.formRef}
              // ref='formRef'
              style={{ float: 'left' }}
            >
              <Form.Item
                style={{ float: 'left' }}
                name="selectName"
                // initialValue={item.defaultValue ? item.defaultValue : ''}
              >
                <Select placeholder={'请选择搜索类型'} style={{ width: 80 }}>
                  <Option value="1">123</Option>
                  <Option value="2">234</Option>
                  {/* <Option value={item.typeId} key={ind}>{item.typeName}</Option> */}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ float: 'left' }}
                name="sosuoName"
                rules={[{ required: true, message: `请输入${1}名称` }]}
                // initialValue={item.defaultValue ? item.defaultValue : ''}
              >
                <Input placeholder={`请输入${1}名称`} style={{ width: 180 }} />
              </Form.Item>
            </Form>
            <Button onClick={this.getALlGoods}>搜索</Button>
          </div>
        </div>

        <div className="tab">
          {/* <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
            <Radio.Button value="top">Horizontal</Radio.Button>
            <Radio.Button value="left">Vertical</Radio.Button>
          </Radio.Group> */}
          <Tabs
            defaultActiveKey="1"
            onTabClick={this.tabclick}
            tabPosition={mode}
            style={{ height: 220 }}
          >
            {[...Array(30).keys()].map(i => (
              <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
                Content of tab {i}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SupplygoodsDetail;
