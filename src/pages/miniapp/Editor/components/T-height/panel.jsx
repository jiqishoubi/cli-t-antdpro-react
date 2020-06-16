import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import StylePanel from './components/StylePanel';
import styles_com from '../../index.less';

const { TabPane } = Tabs;

const index = props => {
  const { h5Editor, dispatch } = props;

  return (
    <div>
      <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
        <TabPane tab="常规" key="1">
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
