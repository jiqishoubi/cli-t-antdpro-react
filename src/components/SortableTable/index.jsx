/**
 * props
 * columns
 * items
 * onSortEnd
 */
import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import styles from './index.less';

class SortableComponent extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.onSortEnd({ oldIndex, newIndex });
  };

  render() {
    const { columns, items } = this.props;

    const SortableItem = SortableElement(({ value }) => {
      return (
        <div className={styles.row_item}>
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
            <SortableItem key={`item-${value}`} index={index} value={value} />
          ))}
        </div>
      );
    });

    return (
      <div>
        {/* 表头 */}
        <div className={styles.columns_wrap}>
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
          <SortableList items={items} onSortEnd={this.onSortEnd} />
        ) : (
          <div style={{ textAlign: 'center' }}>暂无数据</div>
        )}
      </div>
    );
  }
}

export default SortableComponent;
