import React, { useRef } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Radio, Button } from 'antd';
import ChooseProductModal from '../../../ChooseProductModal';
import { onValuesChange } from '../../../../utils_editor';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const Index = props => {
  const chooseProductModalRef = useRef();
  const { h5Editor, dispatch } = props;
  const { itemList, activeItem } = h5Editor;

  let item = itemList.find(obj => obj.id == activeItem.id);

  const openPModal = () => {
    if (chooseProductModalRef && chooseProductModalRef.current) {
      chooseProductModalRef.current.open();
    }
  };

  return (
    <div>
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
        <div style={{ marginLeft: 30 }}>
          <Button type="primary" onClick={openPModal}>
            添加商品
          </Button>
        </div>
      </Form>

      <ChooseProductModal
        onRef={e => {
          chooseProductModalRef.current = e;
        }}
      />
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Index);
