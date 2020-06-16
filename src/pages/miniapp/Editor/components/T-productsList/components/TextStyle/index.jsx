import React from 'react';
import { connect } from 'dva';
import { Form, Slider, InputNumber } from 'antd';
import { ChromePicker } from 'react-color';
import { onValuesChange } from '../../../../utils_editor';

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
      <Form.Item label="商品名称显示行数" name="textNameLine" initialValue={item.textNameLine || 0}>
        <InputNumber min={1} max={2} />
      </Form.Item>
      <Form.Item
        label="商品名称文字大小"
        name="textNameFontSize"
        initialValue={item.textNameFontSize || 0}
      >
        <Slider min={12} max={50} />
      </Form.Item>
      <Form.Item label="价格颜色" name="textNameColor">
        <ChromePicker key="1" color={item.textNameColor} />
      </Form.Item>
      <Form.Item
        label="价格文字大小"
        name="textPriceFontSize"
        initialValue={item.textPriceFontSize || 0}
      >
        <Slider min={12} max={50} />
      </Form.Item>
      <Form.Item
        label="已售文字大小"
        name="textSaledNumFontSize"
        initialValue={item.textSaledNumFontSize || 0}
      >
        <Slider min={12} max={50} />
      </Form.Item>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
