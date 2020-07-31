import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, CodeSandboxCircleFilled } from '@ant-design/icons';
import { globalHost, randomStrKey } from '@/utils/utils'
import api_login from '@/services/api/login'
import styles from './index.less';

const index = props => {
  const loginFormRef = useRef()
  const { dispatch, loadingBtn } = props;

  const onFinish = values => {
    dispatch({
      type: 'login/login',
      payload: {
        ...values,
        captchaKey: mykey
      },
    }).then((flag) => {
      if (!flag) {
        refreshMykey()
      }
    })
  };

  //图形验证码
  const captchaKey = 'captcha'
  const [mykey, setMykey] = useState(randomStrKey())

  useEffect(() => {
    if (loginFormRef && loginFormRef.current) {
      loginFormRef.current.resetFields([captchaKey])
    }
  }, [mykey])

  const refreshMykey = () => {
    setMykey(randomStrKey())
  }
  //图形验证码 end

  return (
    <Form ref={loginFormRef} className={styles.panel} name="login" onFinish={onFinish}>
      <Form.Item name="loginName" rules={[{ required: true, message: '请输入账号' }]}>
        <Input allowClear placeholder="请输入账号" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="loginPassword" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password allowClear placeholder="请输入密码" prefix={<LockOutlined />} />
      </Form.Item>

      {/* 图形验证码 */}
      <Form.Item>
        <Row align='middle'>
          <Col flex='1'>
            <Form.Item name={captchaKey} rules={[{ required: true, message: '请输入验证码' }]} noStyle>
              <Input allowClear placeholder="请输入验证码" />
            </Form.Item>
          </Col>
          <Col>
            <img src={globalHost() + api_login.getCaptchaApi + mykey} alt='' onClick={refreshMykey} style={{ width: 124, height: 31, marginLeft: 10 }} />
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" loading={loadingBtn}>登录</Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ login, loading }) => ({
  login,
  loadingBtn: loading.effects['login/login'] || loading.effects['login/getMenuRightsFunc'],
}))(index);
