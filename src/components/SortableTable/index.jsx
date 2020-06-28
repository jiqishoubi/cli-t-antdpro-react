/**
 * props
 * columns
 * items
 * onSortEnd
 */
import React, { Component } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import styles from './index.less';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'move', color: '#999', fontSize: 19, paddingTop: 15 }} />
));

class SortableComponent extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.onSortEnd({ oldIndex, newIndex });
  };

  render() {
    const { columns, items } = this.props;

    const SortableItem = SortableElement(({ value }) => {
      return (
        <div className={styles.row_item}>
          <div className={`${styles.row_item_item} ${styles.move_item}`}>
            <DragHandle />
          </div>
          {columns.map((columnsItem, index) => {
            let dom;
            if (columnsItem.render) {
              let v = columnsItem.dataIndex ? value[columnsItem.dataIndex] : value;
              dom = columnsItem.render(v);
            } else {
              dom = value[columnsItem.dataIndex];
            }
            return (
              <div
                key={index}
                className={styles.row_item_item}
                style={{ width: columnsItem.width || null, textAlign: columnsItem.align || 'left' }}
              >
                {dom}
              </div>
            );
          })}
        </div>
      );
    });

    const SortableList = SortableContainer(({ items }) => {
      return (
        <div>
          {items.map((value, index) => (
            <SortableItem key={index} index={index} value={value} />
          ))}
        </div>
      );
    });

    return (
      <div>
        <div style={{ display: 'inline-block' }}>
          {/* 表头 */}
          <div className={styles.columns_wrap}>
            <div className={`${styles.columns_item} ${styles.move_item}`}>移动</div>
            {columns.map((columnsItem, index) => (
              <div
                key={index}
                className={styles.columns_item}
                style={{ width: columnsItem.width || null, textAlign: columnsItem.align || 'left' }}
              >
                {columnsItem.title}
              </div>
            ))}
          </div>
          {items && items.length > 0 ? (
            <SortableList useDragHandle items={items} onSortEnd={this.onSortEnd} />
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>暂无数据</div>
          )}
        </div>
      </div>
    );
  }
}

export default SortableComponent;
