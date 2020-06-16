import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { stringify } from 'querystring';

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

    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = true;
    //返回的页面
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (!isLogin || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ login, loading }) => ({
  login,
  // loading: loading.models.user,
}))(SecurityLayout);
