import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Divider, Spin } from 'antd';
import PublishDrawer from '../PublishDrawer';
import { getAuthUrlAjax, verifyListAjax } from '@/services/miniapp';
import { getUrlParam, mConfirm } from '@/utils/utils';
import styles from './index.less';

class MiniappInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading_getUrl: false,
    };
  }
  async componentDidMount() {
    const { dispatch, miniapp } = this.props;
    const { appid, miniappInfo } = miniapp;

    //授权
    let auth_code = getUrlParam('auth_code');
    let expires_in = getUrlParam('expires_in');
    if (auth_code && expires_in && !appid) {
      dispatch({
        type: 'miniapp/getAuth',
        payload: {
          auth_code,
          expires_in,
        },
      });
    }

    //获取小程序信息
    if (appid && !miniappInfo) {
      dispatch({
        type: 'miniapp/getMiniappInfo',
      });
    }
  }

  getAuth = async () => {
    let postData = {
      authUrl: 'http://thirdpart.bld365.com/sassdemo/index.html#/miniapp/auth',
    };
    this.setState({ loading_getUrl: true });
    let res = await getAuthUrlAjax(postData);
    this.setState({ loading_getUrl: false });
    let url = res;
    window.location.href = url;
  };

  //上传代码
  upload = () => {
    this.publishDrawer.open();
  };

  //提交审核
  submitVerify = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'miniapp/submitVerify',
    });
  };

  //撤销审核
  cancelVerify = () => {
    mConfirm('确认撤销审核？', () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'miniapp/cancelVerify',
      });
    });
  };

  //发布上线
  publish = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'miniapp/publishApp',
    });
  };

  render() {
    const { loading_getUrl } = this.state;
    const {
      miniapp,
      //loading
      loadingGetMiniappInfo,
      loadingSubmitVerify,
      loadingCancelVerify,
      loadingPublishApp,
    } = this.props;
    const { miniappInfo, appid, miniappStatus } = miniapp;

    return (
      <div>
        <Row>
          <Col flex="auto">
            <div className={styles.miniapp}>
              <div className={styles.info}>
                {loadingGetMiniappInfo ? (
                  <Spin />
                ) : (
                  <div className={styles.logo_box}>
                    {miniappInfo && miniappInfo.headImg ? <img src={miniappInfo.headImg} /> : null}
                  </div>
                )}
                <div>
                  {miniappInfo && miniappInfo.nickName ? miniappInfo.nickName : '暂未授权小程序'}
                </div>
                <div>
                  {miniappInfo && appid ? (
                    <div>
                      <div>{`appid:${appid}`}</div>
                      <div style={{ textAlign: 'center' }}>状态：{miniappStatus}</div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className={styles.ctrl_wrap}>
                {miniappInfo ? (
                  <div>
                    <Button
                      type="primary"
                      onClick={this.upload}
                      disabled={miniappStatus == '审核中'}
                    >
                      上传代码
                    </Button>
                    <Button
                      type="primary"
                      onClick={this.submitVerify}
                      style={{ marginLeft: 10 }}
                      loading={loadingSubmitVerify}
                      disabled={miniappStatus == '审核中'}
                    >
                      提交审核
                    </Button>
                    <Button
                      type="primary"
                      onClick={this.cancelVerify}
                      style={{ marginLeft: 10 }}
                      loading={loadingCancelVerify}
                      disabled={miniappStatus !== '审核中'}
                    >
                      撤销审核
                    </Button>
                    <Button
                      type="primary"
                      onClick={this.publish}
                      style={{ marginLeft: 10 }}
                      loading={loadingPublishApp}
                      disabled={miniappStatus !== '审核成功'}
                    >
                      发布上线
                    </Button>
                  </div>
                ) : (
                  <Button type="primary" onClick={this.getAuth} loading={loading_getUrl}>
                    绑定小程序
                  </Button>
                )}
              </div>
            </div>
          </Col>
          <Col>
            <Divider type="vertical" dashed={true} style={{ height: 250 }} />
          </Col>
          <Col flex="200px">
            <Row justify="center">
              <div className={styles.code_box}>
                {miniappInfo && miniappInfo.qrcodeUrl ? (
                  <img className={styles.code} src={miniappInfo.qrcodeUrl} />
                ) : null}
              </div>
            </Row>
          </Col>
        </Row>

        <PublishDrawer
          ref={e => {
            this.publishDrawer = e;
          }}
          {...this.props}
        />
      </div>
    );
  }
}

export default connect(({ miniapp, loading }) => ({
  miniapp,
  loadingSubmitVerify: loading.effects['miniapp/submitVerify'],
  loadingCancelVerify: loading.effects['miniapp/cancelVerify'], //撤销审核
  loadingPublishApp: loading.effects['miniapp/publishApp'],
}))(MiniappInfo);
