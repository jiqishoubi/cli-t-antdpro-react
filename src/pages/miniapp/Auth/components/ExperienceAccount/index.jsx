/**
 * 体验账号
 */
import React, { Component, Fragment } from 'react';
import { Row, Button, Modal, message } from 'antd';
import { unbindTesterAjax } from '@/services/miniapp';
import { mConfirm } from '@/utils/utils';

class index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'miniapp/getTesterList',
    });
  }
  unbindTester = obj => {
    mConfirm('确认解绑？', () => {
      return new Promise(async resolve => {
        const { miniapp, dispatch } = this.props;
        const { appid } = miniapp;
        let postData = {
          app_id: appid,
          ...obj,
        };
        let res = await unbindTesterAjax(postData);
        resolve();
        if (res && res.code == 200) {
          message.success(res.message);
          dispatch({
            type: 'miniapp/getTesterList',
          });
        } else {
          message.warning(res.message);
        }
      });
    });
  };
  render() {
    const { miniapp } = this.props;
    const { testerList } = miniapp;
    return (
      <Fragment>
        {testerList && testerList.length > 0 ? (
          testerList.map((obj, index) => (
            <Row key={index} justify="space-between">
              <div>{obj.wechatid}</div>
              <Button
                size="small"
                onClick={() => {
                  this.unbindTester(obj);
                }}
              >
                解绑成员
              </Button>
            </Row>
          ))
        ) : (
          <div>暂无数据</div>
        )}
      </Fragment>
    );
  }
}

export default index;
