import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Img = props => {
  const { h5Editor, tItem } = props;
  const { itemList } = h5Editor;

  let item = itemList.find(obj => obj.id == tItem.id);

  return (
    <div className={styles.img_box_wrap}>
      <div
        className={styles.img_box}
        style={{
          margin: `${item.marginTop || 0}px ${item.marginLeftRight || 0}px ${item.marginBottom ||
            0}px`,
          borderRadius: item.borderRadius || 0,
        }}
      >
        <img
          className={styles.img}
          src={item.imgUrl}
          style={{
            height: item.height || 'auto',
          }}
        />
      </div>
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Img);
