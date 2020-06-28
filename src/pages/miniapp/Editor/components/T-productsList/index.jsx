import React, { Fragment } from 'react';
import { connect } from 'dva';
import { getGreeImg } from '../ChooseProductModal/index';
import styles from './index.less';

const ProductsList = props => {
  const { h5Editor, tItem } = props;
  const { itemList } = h5Editor;

  let item = itemList.find(obj => obj.id == tItem.id);

  return (
    <div
      className={styles.wrap}
      style={{
        margin: `${item.marginTop || 0}px ${item.marginLeftRight || 0}px ${item.marginBottom ||
          0}px`,
        padding: `${item.paddingTopBottom || 0}px ${item.paddingLeftRight || 0}px`,
        backgroundColor: item.backgroundColor || null,
        borderRadius: item.borderRadius || 0,
      }}
    >
      {/* 板块标题 */}
      {item.panelTitle ? <div className={styles.panel_title}>-{item.panelTitle}-</div> : null}

      <div className={styles.products_wrap}>
        {// 商品
        item.list.map((obj, index) => (
          <Fragment key={index}>
            {item.lineNum == 1 ? (
              //一行显示
              <div
                key={index}
                className={styles.item_wrap_1}
                style={{
                  margin: `${item.marginTopItem || 0}px 0 ${item.marginBottomItem || 0}px`,
                }}
              >
                <div
                  className={styles.item}
                  style={{
                    margin: `0 ${item.marginLeftRightItem || 0}px 0`,
                    padding: `${item.paddingTopBottomItem || 0}px ${item.paddingLeftRightItem ||
                      0}px`,
                    backgroundColor: item.backgroundColorItem || null,
                    borderRadius: item.borderRadiusItem || 0,
                  }}
                >
                  {/* 图片 */}
                  <div
                    className={styles.img_box}
                    style={{
                      width: item.imgWidth_line1,
                      height: item.imgHeight,
                      marginBottom: item.imgMarginBottom || 0,
                    }}
                  >
                    <img className={styles.img} src={getGreeImg(obj.productPic)} />
                  </div>
                  {/* 内容 */}
                  <div className={styles.content}>
                    {item.showName ? (
                      <div
                        className={`
                            ${styles.name}
                            ${item.textNameLine == 1 ? `${styles.line1}` : ''}
                            ${item.textNameLine == 2 ? `${styles.line2}` : ''}
                          `}
                        style={{
                          color: item.textNameColor || null,
                        }}
                      >
                        {obj.productName}
                      </div>
                    ) : null}
                    <div className={styles.price_wrap}>
                      <div>
                        {item.showPrice ? (
                          <div className={styles.price}>&yen;{obj.price / 100}</div>
                        ) : null}
                      </div>
                      <div>
                        {item.showSaledNum ? (
                          <div className={styles.saledNum}>已售{obj.productTotalSale}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={styles.item_wrap}
                style={{
                  width: (1 / item.lineNum).toFixed(6) * 100 + '%',
                  margin: `${item.marginTopItem || 0}px 0 ${item.marginBottomItem || 0}px`,
                }}
              >
                <div
                  className={styles.item}
                  style={{
                    margin: `0 ${item.marginLeftRightItem || 0}px 0`,
                    padding: `${item.paddingTopBottomItem || 0}px ${item.paddingLeftRightItem ||
                      0}px`,
                    backgroundColor: item.backgroundColorItem || null,
                    borderRadius: item.borderRadiusItem || 0,
                  }}
                >
                  {/* 图片 */}
                  <div
                    className={styles.img_box}
                    style={{
                      width: `calc(100% - ${item.imgMarginLeftRight * 2}px)`,
                      height: item.imgHeight,
                      marginBottom: item.imgMarginBottom || 0,
                    }}
                  >
                    <img className={styles.img} src={getGreeImg(obj.productPic)} />
                  </div>
                  {/* 内容 */}
                  <div className={styles.content}>
                    {item.showName ? (
                      <div
                        className={`
                            ${styles.name}
                            ${item.textNameLine == 1 ? `${styles.line1}` : ''}
                            ${item.textNameLine == 2 ? `${styles.line2}` : ''}
                          `}
                        style={{
                          color: item.textNameColor || null,
                        }}
                      >
                        {obj.productName}
                      </div>
                    ) : null}
                    <div
                      className={styles.price_wrap}
                      style={{
                        justifyContent:
                          item.showPrice && item.showSaledNum ? 'space-between' : 'center',
                      }}
                    >
                      <div>
                        {item.showPrice ? (
                          <div className={styles.price}>&yen;{obj.price / 100}</div>
                        ) : null}
                      </div>
                      <div>
                        {item.showSaledNum ? (
                          <div className={styles.saledNum}>已售{obj.productTotalSale}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(ProductsList);
