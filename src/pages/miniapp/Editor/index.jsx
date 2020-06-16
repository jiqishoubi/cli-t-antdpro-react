import React from 'react';
import { connect } from 'dva';
import { Row } from 'antd';
import ComponentsList from './components/ComponentsList';
import ItemList from './components/ItemList';
import ItemAttrPanel from './components/ItemAttrPanel';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import styles from './index.less';

const index = props => {
  const {
    //dva
    dispatch,
    h5Editor,
  } = props;
  const { activeItem } = h5Editor;

  const onDropEnd = (list, fromIndex, toIndex) => {
    dispatch({
      type: 'h5Editor/save',
      payload: {
        itemList: [...list],
      },
    });
  };

  const onDelete = list => {
    dispatch({
      type: 'h5Editor/save',
      payload: {
        itemList: [...list],
      },
    });
  };

  const onClick = tItem => {
    if (tItem.id !== (activeItem && activeItem.id ? activeItem.id : '')) {
      dispatch({
        type: 'h5Editor/save',
        payload: {
          activeItem: JSON.parse(JSON.stringify(tItem)),
        },
      });
    }
  };

  return (
    <div className={styles.editor}>
      <Row className={styles.header} align="middle" justify="end">
        <GlobalHeaderRight />
      </Row>

      {/* 左侧组件列表 */}
      <ComponentsList />
      {/* 中间展示面板 */}
      <ItemList onDropEnd={onDropEnd} onDelete={onDelete} onClick={onClick} />
      {/* 右侧属性面板 */}
      <ItemAttrPanel />
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
