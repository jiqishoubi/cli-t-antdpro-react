/**
 * props:
 * imgItem
 */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Select, Form, Input, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// import TUpload from '@/components/T-Upload';
import TUpload2 from '@/components/T-Upload2';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const formItemLayoutTail = {
  wrapperCol: { span: 15, offset: 4 },
};

const Index = props => {
  const [formRef] = Form.useForm();
  const { imgItem, tIndex, tLength, h5Editor, dispatch } = props;
  const { itemList, activeItem } = h5Editor;

  let item = itemList.find(obj => obj.id == activeItem.id);

  const init = () => {
    let list = itemList;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.id == activeItem.id) {
        let imgList = item.list;
        //找到它当前的index
        let curIndex = imgList.findIndex(obj => obj.id == imgItem.id);
        formRef.setFieldsValue({
          ...item.list[curIndex],
          imgUrl: item.list[curIndex].imgUrl ? [item.list[curIndex].imgUrl] : [],
        });
        break;
      }
    }
  };

  useEffect(() => {
    init();
  }, [itemList]);

  //排序
  const changeOrder = type => {
    let list = itemList;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.id == activeItem.id) {
        let imgList = item.list;
        //找到它当前的index
        let curIndex = imgList.findIndex(obj => obj.id == imgItem.id);
        //上移
        if (type < 0) {
          imgList.splice(curIndex, 1);
          imgList.splice(curIndex - 1, 0, imgItem);
        }
        //下移
        if (type > 0) {
          let nextItem = imgList[curIndex + 1];
          imgList.splice(curIndex + 1, 1);
          imgList.splice(curIndex, 0, nextItem);
        }
        //移动完成
        dispatch({
          type: 'h5Editor/save',
          payload: {
            itemList: list,
          },
        });
      }
    }
  };

  //删除img
  const deleteImg = () => {
    let list = itemList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == activeItem.id) {
        let imgList = list[i].list;
        //找到它当前的index
        let curIndex = imgList.findIndex(obj => obj.id == imgItem.id);
        imgList.splice(curIndex, 1);
        list[i].list = imgList;
        dispatch({
          type: 'h5Editor/save',
          payload: {
            itemList: [...list],
          },
        });
        break;
      }
    }
  };

  //改变
  const onValuesChange = changedValues => {
    let list = itemList;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (item.id == activeItem.id) {
        let imgList = item.list;
        //找到它当前的index
        let curIndex = imgList.findIndex(obj => obj.id == imgItem.id);
        //改变相关属性
        item.list[curIndex] = {
          ...item.list[curIndex],
          ...changedValues,
        };
        if (changedValues.imgUrl) {
          item.list[curIndex].imgUrl = changedValues.imgUrl[0] ? changedValues.imgUrl[0].url : '';
        }
        //移动完成
        dispatch({
          type: 'h5Editor/save',
          payload: {
            itemList: list,
          },
        });
        break;
      }
    }

    if (window.t_changeTimer) {
      window.clearTimeout(window.t_changeTimer);
    }
    window.t_changeTimer = setTimeout(() => {
      dispatch({
        type: 'h5Editor/save',
        payload: {
          itemList: list,
        },
      });
    }, 50);
  };

  return (
    <div className={styles.imgPanel}>
      <Form form={formRef} {...formItemLayout} onValuesChange={onValuesChange}>
        {/* 图片 */}
        <div>
          <div>
            第<span style={{ fontWeight: 'bold', color: '#000' }}>{tIndex + 1}</span>张图片
          </div>
          <Form.Item label="图片" name="imgUrl" rules={[{ required: true, message: '请上传图片' }]}>
            <TUpload2 length={1} />
          </Form.Item>
        </div>

        {/* 跳转 */}
        <div>
          <div>跳转</div>
          <Form.Item label="跳转类型" name="goType">
            <Select placeholder="请选择跳转类型">
              <Option value="miniapp">小程序页面</Option>
              <Option value="h5">H5页面</Option>
            </Select>
          </Form.Item>
          <Form.Item label="跳转地址" name="goUrl">
            <Input placeholder="请输入跳转地址" />
          </Form.Item>
        </div>
      </Form>

      {item.list.length == 1 ? null : (
        <Form.Item {...formItemLayoutTail} style={{ marginBottom: 0 }}>
          <Button onClick={deleteImg}>删除</Button>
        </Form.Item>
      )}

      {/* 排序按钮 */}
      {tIndex == 0 ? null : (
        <span
          className={styles.order_btn + ' ' + styles.order_btn_up}
          onClick={() => {
            changeOrder(-1);
          }}
        >
          <ArrowUpOutlined />
        </span>
      )}
      {tIndex == tLength - 1 ? null : (
        <span
          className={styles.order_btn + ' ' + styles.order_btn_down}
          onClick={() => {
            changeOrder(1);
          }}
        >
          <ArrowDownOutlined />
        </span>
      )}
    </div>
  );
};

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(Index);
