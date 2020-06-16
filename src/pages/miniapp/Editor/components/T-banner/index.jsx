import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Banner = props => {
  const { h5Editor, tItem } = props;
  const { itemList } = h5Editor;

  let item = itemList.find(obj => obj.id == tItem.id);

  return (
    <div
      className={styles.banner_wrap}
      style={{
        marginTop: item.marginTop || 0,
        marginBottom: item.marginBottom || 0,
        height: item.height || 'auto',
        borderTop: item.borderTop ? '1px solid #eee' : null,
        borderBottom: item.borderBottom ? '1px solid #eee' : null,
      }}
    >
      {item && item.list ? (
        <div
          className={styles.img_box}
          style={{
            margin: `0 ${item.marginLeftRight || 0}px`,
            borderRadius: item.borderRadius || 0,
          }}
        >
          <img className={styles.img} src={item.list[0].imgUrl} />
        </div>
      ) : null}
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Banner);
