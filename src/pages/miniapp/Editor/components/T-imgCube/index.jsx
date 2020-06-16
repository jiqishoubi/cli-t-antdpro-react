import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const ImgCube = props => {
  const { h5Editor, tItem } = props;
  const { itemList } = h5Editor;

  let item = itemList.find(obj => obj.id == tItem.id);

  return (
    <div
      className={styles.cube_wrap}
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
          }}
        >
          <div
            className={styles.img_box}
            style={{
              margin: `0px ${item.marginLeftRightItem || 0}px`,
              borderRadius: item.borderRadiusItem || 0,
            }}
          >
            <img
              className={styles.img}
              src={obj.imgUrl}
              style={{
                height: item.imgHeight || 'auto',
              }}
            />
          </div>
          {item.haveTitle ? (
            <div
              style={{
                fontSize: item.titleFontSize || null,
              }}
            >
              {obj.title}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(ImgCube);
