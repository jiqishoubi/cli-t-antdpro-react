/**
 * 给item增加拖拽方法的高姐函数
 */
import React from 'react';
import { CloseCircleFilled, UpCircleFilled, DownCircleFilled } from '@ant-design/icons';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import styles from './index.less';

const ItemWrap = props => {
  const {
    //拖拽
    isDragging,
    connectDropTarget,
    connectDragSource,
    connectDragPreview,
    //组件
    wrappedComponent,
    //其他props
    change,
    find,
    move,
    remove,
    onClick,
    onDelete,
    onDropEnd,
    ...restProps
  } = props;
  const {
    tItem,
    //dva
    dispatch,
    h5Editor,
  } = restProps;
  const { activeItem, itemList } = h5Editor;

  const clickMove = (tItem, type) => {
    const { index: curIndex } = props.find(tItem.id);
    //第一个或者最后一个
    if ((curIndex == 0 && type < 0) || (curIndex == itemList.length - 1 && type > 0)) {
      return;
    }
    let nextIndex = curIndex + type;
    props.move(tItem.id, nextIndex);
  };

  const onClick2 = () => {
    onClick(tItem);
  };

  let Com = wrappedComponent;

  return connectDropTarget(
    // 列表项本身作为 Drop 对象
    connectDragPreview(
      // 整个列表项作为跟随拖动的影像
      connectDragSource(
        <div
          className={`
            ${styles.item_wrap}
            ${activeItem && activeItem.id == tItem.id ? `${styles.active}` : ''}
          `}
          onClick={onClick2}
        >
          <Com {...restProps} />
          {/* 操作 */}
          <div className={styles.ctrl_wrap}>
            <div
              className={styles.ctrl_btn}
              onClick={() => {
                remove(tItem);
              }}
            >
              <CloseCircleFilled style={{ color: '#ff3838' }} />
            </div>
            <div
              className={styles.ctrl_btn}
              onClick={() => {
                clickMove(tItem, -1);
              }}
            >
              <UpCircleFilled style={{ color: '#3857ff' }} />
            </div>
            <div
              className={styles.ctrl_btn}
              onClick={() => {
                clickMove(tItem, 1);
              }}
            >
              <DownCircleFilled style={{ color: '#ffa42c' }} />
            </div>
          </div>
        </div>,
      ),
    ),
  );
};

/**
 * 拖动属性
 */
const type = 'itemList';
const dragSpec = {
  // 拖动开始时，返回描述 source 数据。后续通过 monitor.getItem() 获得
  beginDrag: props => {
    let source = props.find(props.tItem.id);
    return {
      id: source.item.id,
      originalIndex: source.index,
    };
  },
  // 拖动停止时，处理 source 数据
  endDrag: (props, monitor) => {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    // source 是否已经放置在 target
    if (!didDrop) {
      return props.move(droppedId, originalIndex);
    }
    return props.change(droppedId, originalIndex);
  },
};

//注入
const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(), // 用于包装需要拖动的组件
    connectDragPreview: connect.dragPreview(), // 用于包装需要拖动跟随预览的组件
    isDragging: monitor.isDragging(), // 用于判断是否处于拖动状态
  };
};

//移动
const dropSpec = {
  canDrop: () => false, // item 不处理 drop
  hover: (props, monitor) => {
    const { id: draggedId } = monitor.getItem();
    const overId = props.tItem.id;
    // 如果 source item 与 target item 不同，则交换位置并重新排序
    if (draggedId !== overId) {
      const { index: overIndex } = props.find(overId);

      //执行移动
      if (window.t_dragTimer) {
        window.clearTimeout(window.t_dragTimer);
      }
      window.t_dragTimer = setTimeout(() => {
        props.move(draggedId, overIndex);
      }, 300);
    }
  },
};

//注入
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(), // 用于包装需接收拖拽的组件
});

const ItemWrap2 = DropTarget(
  type,
  dropSpec,
  dropCollect,
)(DragSource(type, dragSpec, dragCollect)(ItemWrap));

export default ItemWrap2;
