import React, { Component } from 'react';
import { Drawer } from 'antd';

export default class HelpDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dom: null,
    };
  }
  toggle = dom => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
      dom: !visible && dom ? dom : null,
    });
  };
  render() {
    const { visible, dom } = this.state;
    return (
      <Drawer title="查看帮助" width={600} placement="left" visible={visible} onClose={this.toggle}>
        {dom}
      </Drawer>
    );
  }
}
