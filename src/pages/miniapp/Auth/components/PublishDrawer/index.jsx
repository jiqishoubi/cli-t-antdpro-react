/**
 * 发布上线drawer
 */

import React, { Component } from 'react';
import { Drawer, Form, Radio, Input, Row, Col, Button, Modal } from 'antd';
import { pushCodeAjax } from '@/services/miniapp';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const formItemLayoutTail = {
  wrapperCol: { offset: 5, span: 16 },
};

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading_submit: false,
    };
  }
  open = () => {
    this.setState({
      visible: true,
    });
  };
  close = () => {
    this.setState({
      visible: false,
    });
  };
  cancel = () => {
    this.close();
  };
  //上传 审核
  submit = async () => {
    const self = this;
    console.log(this.props);
    const { miniapp } = this.props;
    const { appid } = miniapp;
    this.setState({ loading_submit: true });
    let res1 = await pushCodeAjax(appid);
    this.setState({ loading_submit: false });
    if (res1.code !== 200) {
      return;
    }
    Modal.info({
      title: '提示',
      content: '上传代码成功',
      onOk() {
        self.close();
      },
    });
  };
  render() {
    const {
      visible,
      //loading
      loading_submit,
    } = this.state;

    return (
      <Drawer title="发布上线" visible={visible} width={600} onClose={this.close}>
        <Form {...formItemLayout}>
          <Form.Item label="分类" name="type" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio style={radioStyle} value={1}>
                商业服务
              </Radio>
              <Radio style={radioStyle} value={2}>
                企业管理
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label="备注信息" name="remark" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayoutTail}>
            <Row justify="start">
              <Button
                type="primary"
                // htmlType='submit'
                style={{ marginRight: 10 }}
                onClick={this.submit}
                loading={loading_submit}
              >
                立即发布
              </Button>
              <Button onClick={this.cancel}>取消发布</Button>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

export default index;
