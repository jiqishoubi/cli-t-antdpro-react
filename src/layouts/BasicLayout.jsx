import React, { useEffect, useRef } from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button, Menu } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import TabsLayout from './TabsLayout';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.png';
import defaultSettings from '../../config/defaultSettings';
import defaultTheme from '../../config/theme/defaultTheme';
import { defaultFooterDom } from './UserLayout';

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
  const isHaveUrlFunc = (menuItem) => {
    let flag = false
    const test = (item) => {
      if (item.path == pathname) {
        flag = true
      }
      if (item.children) {
        item.children.forEach((obj) => {
          test(obj)
        })
      }
    }
    test(menuItem)
    return flag
  }

  let index = menuTree.findIndex((menuItem) => isHaveUrlFunc(menuItem))

  return index
}

const BasicLayout = props => {
  const tabsLayout = useRef();
  const {
    dispatch,
    children,
    location = {
      pathname: '/',
    },
    login,
    collapsed,
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    //监听路由
    if (!window.UNLISTEN) {
      window.UNLISTEN = props.history.listen((location, type) => {
        console.log('监听', location);
        //mix模式 上面的menu active index
        if (defaultSettings.layout == 'mixmenu') {
          let mixMenuActiveIndex = getMixMenuIndex(login.menuTree, location.pathname)
          dispatch({
            type: 'login/saveDB',
            payload: {
              mixMenuActiveIndex: mixMenuActiveIndex + '',
            }
          })
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

  //mix模式 上面的菜单
  const mixMenuRender = () => {
    let menuTree = login.menuTree || []
    let mixMenuActiveIndex = login.mixMenuActiveIndex

    const handleClick = (e) => {
      console.log(e)
      dispatch({
        type: 'login/saveDB',
        payload: {
          mixMenuActiveIndex: e.key
        }
      })
      // //跳转
      if (menuTree[mixMenuActiveIndex] && !menuTree[mixMenuActiveIndex].children && menuTree[mixMenuActiveIndex].menuUrl) {
        router.push(menuTree[mixMenuActiveIndex].menuUrl)
      }
    }

    return (
      <Menu
        onClick={handleClick}
        selectedKeys={[(mixMenuActiveIndex + '')]}
        mode="horizontal"
      >
        {menuTree.map((obj, index) => {
          return (
            <Menu.Item key={index + ''}>
              {obj.menuName}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
  // 2020.07.23新增动态icon的方法
  const menuDataRender = () => {
    let menuTree = JSON.parse(JSON.stringify(login.menuTree || []))
    let arrTemp

    if (defaultSettings.layout == 'mixmenu') {
      let mixMenuActiveIndex = login.mixMenuActiveIndex
      arrTemp = (menuTree[mixMenuActiveIndex] && menuTree[mixMenuActiveIndex].children) || []
    } else {
      arrTemp = menuTree
    }

    const loopDealMenuItemIcon = (arr) => {
      if (arr && arr.length > 0) {
        arr.forEach((obj) => {
          //加icon的判断
          if (obj.parentId == 0) {
            obj.icon = <GithubOutlined /> //这里可以改成一个icon的映射函数
          }
          loopDealMenuItemIcon(obj.children)
        });
      }
    }

    //处理icon
    loopDealMenuItemIcon(arrTemp)
    return arrTemp;
  };

  return (
    <ProLayout
      logo={() => <img style={{ width: 50, height: 'auto', marginLeft: 10 }} src={logo} />}
      menuHeaderRender={(logoDom, titleDom) => {
        return (
          <div style={{ height: '100%' }}>
            {collapsed && defaultSettings.layout !== 'mixmenu' ? null :
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center'
              }}>
                {logoDom}{titleDom}
              </div>}
          </div>
        )
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
      // collapsedButtonRender={(e)=>{
      //   return <span>1</span>
      // }}
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
