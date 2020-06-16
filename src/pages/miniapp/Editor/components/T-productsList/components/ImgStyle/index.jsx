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
      <Form.Item label="图片宽度" name="imgWidth_line1" initialValue={item.imgWidth_line1}>
        <Slider max={400} disabled={item.lineNum !== 1} />
      </Form.Item>
      <Form.Item label="图片高度" name="imgHeight" initialValue={item.imgHeight || 0}>
        <Slider max={400} />
      </Form.Item>
      <Form.Item label="下边距" name="imgMarginBottom" initialValue={item.imgMarginBottom || 0}>
        <Slider />
      </Form.Item>
      <Form.Item
        label="左右边距"
        name="imgMarginLeftRight"
        initialValue={item.imgMarginLeftRight || 0}
      >
        <Slider />
      </Form.Item>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
