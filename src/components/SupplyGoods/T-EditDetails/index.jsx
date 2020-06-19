import React, { Component, Fragment } from 'react';
import { Input, Button, Row } from 'antd';
import TUpload3 from '@/components/T-Upload3';
import styles from './index.less';

const { TextArea } = Input;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      groupList: [],
    };
  }
  /**
   * 周期
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      console.log(typeof nextProps.value);
      let list;
      if (typeof nextProps.value == 'string') {
        list = JSON.parse(nextProps.value);
      } else {
        list = nextProps.value;
        console.log(list);
      }

      if (list.length > 0) {
        this.setState({
          visible: true,
          groupList: list,
        });
      }
    }
  }
  /**
   * 方法
   */
  toggleShow = () => {
    this.setState({ visible: !this.state.visible });
  };
  //添加组件
  addSubGroup = type => {
    //1文字 2图片 3分割线
    const { groupList } = this.state;
    if (type == 1) {
      let obj = {
        type: 1,
        value: '',
      };
      groupList.push(obj);
      this.setState({ groupList });
    }
  };
  //文字
  textChange = (index, e) => {
    const { groupList } = this.state;
    let value = e.target.value;
    groupList[index].value = value;
    this.setState({ groupList }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.dealList());
      }
    });
  };
  //图片
  imgUploadCallback = url => {
    const { groupList } = this.state;
    let obj = {
      type: 2,
      value: url,
    };
    groupList.push(obj);
    this.setState({ groupList }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.dealList());
      }
    });
  };
  deleteItem = index => {
    const { groupList } = this.state;
    console.log(groupList);

    groupList.splice(index, 1);
    this.setState({ groupList }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.dealList());
      }
    });
  };
  //处理当前的list
  dealList = () => {
    const { groupList } = this.state;
    console.log(groupList);
    let list = [];
    groupList.forEach(obj => {
      console.log(obj);

      if (obj.value) {
        list.push(obj);
      }
    });
    return list;
  };

  /**
   * 渲染
   */
  render() {
    const { visible, groupList } = this.state;
    return (
      <Fragment>
        <div className={styles.title}>
          <a onClick={this.toggleShow}>点击设置</a>
        </div>
        <div className={styles.wrap} style={{ display: visible ? 'block' : 'none' }}>
          <div className={styles.content}>
            <div className={styles.container}>
              {groupList.map((obj, index) => {
                let dom = '';
                if (obj.type == 1) {
                  //文字
                  dom = (
                    <TextArea
                      placeholder="请输入..."
                      value={obj.value}
                      onChange={e => {
                        this.textChange(index, e);
                      }}
                    />
                  );
                } else if (obj.type == 2) {
                  //图片
                  dom = <img style={{ width: '100%', height: 'auto' }} src={obj.value} />;
                }
                return (
                  <div key={index}>
                    {dom}
                    <div style={{ textAlign: 'right' }}>
                      <a
                        onClick={() => {
                          this.deleteItem(index);
                        }}
                      >
                        删除
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 控制 组件 */}
            <div className={styles.subgroup_wrap}>
              <div style={{ padding: '0 0 5px 5px' }}>组件</div>
              <Row justify="start">
                <TUpload3 callback={this.imgUploadCallback}>
                  <Button
                    className={styles.sub_btn}
                    size="small"
                    onClick={() => {
                      this.addSubGroup(2);
                    }}
                  >
                    图片
                  </Button>
                </TUpload3>
                <Button
                  className={styles.sub_btn}
                  size="small"
                  onClick={() => {
                    this.addSubGroup(1);
                  }}
                >
                  文字
                </Button>
                {/* <Button className={styles.sub_btn} size='small' onClick={() => { this.addSubGroup(3) }}>分割线</Button> */}
              </Row>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
