import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select } from 'antd';
import { onValuesChange } from '../../../../utils_editor';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const index = props => {
  const { form, h5Editor } = props;
  const { itemList, activeItem } = h5Editor;

  let item = itemList.find(obj => obj.id == activeItem.id);

  return (
    <Form
      {...formItemLayout}
      onValuesChange={(changedValues, allValues) => {
        onValuesChange({
          changedValues,
          allValues,
          itemList,
          activeItem,
          dispatch,
        });
      }}
      style={{ paddingTop: 10 }}
    >
      <Form.Item label="文字内容" name="content" initialValue={item.content}>
        <TextArea placeholder="请输入文字内容" />
      </Form.Item>

      {/* 跳转 */}
      <Form.Item label="跳转类型" name="goType" initialValue={item.goType || undefined}>
        <Select placeholder="请选择跳转类型">
          <Option value="miniapp">小程序页面</Option>
          <Option value="h5">H5页面</Option>
        </Select>
      </Form.Item>
      <Form.Item label="跳转地址" name="goUrl" initialValue={item.goUrl}>
        <Input placeholder="请输入跳转地址" />
      </Form.Item>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
