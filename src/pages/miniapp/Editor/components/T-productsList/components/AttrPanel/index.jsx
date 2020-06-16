import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select, InputNumber, Radio } from 'antd';
import TUpload from '@/components/T-Upload';
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
      style={{ paddingTop: 10 }}
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
      <Form.Item label="板块标题" name="panelTitle" initialValue={item.panelTitle}>
        <Input placeholder="请输入板块标题" />
      </Form.Item>
      <Form.Item label="一行数量" name="lineNum" initialValue={item.lineNum}>
        <InputNumber />
      </Form.Item>

      <Form.Item label="显示名称" name="showName" initialValue={item.showName}>
        <Radio.Group>
          <Radio value={true}>显示</Radio>
          <Radio value={false}>不显示</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="显示价格" name="showPrice" initialValue={item.showPrice}>
        <Radio.Group>
          <Radio value={true}>显示</Radio>
          <Radio value={false}>不显示</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="显示已售" name="showSaledNum" initialValue={item.showSaledNum}>
        <Radio.Group>
          <Radio value={true}>显示</Radio>
          <Radio value={false}>不显示</Radio>
        </Radio.Group>
      </Form.Item>

      {/* 商品列表 */}
      <div>商品列表</div>
      <div style={{ marginLeft: 30 }}>开发中...</div>
    </Form>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
