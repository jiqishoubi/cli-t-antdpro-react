import React from 'react';
import { connect } from 'dva';
import { Form, Slider, Radio } from 'antd';
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
      <Form.Item label="高度" name="height" initialValue={item.height}>
        <Slider />
      </Form.Item>
      <Form.Item label="分割线" name="haveLine" initialValue={item.haveLine ? true : false}>
        <Radio.Group>
          <Radio value={true}>有</Radio>
          <Radio value={false}>无</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="左右边距" name="marginLeftRight" initialValue={item.marginLeftRight || 0}>
        <Slider />
      </Form.Item>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
