import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Form, Input, Select } from 'antd';
import TUpload2 from '@/components/T-Upload2';
import { onValuesChange } from '../../../../utils_editor';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const Index = props => {
  const [formRef] = Form.useForm();
  const { h5Editor, dispatch } = props;
  const { itemList, activeItem } = h5Editor;

  let item = itemList.find(obj => obj.id == activeItem.id);

  const init = () => {
    formRef.setFieldsValue({
      imgUrl: item.imgUrl ? [item.imgUrl] : [],
    });
  };

  useEffect(() => {
    init();
  }, [item]);

  return (
    <Form
      form={formRef}
      {...formItemLayout}
      onValuesChange={(changedValues, allValues) => {
        if (changedValues.imgUrl) {
          changedValues.imgUrl = changedValues.imgUrl[0] ? changedValues.imgUrl[0].url : '';
        }
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
      <Form.Item label="图片" name="imgUrl" rules={[{ required: true, message: '请上传图片' }]}>
        <TUpload2 length={1} />
      </Form.Item>

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
}))(Index);
