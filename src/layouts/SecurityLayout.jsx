import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { loginStateKey } from '@/utils/consts';
import { localDB } from '@/utils/utils';
import defaultSettings from '../../config/defaultSettings';

//获得上面mixMenu的index
export const getMixMenuIndex = (menuTree, pathname) => {
  //自己及子集是否包含
  const isHaveUrlFunc = menuItem => {
    let flag = false;
    const test = item => {
      if (item.path == pathname) {
        flag = true;
      }
      if (item.children) {
        item.children.forEach(obj => {
          test(obj);
        });
      }
    };
    test(menuItem);
    return flag;
  };

  let index = menuTree.findIndex(menuItem => isHaveUrlFunc(menuItem));

  return index;
};

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    this.setState({
      isReady: true,
    });
    // 重新登录
    if (dispatch) {
      dispatch({ type: 'login/loginAgain' });
    }

    //监听路由 //mix模式 上面的menu active index
    if (defaultSettings.layout == 'mixmenu') {
      if (!window.UNLISTEN_MIXINDEX) {
        window.UNLISTEN_MIXINDEX = this.props.history.listen(location => {
          const { login } = this.props;
          let mixMenuActiveIndex = getMixMenuIndex(login.menuTree, location.pathname);
          dispatch({
            type: 'login/saveMixMenuActiveIndex',
            payload: mixMenuActiveIndex + '',
          });
        });
      }
    }
  }

  componentWillUnmount() {
    if (window.UNLISTEN_MIXINDEX) {
      window.UNLISTEN_MIXINDEX();
      window.UNLISTEN_MIXINDEX = null;
    }
  }

  render() {
    const { isReady } = this.state;
    const { children } = this.props;

    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    let isLogin = true;
    let loginState = localDB.getItem(loginStateKey);
    if (!loginState || !loginState.loginInfo || !loginState.loginInfo.token) {
      isLogin = false;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to="/user/login" />;
    }

    if (!isReady) {
      return <PageLoading />;
    }

    return children;
  }
}

export default connect(({ login }) => ({
  login,
}))(SecurityLayout);
