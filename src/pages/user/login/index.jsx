import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, CodeSandboxCircleFilled } from '@ant-design/icons';
import styles from './index.less';

const index = props => {
  console.log(props);
  const { dispatch, loadingBtn } = props;
  const onFinish = values => {
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };
  return (
    <Form className={styles.panel} name="login" onFinish={onFinish}>
      <Form.Item name="phone" rules={[{ required: true, message: '请输入账号' }]}>
        <Input placeholder="请输入账号" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" block htmlType="submit" loading={loadingBtn}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ login, loading }) => ({
  login,
  loadingBtn: loading.effects['login/login'] || loading.effects['login/getMenu'],
}))(index);
