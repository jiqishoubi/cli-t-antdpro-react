import { Tag } from 'antd';
import React from 'react';
import AvatarDropdown from './AvatarDropdown';
import defaulTheme from '../../../config/theme/defaultTheme';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = props => {
  let className = styles.right;

  if (defaulTheme.navTheme === 'dark' && defaulThemelayout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <AvatarDropdown />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </div>
  );
};

export default GlobalHeaderRight;
