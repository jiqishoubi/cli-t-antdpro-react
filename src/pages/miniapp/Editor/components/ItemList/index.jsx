import React from 'react';
import { connect } from 'dva';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { getComponent } from '../components_map';
import TCard from '../T-card';
import ItemWrap from '../ItemWrap';
import styles from './index.less';

const List = props => {
  let {
    connectDropTarget,
    //dva
    dispatch,
    h5Editor,
  } = props;
  const { itemList } = h5Editor;

  //根据id返回一个source对象
  const find = id => {
    let item;
    let index;
    for (let i = 0; i < itemList.length; i++) {
      let obj = itemList[i];
      if (obj.id == id) {
        item = obj;
        index = i;
        break;
      }
    }
    return {
      item,
      index,
    };
  };

  const move = (id, toIndex) => {
    const { item, index } = find(id);
    itemList.splice(index, 1);
    itemList.splice(toIndex, 0, item);
    dispatch({
      type: 'h5Editor/save',
      payload: {
        itemList: [...itemList],
      },
    });
  };

  const change = (id, fromIndex) => {
    const { index: toIndex } = find(id);
    props.onDropEnd(itemList, fromIndex, toIndex);
  };

  const remove = tItem => {
    const newList = itemList.filter(it => it.id !== tItem.id);
    props.onDelete(newList);
  };

  const onClick = tItem => {
    props.onClick(tItem);
  };

  return connectDropTarget(
    <div className={styles.panel}>
      <div className={styles.header}>名片夹</div>

      {/* 内容 */}
      <div className={styles.content}>
        {/* 名片 */}
        {h5Editor.h5Type == 'card' ? <TCard /> : null}

        <div
          style={{
            marginTop: h5Editor.h5Type == 'card' ? -80 : null,
            minHeight: 439,
          }}
        >
          {h5Editor.itemList.map((obj, index) => {
            let Com = getComponent(obj);
            return (
              <ItemWrap
                key={index}
                wrappedComponent={Com}
                tItem={obj}
                {...props}
                //一些方法
                find={find}
                move={move}
                change={change}
                remove={remove}
                onClick={onClick}
              />
            );
          })}
        </div>
      </div>
      {/* 内容 end */}

      <div className={styles.tab_wrap}>
        <div>首页</div>
        <div>商城</div>
        <div>我的</div>
      </div>
    </div>,
  );
};

/**
 * connect
 */
const List2 = connect(({ h5Editor }) => ({
  h5Editor,
}))(List);

/**
 * 拖拽
 */
const type = 'itemList';
const List3 = DropTarget(type, {}, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(List2);

// 将 HTMLBackend 作为参数传给 DragDropContext
const List4 = DragDropContext(HTML5Backend)(List3);

export default List4;
