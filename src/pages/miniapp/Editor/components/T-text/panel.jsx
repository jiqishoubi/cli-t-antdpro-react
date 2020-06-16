import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import AttrPanel from './components/AttrPanel';
import StylePanel from './components/StylePanel';
import styles from './index.less';
import styles_com from '../../index.less';

const { TabPane } = Tabs;

const index = props => {
  const { h5Editor } = props;

  return (
    <div className={styles.panel}>
      <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
        <TabPane tab="常规" key="1">
          <div className={styles_com.rightPanel}>
            <AttrPanel />
          </div>
        </TabPane>
        <TabPane tab="样式" key="2">
          <div className={styles_com.rightPanel}>
            <StylePanel />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
