import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { loginStateKey } from '@/utils/consts';
import { localDB } from '@/utils/utils';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      // 重新登录
      dispatch({ type: 'login/loginAgain' });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, login } = this.props;
    console.log(login);

    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    let isLogin = true;
    let loginState = localDB.getItem(loginStateKey);
    if (!loginState || !loginState.loginInfo || !loginState.loginInfo.userId) {
      isLogin = false;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login`} />;
    }

    if (!isReady) {
      return <PageLoading />;
    }

    return children;
  }
}

export default connect(({ loading }) => ({
  // loading: loading.models.user,
}))(SecurityLayout);
