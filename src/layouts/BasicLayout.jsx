import React, { useEffect, useRef } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { GithubOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Result, Button, Menu } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import TabsLayout from './TabsLayout';
// import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.png';
import defaultSettings from '../../config/defaultSettings';
import defaultTheme from '../../config/theme/defaultTheme';
import { defaultFooterDom } from './UserLayout';
import { findFirstMenuUrl2 } from '@/utils/login';
import './BasicLayout_localName.less';

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
        <Link to="/user/login">返回首页</Link>
      </Button>
    }
  />
);

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

const collapsedButtonStyle = {
  color: 'rgba(255,255,255,0.65)',
  fontSize: 23,
  cursor: 'pointer',
};

const BasicLayout = props => {
  const tabsLayout = useRef();
  const {
    dispatch,
    children,
    // location = {
    //   pathname: '/',
    // },
    login,
    collapsed,
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    //监听路由
    if (!window.UNLISTEN) {
      window.UNLISTEN = props.history.listen(location => {
        //mix模式 上面的menu active index
        if (defaultSettings.layout == 'mixmenu') {
          let mixMenuActiveIndex = getMixMenuIndex(login.menuTree, location.pathname);
          dispatch({
            type: 'login/saveDB',
            payload: {
              mixMenuActiveIndex: mixMenuActiveIndex + '',
            },
          });
        }

        //多tab 增减tab
        if (defaultSettings.isTabs) {
          if (tabsLayout && tabsLayout.current) {
            tabsLayout.current.addCutTab(location.pathname);
          }
        }
      });
    }
    //卸载监听路由
    return () => {
      if (window.UNLISTEN) {
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

  //mix模式 上面的菜单
  const mixMenuRender = () => {
    let menuTree = login.menuTree || [];
    let mixMenuActiveIndex = login.mixMenuActiveIndex;

    //点击方法
    const handleClick = e => {
      let mixMenuActiveIndex2 = e.key;
      // //跳转
      if (
        menuTree[mixMenuActiveIndex2] &&
        !menuTree[mixMenuActiveIndex2].children &&
        menuTree[mixMenuActiveIndex2].menuUrl
      ) {
        router.push(menuTree[mixMenuActiveIndex2].menuUrl);
      } else if (defaultSettings.mixNeedJump && mixMenuActiveIndex !== mixMenuActiveIndex2) {
        //如果mix模式 需要跳转就跳转
        let firstUrl = findFirstMenuUrl2({
          arr: menuTree[mixMenuActiveIndex2].children,
          urlKey: 'menuUrl',
        });
        router.push(firstUrl);
      }

      dispatch({
        type: 'login/saveDB',
        payload: {
          mixMenuActiveIndex,
        },
      });
    };

    return (
      <Menu onClick={handleClick} selectedKeys={[mixMenuActiveIndex + '']} mode="horizontal">
        {menuTree.map((obj, index) => {
          return <Menu.Item key={index + ''}>{obj.menuName}</Menu.Item>;
        })}
      </Menu>
    );
  };
  // 2020.07.23新增动态icon的方法
  const menuDataRender = () => {
    let menuTree = JSON.parse(JSON.stringify(login.menuTree || []));
    let arrTemp;

    if (defaultSettings.layout == 'mixmenu') {
      let mixMenuActiveIndex = login.mixMenuActiveIndex;
      arrTemp = (menuTree[mixMenuActiveIndex] && menuTree[mixMenuActiveIndex].children) || [];
    } else {
      arrTemp = menuTree;
    }

    const loopDealMenuItemIcon = arr => {
      if (arr && arr.length > 0) {
        arr.forEach(obj => {
          //加icon的判断
          if (obj.parentId == 0) {
            obj.icon = <GithubOutlined />; //这里可以改成一个icon的映射函数
          }
          loopDealMenuItemIcon(obj.children);
        });
      }
    };

    //处理icon
    loopDealMenuItemIcon(arrTemp);
    return arrTemp;
  };

  return (
    <ProLayout
      logo={() => <img style={{ width: 50, height: 'auto', marginLeft: 10 }} src={logo} />}
      menuHeaderRender={(logoDom, titleDom) => {
        return (
          <div style={{ height: '100%' }}>
            {collapsed && defaultSettings.layout !== 'mixmenu' ? null : (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {logoDom}
                {titleDom}
              </div>
            )}
          </div>
        );
      }}
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
      {...defaultSettings}
      /**
       * 自定义
       */
      siderWidth={siderWidth}
      collapsedButtonRender={
        defaultSettings.layout == 'mixmenu'
          ? collapsed => {
              return collapsed ? (
                <MenuUnfoldOutlined style={{ ...collapsedButtonStyle, fontSize: 15 }} />
              ) : (
                <MenuFoldOutlined style={collapsedButtonStyle} />
              );
            }
          : undefined
      }
      mixMenuRender={mixMenuRender}
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

export default connect(({ global, login }) => ({
  collapsed: global.collapsed,
  login,
}))(BasicLayout);
