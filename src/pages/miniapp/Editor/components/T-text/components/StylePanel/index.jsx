import React from 'react';
import { connect } from 'dva';
import { Form, Slider, Radio, InputNumber, Select } from 'antd';
import { ChromePicker } from 'react-color';
import { onValuesChange } from '../../../../utils_editor';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const index = props => {
  const { form, h5Editor, dispatch } = props;
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
    >
      <Form.Item label="高度" name="height" initialValue={item.height || 0}>
        <Slider />
      </Form.Item>
      <Form.Item label="大小" name="fontSize" initialValue={item.fontSize}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="颜色" name="color">
        <ChromePicker key="1" color={item.color} />
      </Form.Item>
      <Form.Item label="加粗" name="fontWeight" initialValue={item.fontWeight || 'normal'}>
        <Radio.Group>
          <Radio value="normal">不加粗</Radio>
          <Radio value="bold">加粗</Radio>
        </Radio.Group>
        ,
      </Form.Item>
      <Form.Item
        label="对齐"
        name="justifyContent"
        initialValue={item.justifyContent || 'flex-start'}
      >
        <Select placeholder="请选择对齐方式">
          <Option value="flex-start">靠左</Option>
          <Option value="center">居中</Option>
          <Option value="flex-end">靠右</Option>
        </Select>
      </Form.Item>
      <Form.Item label="背景颜色" name="backgroundColor">
        <ChromePicker key="2" color={item.backgroundColor || '#ffffff'} />
      </Form.Item>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
