import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import defaultTheme from '../../../config/theme/defaultTheme';
import { mConfirm } from '@/utils/utils';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;
    const { dispatch } = this.props;

    switch (key) {
      case 'logout':
        mConfirm('确认注销？', () => {
          return dispatch({
            type: 'login/logout',
          });
        });
        break;
    }
  };

  /**
   * 渲染
   */
  render() {
    const { menu, login } = this.props;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            className={styles.avatar}
            size="small"
            src={''}
            alt="avatar"
            style={{ backgroundColor: defaultTheme['primary-color'] }}
          />
          <span className={styles.name}>{'test'}</span>
        </span>
      </HeaderDropdown>
    );
  }
}

export default connect(({ login }) => ({
  login,
}))(AvatarDropdown);
