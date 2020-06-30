import React from 'react';
import { connect } from 'dva';
import { Form, Slider } from 'antd';
import { onValuesChange } from '../../../../utils_editor';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const index = props => {
  const { h5Editor, dispatch } = props;
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
        <Slider max={500} />
      </Form.Item>
      <Form.Item label={<span></span>} colon={false}>
        <div>（0代表自适应）</div>
      </Form.Item>
      <Form.Item label="上边距" name="marginTop" initialValue={item.marginTop || 0}>
        <Slider />
      </Form.Item>
      <Form.Item label="下边距" name="marginBottom" initialValue={item.marginBottom || 0}>
        <Slider />
      </Form.Item>
      <Form.Item label="左右边距" name="marginLeftRight" initialValue={item.marginLeftRight || 0}>
        <Slider />
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
