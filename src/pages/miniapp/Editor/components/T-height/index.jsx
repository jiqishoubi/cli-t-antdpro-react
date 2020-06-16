import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Height = props => {
  const { h5Editor, tItem } = props;
  const { itemList } = h5Editor;

  let item = itemList.find(obj => obj.id == tItem.id);

  return (
    <div
      className={styles.box}
      style={{
        height: item.height || 0,
        margin: `0 ${item.marginLeftRight || 0}px`,
      }}
    >
      {item.haveLine ? <div className={styles.border}></div> : null}
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Height);
