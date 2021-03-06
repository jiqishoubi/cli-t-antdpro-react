import React from 'react';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import logo from '../assets/logo.png';
import defaultSettings from '../../config/defaultSettings'
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
    // pathname: location.pathname,
    breadcrumb,
    ...props,
    title: defaultSettings.title
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
              <span>
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>BLD</span>
              </span>
            </div>
            <div className={styles.desc}>desc</div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default UserLayout;
