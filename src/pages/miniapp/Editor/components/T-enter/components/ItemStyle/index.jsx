import React from 'react';
import { connect } from 'dva';
import { Form, Slider, InputNumber, Radio, Input } from 'antd';
import { ChromePicker } from 'react-color';
import { onValuesChange } from '../../../../utils_editor';

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
      <Form.Item label="一行的数量" name="lineNum" initialValue={item.lineNum || 0}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="上下外边距"
        name="marginTopBottomItem"
        initialValue={item.marginTopBottomItem || 0}
      >
        <Slider />
      </Form.Item>
      <Form.Item
        label="左右外边距"
        name="marginLeftRightItem"
        initialValue={item.marginLeftRightItem || 0}
      >
        <Slider />
      </Form.Item>
      <Form.Item
        label="上下内边距"
        name="paddingTopBottomItem"
        initialValue={item.paddingTopBottomItem || 0}
      >
        <Slider />
      </Form.Item>
      <Form.Item
        label="左右内边距"
        name="paddingLeftRightItem"
        initialValue={item.paddingLeftRightItem || 0}
      >
        <Slider />
      </Form.Item>
      <Form.Item label="圆角" name="borderRadiusItem" initialValue={item.borderRadiusItem || 0}>
        <Slider />
      </Form.Item>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
