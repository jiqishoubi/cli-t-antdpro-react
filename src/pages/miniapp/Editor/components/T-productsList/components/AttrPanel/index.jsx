import React, { useRef } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Radio, Button } from 'antd';
import ChooseProductModal, { getGreeImg } from '../../../ChooseProductModal/index';
import SortableTable from '@/components/SortableTable';
import { onValuesChange } from '../../../../utils_editor';
// import arrayMove from 'array-move';
import styles from './index.less';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const Index = props => {
  const chooseProductModalRef = useRef();
  const { h5Editor, dispatch } = props;
  const { itemList, activeItem } = h5Editor;

  let itemIndex = itemList.findIndex(obj => obj.id == activeItem.id);
  let item = itemList[itemIndex];

  const openProductModal = () => {
    if (chooseProductModalRef && chooseProductModalRef.current) {
      chooseProductModalRef.current.open();
    }
  };

  //添加商品
  const getSelectProduct = record => {
    let newItem = JSON.parse(JSON.stringify(item));
    newItem.list.push(record);
    let list = itemList;
    list[itemIndex] = newItem;
    dispatch({
      type: 'h5Editor/save',
      payload: {
        itemList: list,
      },
    });
  };

  //拖拽表格

  const columns = [
    {
      title: '商品图片',
      width: 350,
      render: record => {
        let pic = getGreeImg(record.productPic);
        return (
          <div className={styles.product_item}>
            <div className={styles.product_img_wrap}>
              <img className={styles.product_img} src={pic} />
              <div>{record.productName}</div>
            </div>
          </div>
        );
      },
    },
    { align: 'center', title: '分类', dataIndex: 'typeName', width: 150 },
    { align: 'center', title: '销量', dataIndex: 'productTotalSale', width: 150 },
    { align: 'center', title: '库存', dataIndex: 'stockNumber', width: 150 },
    { align: 'center', title: '状态', dataIndex: 'productStatus', width: 150 },
  ];
  // const renderItem = (record) => {
  //   let pic = getGreeImg(record.productPic);
  //   return (
  //     <div className={styles.product_item}>
  //       <div className={styles.product_img_wrap}>
  //         <img className={styles.product_img} src={pic} />
  //         <div>{record.productName}</div>
  //       </div>
  //       <div>{record.typeName}</div>
  //       <div>{record.productTotalSale}</div>
  //       <div>{record.stockNumber}</div>
  //       <div>{record.productStatus == '0' ? '下架' : '上架'}</div>
  //     </div>
  //   )
  // }
  // const onSortEnd = ({ oldIndex, newIndex }) => {
  //   // console.log(oldIndex, newIndex)
  // }
  const onSortEnd = () => {};

  return (
    <div>
      <Form
        {...formItemLayout}
        style={{ paddingTop: 10 }}
        onValuesChange={(changedValues, allValues) => {
          onValuesChange({
            changedValues,
            allValues,
            itemList,
            activeItem,
            dispatch,
          });
        }}
      >
        <Form.Item label="板块标题" name="panelTitle" initialValue={item.panelTitle}>
          <Input placeholder="请输入板块标题" />
        </Form.Item>
        <Form.Item label="一行数量" name="lineNum" initialValue={item.lineNum}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="显示名称" name="showName" initialValue={item.showName}>
          <Radio.Group>
            <Radio value={true}>显示</Radio>
            <Radio value={false}>不显示</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="显示价格" name="showPrice" initialValue={item.showPrice}>
          <Radio.Group>
            <Radio value={true}>显示</Radio>
            <Radio value={false}>不显示</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="显示已售" name="showSaledNum" initialValue={item.showSaledNum}>
          <Radio.Group>
            <Radio value={true}>显示</Radio>
            <Radio value={false}>不显示</Radio>
          </Radio.Group>
        </Form.Item>

        {/* 商品列表 */}
        <div>商品列表</div>
        <div style={{ marginLeft: 30 }}>
          <Button type="primary" onClick={openProductModal}>
            添加商品
          </Button>

          <SortableTable
            columns={columns}
            items={(item && item.list) || []}
            onSortEnd={onSortEnd}
          />
        </div>
      </Form>

      <ChooseProductModal
        onRef={e => {
          chooseProductModalRef.current = e;
        }}
        callback={getSelectProduct}
      />
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Index);
