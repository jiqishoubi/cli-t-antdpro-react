import React from 'react';
import { connect } from 'dva';
import { Form, Slider } from 'antd';
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
      <Form.Item label="上外边距" name="marginTop" initialValue={item.marginTop || 0}>
        <Slider />
      </Form.Item>
      <Form.Item label="下外边距" name="marginBottom" initialValue={item.marginBottom || 0}>
        <Slider />
      </Form.Item>
      <Form.Item label="左右外边距" name="marginLeftRight" initialValue={item.marginLeftRight || 0}>
        <Slider />
      </Form.Item>
      <Form.Item
        label="上下内边距"
        name="paddingTopBottom"
        initialValue={item.paddingTopBottom || 0}
      >
        <Slider />
      </Form.Item>
      <Form.Item
        label="左右内边距"
        name="paddingLeftRight"
        initialValue={item.paddingLeftRight || 0}
      >
        <Slider />
      </Form.Item>
      <Form.Item label="背景颜色" name="backgroundColor">
        <ChromePicker key="1" color={item.backgroundColor} />
      </Form.Item>
      <Form.Item label="圆角" name="borderRadius" initialValue={item.borderRadius || 0}>
        <Slider />
      </Form.Item>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
