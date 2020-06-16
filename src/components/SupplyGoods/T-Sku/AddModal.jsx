/**
 * props:
 */
import React, { Component } from 'react';
import { Modal, Input, Button, Form } from 'antd';

export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.formRef = React.createRef();
    this.callback = null;
  }
  open = callback => {
    this.setState({ visible: true });
    this.callback = callback;
  };
  close = () => {
    this.formRef.current.resetFields();
    this.setState({ visible: false });
  };
  onCancel = () => {
    this.close();
  };
  onOk = async () => {
    let values = await this.formRef.current.validateFields();
    this.close();
    if (this.callback) {
      this.callback(values.name);
    }
  };
  render() {
    const { visible } = this.state;
    return (
      <Modal
        title={'添加规格'}
        visible={visible}
        footer={[
          <Button onClick={this.onCancel}>取消</Button>,
          <Button type="primary" onClick={this.onOk}>
            确定
          </Button>,
        ]}
      >
        <Form ref={this.formRef}>
          <Form.Item name="name" rules={[{ required: true, message: '请输入规格' }]}>
            <Input placeholder="请输入规格" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
