import React, { useEffect, useRef } from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Link } from 'umi';
import { connect } from 'dva';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import TabsLayout from './TabsLayout';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.png';
import defaultSettings from '../../config/defaultSettings';
import defaultTheme from '../../config/theme/defaultTheme';

const siderWidth = defaultTheme['t-siderMenu-width']
  ? Number(defaultTheme['t-siderMenu-width'].split('px')[0])
  : 0;

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

const defaultFooterDom = <DefaultFooter copyright="2020 便利电科技出品" links={[]} />;

const BasicLayout = props => {
  const tabsLayout = useRef();
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
    login,
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }

    //监听路由
    if (defaultSettings.isTabs) {
      if (!window.UNLISTEN) {
        window.UNLISTEN = props.history.listen((location, type) => {
          console.log('监听', location);
          if (tabsLayout && tabsLayout.current) {
            tabsLayout.current.addCutTab(location.pathname);
          }
        });
      }
    }
    //卸载监听路由
    return () => {
      if (window.UNLISTEN) {
        console.log('卸载');
        window.UNLISTEN();
        window.UNLISTEN = null;
      }
    };
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  // const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
  //   authority: undefined,
  // };

  const menuDataRender = () => {
    let arr = login.menuTree || [];
    return arr;
  };

  return (
    <ProLayout
      logo={logo}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          {titleDom}
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
      /**
       * 自定义
       */
      siderWidth={siderWidth}
    >
      <Authorized
        // authority={authorized!.authority}
        noMatch={noMatch}
      >
        {defaultSettings.isTabs ? (
          <TabsLayout
            onRef={e => {
              tabsLayout.current = e;
            }}
            {...props}
          />
        ) : (
          children
        )}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings, login }) => ({
  collapsed: global.collapsed,
  settings,
  login,
}))(BasicLayout);
