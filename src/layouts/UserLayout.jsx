import React from 'react';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import { connect } from 'dva';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';

export const defaultFooterDom = <DefaultFooter copyright="2020 便利电科技出品" links={[]} />;

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>BLD</span>
              </Link>
            </div>
            <div className={styles.desc}>desc</div>
          </div>
          {children}
        </div>
        {defaultFooterDom}
      </div>
    </>
  );
};

export default UserLayout;
