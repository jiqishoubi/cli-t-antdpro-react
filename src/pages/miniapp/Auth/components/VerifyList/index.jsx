/**
 * 审核列表
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Spin, Row, Popover } from 'antd';
import moment from 'moment';

const formTime = str => {
  let d = '';
  let dateStr = str.substring(0, 10);
  let nowDateStr = moment().format('YYYY-MM-DD');
  if (nowDateStr == dateStr) {
    d = '今天';
  } else {
    d = dateStr;
  }
  let timeStr = str.substring(11, 16);
  return d + ' ' + timeStr;
};

class index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'miniapp/getVerifyList',
    });
  }
  render() {
    const {
      miniapp,
      //loading
      loadingGetVerifyList,
    } = this.props;
    const { verifyList } = miniapp;

    return (
      <Fragment>
        {loadingGetVerifyList ? (
          <Spin />
        ) : (
          <div>
            {verifyList.map((obj, index) => {
              const content = <p style={{ maxWidth: 270 }}>{obj.reason || '无'}</p>;
              return (
                <Row key={index} justify="space-between">
                  <div>{formTime(obj.auditTime)}</div>
                  <Popover content={content} title="提示" placement="leftBottom">
                    <div>{obj.statusStr}</div>
                  </Popover>
                </Row>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(({ miniapp, loading }) => ({
  miniapp,
  loadingGetVerifyList: loading.effects['miniapp/getVerifyList'],
}))(index);
