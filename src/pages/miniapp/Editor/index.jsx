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

const index = () => {
  const goBack = () => {
    mConfirm('确认放弃当前操作，返回页面？', () => {
      router.goBack();
    });
  };

  const save = () => {
    mConfirm('确认保存？', () => {
      // const h5Editor = props.h5Editor
      // const itemList = h5Editor.itemList
      // console.log(JSON.stringify(itemList))
    });
  };

  return (
    <div className={styles.editor} id="sass_editor_container_id">
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
      <ItemList />

      {/* 右侧属性面板 */}
      <ItemAttrPanel />
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
