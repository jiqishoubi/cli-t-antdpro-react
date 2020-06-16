/**
 * props:
 * imgItem
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Select, Form, Input, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import TUpload from '@/components/T-Upload';
import { onValuesChange } from '../../../../utils_editor';
import styles from './index.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};

const formItemLayoutTail = {
  wrapperCol: { span: 15, offset: 4 },
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true, //form的initialValue不动态更新，利用visible重新挂载组件
    };
  }

  componentDidMount() {}

  //排序
  changeOrder = type => {
    this.setState({ visible: false }, () => {
      const { dispatch, imgItem, h5Editor } = this.props;
      const { itemList, activeItem } = h5Editor;

      let list = itemList;
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.id == activeItem.id) {
          let imgList = item.list;
          //找到它当前的index
          let curIndex = imgList.findIndex(obj => obj.id == imgItem.id);
          //上移
          if (type < 0) {
            console.log('上移');
            imgList.splice(curIndex, 1);
            imgList.splice(curIndex - 1, 0, imgItem);
          }
          //下移
          if (type > 0) {
            console.log('下移');
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
          break;
        }
      }
      this.setState({ visible: true });
    });
  };

  //删除img
  deleteImg = () => {
    this.setState({ visible: false }, () => {
      const { dispatch, imgItem, h5Editor } = this.props;
      const { itemList, activeItem } = h5Editor;

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
      this.setState({ visible: true });
    });
  };

  imgUrlChange = url => {
    console.log(url);
  };

  render() {
    const { visible } = this.state;
    const { h5Editor, imgItem, form, tIndex, tLength, dispatch } = this.props;
    const { itemList, activeItem } = h5Editor;

    let item = itemList.find(obj => obj.id == activeItem.id);

    return (
      <Fragment>
        {visible ? (
          <div
            className={styles.imgPanel}
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
            <Form {...formItemLayout}>
              {/* 图片 */}
              <div>
                <div>
                  第 <span style={{ fontWeight: 'bold', color: '#000' }}>{tIndex + 1}</span> 张图片
                </div>
                <Form.Item
                  label="背景图片"
                  name="imgUrl"
                  rules={[{ required: true, message: '请上传图片' }]}
                >
                  <TUpload onUploadChange={this.imgUrlChange} />
                </Form.Item>
                <Form.Item label="标题" name="title" initialValue={imgItem.title || ''}>
                  <Input placeholder="请输入标题" />
                </Form.Item>
                <Form.Item label="描述" name="desc" initialValue={imgItem.desc || ''}>
                  <Input placeholder="请输入标题" />
                </Form.Item>
              </div>

              {/* 跳转 */}
              <div>
                <div>跳转</div>
                <Form.Item label="跳转类型" name="type">
                  <Select placeholder="请选择跳转类型">
                    <Option value="miniapp">小程序页面</Option>
                    <Option value="h5">H5页面</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="跳转地址" name="url">
                  <Input placeholder="请输入跳转地址" />
                </Form.Item>
              </div>
            </Form>

            {item.list.length == 1 ? null : (
              <Form.Item {...formItemLayoutTail} style={{ marginBottom: 0 }}>
                <Button onClick={this.deleteImg}>删除</Button>
              </Form.Item>
            )}

            {/* 排序按钮 */}
            {tIndex == 0 ? null : (
              <span
                className={styles.order_btn + ' ' + styles.order_btn_up}
                onClick={() => {
                  this.changeOrder(-1);
                }}
              >
                <ArrowUpOutlined />
              </span>
            )}
            {tIndex == tLength - 1 ? null : (
              <span
                className={styles.order_btn + ' ' + styles.order_btn_down}
                onClick={() => {
                  this.changeOrder(1);
                }}
              >
                <ArrowDownOutlined />
              </span>
            )}
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default connect(({ h5Editor }) => ({
  h5Editor,
}))(index);
