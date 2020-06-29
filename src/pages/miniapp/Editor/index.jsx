import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Button } from 'antd';
import ComponentsList from './components/ComponentsList';
import ItemList from './components/ItemList';
import ItemAttrPanel from './components/ItemAttrPanel';
import GlobalHeaderRight from '@/components/GlobalHeader/RightContent';
import { mConfirm } from '@/utils/utils';
import styles from './index.less';
import './index_localName.less';

const index = props => {
  const {
    //dva
    dispatch,
    h5Editor,
  } = props;
  const { activeItem } = h5Editor;

  const goBack = () => {
    mConfirm('确认放弃当前操作，返回页面？', () => {
      router.goBack();
    });
  };

  const save = () => {
    mConfirm('确认保存？', () => {
      router.goBack();
    });
  };

  //拖拽 点击
  const onDropEnd = (
    list,
    // fromIndex, toIndex
  ) => {
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
    <div className={styles.editor} id="sass_editor_header_wrap">
      <Row className={styles.header} align="middle" justify="end">
        <div className={styles.left_content}>
          <Button className={`${styles.btn} ${styles.btn_cancel}`} onClick={goBack}>
            返回
          </Button>
          <Button className={`${styles.btn} ${styles.btn_save}`} type="primary" onClick={save}>
            保存
          </Button>
        </div>
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
