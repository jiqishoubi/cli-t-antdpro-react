import React from 'react';
import { connect } from 'dva';
import { Popover } from 'antd';
import { com_map } from '../components_map';
import { itemListScrollBottom } from '../../utils_editor';
import styles from './index.less';

const index = props => {
  const { dispatch, h5Editor } = props;
  const { itemList } = h5Editor;

  const addItem = obj => {
    let item = obj.createItem();
    let list = itemList;
    list.push(item);
    dispatch({
      type: 'h5Editor/save',
      payload: {
        itemList: [...list],
        activeItem: item,
      },
    });

    //滚动到底部
    itemListScrollBottom();
  };

  let arr = [];
  for (let key in com_map) {
    let obj = com_map[key];
    let dom = (
      <Popover key={key} placement="right" content={<span>{obj.title}</span>}>
        <div
          className={styles.comItem}
          onClick={() => {
            addItem(obj);
          }}
        >
          {obj.icon}
        </div>
      </Popover>
    );
    arr.push(dom);
  }

  return <div className={styles.comList}>{arr.map(dom => dom)}</div>;
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
