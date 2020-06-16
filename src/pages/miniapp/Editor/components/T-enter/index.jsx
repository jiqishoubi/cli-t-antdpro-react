import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Enter = props => {
  const { h5Editor, tItem } = props;
  const { itemList } = h5Editor;

  let item = itemList.find(obj => obj.id == tItem.id);

  return (
    <div
      className={styles.enter_wrap}
      style={{
        margin: `${item.marginTopBottom || 0}px ${item.marginLeftRight || 0}px`,
        padding: `${item.paddingTopBottom || 0}px ${item.paddingLeftRight || 0}px`,
        backgroundColor: item.backgroundColor || null,
        borderRadius: item.borderRadius || 0,
      }}
    >
      {item.list.map((obj, index) => (
        <div
          key={index}
          className={styles.item}
          style={{
            width: (1 / item.lineNum).toFixed(6) * 100 + '%',
            margin: `${item.marginTopBottomItem || 0}px 0px`,
            borderRadius: item.borderRadiusItem || 0,
          }}
        >
          <div
            className={styles.img_box}
            style={{
              height: item.itemHeight,
              margin: `0px ${item.marginLeftRightItem || 0}px`,
              // padding: `${item.paddingTopBottomItem || 0}px ${item.paddingLeftRightItem || 0}px`,
              padding: `10px 0 0 10px`,
              backgroundImage: obj.imgUrl ? 'url(' + obj.imgUrl + ')' : null,
            }}
          >
            <div className={styles.title}>{obj.title}</div>
            <div className={styles.desc}>{obj.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Enter);
