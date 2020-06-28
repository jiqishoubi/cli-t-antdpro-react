import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import './index.less';

class typeManager extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  closeAddressModals = () => {
    this.props.onCancel();
  };

  addressModalsOk = () => {
    this.formRef.current.validateFields().then(async values => {
      values.subTypeId = this.props.subTypeId;
      this.props.onOk(values);
    });
  };

  render() {
    const {} = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    const { formList, show } = this.props;

    return (
      <div>
        <Modal
          title="添加分类"
          visible={show}
          closable={false}
          onCancel={this.closeAddressModals}
          onOk={this.addressModalsOk}
          width={600}
          maskClosable={false}
          destroyOnClose
        >
          <div style={{ height: '100px' }}>
            <Form
              {...formItemLayout}
              ref={this.formRef}
              // ref='formRef'
              style={{ float: 'left' }}
            >
              {formList.map(item => {
                return (
                  <>
                    {item.type == 'select' ? (
                      <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[{ required: true, message: item.message }]}
                        initialValue={item.defaultValue ? item.defaultValue : ''}
                      >
                        <Select placeholder={item.message}>
                          {item.list.map((item, ind) => {
                            return (
                              <Option value={item.typeId} key={ind}>
                                {item.typeName}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    ) : null}
                    {item.type == 'ipt' ? (
                      <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[{ required: true, message: item.message }]}
                        initialValue={item.defaultValue ? item.defaultValue : ''}
                      >
                        <Input placeholder={item.message} style={{ width: 380 }} />
                      </Form.Item>
                    ) : null}
                  </>
                );
              })}
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default typeManager;
