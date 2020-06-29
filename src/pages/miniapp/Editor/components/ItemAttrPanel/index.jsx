import React from 'react';
import { connect } from 'dva';
import { getComponentPanel, com_map } from '../components_map';
import styles from './index.less';

const index = props => {
  const { h5Editor } = props;
  const { activeItem, itemList } = h5Editor;

  let panel = null;
  let panel_title = '';
  if (activeItem) {
    let item = itemList.find(obj => obj.id == activeItem.id);
    if (item) {
      let ComPanel = getComponentPanel(activeItem);
      if (ComPanel) {
        panel = <ComPanel />;
      }
    }
    //title
    panel_title = com_map[activeItem.type].title;
  }

  return (
    <div className={styles.attr_wrap}>
      {panel_title ? (
        <div className={styles.attr_wrap_content}>
          {panel_title ? <div className={styles.panel_title}>{panel_title}</div> : null}
          {panel}
        </div>
      ) : null}
    </div>
  );
};

const index2 = connect(({ h5Editor }) => ({
  h5Editor,
}))(index);

export default index2;
