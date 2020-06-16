import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Img = props => {
  const { h5Editor, tItem } = props;
  const { itemList } = h5Editor;

  let item = itemList.find(obj => obj.id == tItem.id);

  return (
    <div
      className={styles.text_box}
      style={{
        height: item.height || null,
        fontSize: item.fontSize || null,
        color: item.color || null,
        fontWeight: item.fontWeight || null,
        justifyContent: item.justifyContent || null,
        backgroundColor: item.backgroundColor || null,
      }}
    >
      {item.content}
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Img);
