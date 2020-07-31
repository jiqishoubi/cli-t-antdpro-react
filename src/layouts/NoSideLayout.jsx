/**
 * 这种无侧边栏的情况 应该只有mix模式存在
 */
import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
// import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.png';
import defaultSettings from '../../config/defaultSettings';
import { defaultFooterDom } from './UserLayout';
import { noMatch, siderWidth, mixMenuRenderFunc } from './BasicLayout';
import styles_tab from './TabsLayout.less';

const NoSideLayout = props => {
  const { dispatch, children, login, collapsed } = props;

  //mix模式 上面的菜单
  const mixMenuRender = () => {
    return mixMenuRenderFunc(dispatch, login);
  };

  const menuDataRender = () => [];

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
      menuItemRender={() => null}
      breadcrumbRender={() => []}
      footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...defaultSettings}
      /**
       * 自定义
       */
      siderWidth={siderWidth}
      mixMenuRender={mixMenuRender}
    >
      <Authorized noMatch={noMatch}>
        <div className={styles_tab.paneCard}>{children}</div>
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ login }) => ({
  login,
}))(NoSideLayout);
