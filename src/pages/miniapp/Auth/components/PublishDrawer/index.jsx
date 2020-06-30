/**
 * 发布上线drawer
 */

import React, { Component } from 'react';
import { Drawer, Form, Radio, Input, Row, Button, Modal, message } from 'antd';
import { pushCodeAjax, submitCodeAjax } from '@/services/miniapp';

const { TextArea } = Input;

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

  //上传 + 审核
  submit = async () => {
    const self = this;
    const { dispatch, miniapp } = this.props;
    const { appid } = miniapp;

    this.setState({ loading_submit: true });
    //一、上传代码
    let res1 = await pushCodeAjax(appid);
    if (!res1 || res1.code !== 200 || !res1.data || res1.data.status !== 0) {
      this.setState({ loading_submit: false });
      message.warning('上传代码失败，' + ((res1 && res1.data && res1.data.message) || ''));
      return;
    }

    //二、提交审核
    let res2 = await submitCodeAjax(appid);
    if (!res2 || res2.code !== 200 || !res2.data || res2.data.status !== 0) {
      this.setState({ loading_submit: false });
      message.warning('提交审核失败，' + ((res2 && res2.data && res2.data.message) || ''));
      return;
    }
    this.setState({ loading_submit: false });

    //成功
    dispatch({ type: 'miniapp/getVerifyList' });
    dispatch({ type: 'miniapp/getMiniappInfo' });

    Modal.info({
      title: '提示',
      content: '提交审核成功',
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
          <Form.Item label="分类" name="type" rules={[{ required: true }]} initialValue={1}>
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
          <Form.Item label="备注信息" name="remark">
            <TextArea placeholder="请输入..." />
          </Form.Item>
          <Form.Item {...formItemLayoutTail}>
            <Row justify="start">
              <Button onClick={this.cancel}>取消提交</Button>
              <Button
                type="primary"
                // htmlType='submit'
                style={{ marginLeft: 10 }}
                onClick={this.submit}
                loading={loading_submit}
              >
                提交审核
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

export default index;
