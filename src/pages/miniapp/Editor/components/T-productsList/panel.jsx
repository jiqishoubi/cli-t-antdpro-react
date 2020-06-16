import React from 'react';
import { connect } from 'dva';
import { Tabs, Button } from 'antd';
import AttrPanel from './components/AttrPanel';
import PanelStyle from './components/PanelStyle';
import ItemStyle from './components/ItemStyle';
import ImgStyle from './components/ImgStyle';
import TextStyle from './components/TextStyle';
import styles from './index.less';
import styles_com from '../../index.less';

const { TabPane } = Tabs;

const index = props => {
  const { dispatch, h5Editor } = props;
  const { itemList, activeItem } = h5Editor;

  let item = itemList.find(obj => obj.id == activeItem.id);

  return (
    <div className={styles.panel}>
      <Tabs type="card" tabBarStyle={{ marginBottom: 0 }}>
        <TabPane tab="常规" key="1">
          <div className={styles_com.rightPanel}>
            <AttrPanel />
          </div>
        </TabPane>
        <TabPane tab="面板样式" key="2">
          <div className={styles_com.rightPanel}>
            <PanelStyle />
          </div>
        </TabPane>
        <TabPane tab="子元素样式" key="3">
          <div className={styles_com.rightPanel}>
            <ItemStyle />
          </div>
        </TabPane>
        <TabPane tab="图片" key="4">
          <div className={styles_com.rightPanel}>
            <ImgStyle />
          </div>
        </TabPane>
        <TabPane tab="文字" key="5">
          <div className={styles_com.rightPanel}>
            <TextStyle />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
