import React, { Component } from 'react';
import { Form, Modal, Input, Button, message } from 'antd';
import { bindTesterAjax } from '@/services/miniapp';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };
    this.formRef = React.createRef();
  }
  open = () => {
    this.setState({ visible: true });
  };
  close = () => {
    this.setState({ visible: false }, () => {
      this.formRef.current.resetFields();
    });
  };
  cancel = () => {
    this.close();
  };
  submit = async () => {
    const { miniapp, dispatch } = this.props;
    const { appid } = miniapp;
    let values = await this.formRef.current.validateFields();
    let postData = {
      app_id: appid,
      ...values,
    };
    this.setState({ loading: true });
    let res = await bindTesterAjax(postData);
    this.setState({ loading: false });
    console.log(res);
    if (res && res.code == 200 && res.data && res.data.status == 0) {
      message.success(res.data.message);
      this.close();
      dispatch({
        type: 'miniapp/getTesterList',
      });
    } else {
      message.warning(res.data.data || res.data.message || res.message);
    }
  };
  render() {
    const { visible, loading } = this.state;
    return (
      <Modal
        visible={visible}
        title="绑定体验成员"
        onCancel={this.cancel}
        footer={[
          <Button onClick={this.cancel}>取消</Button>,
          <Button type="primary" onClick={this.submit} loading={loading}>
            确定
          </Button>,
        ]}
      >
        <Form ref={this.formRef}>
          <Form.Item name="wechatid" rules={[{ required: true, message: '请输入微信号' }]}>
            <Input placeholder="请输入微信号" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default index;
