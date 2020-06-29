import React from 'react';
import { Row } from 'antd';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import styles from './NoSideLayout.less';
import './NoSideLayout_localName.less';

const NoSideLayout = props => {
  const { children } = props;

  return (
    <div id="nosidelayout_container_id">
      <Row className={styles.header} align="middle" justify="end">
        <div className={styles.left_content}></div>
        <GlobalHeaderRight />
      </Row>

      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default NoSideLayout;
