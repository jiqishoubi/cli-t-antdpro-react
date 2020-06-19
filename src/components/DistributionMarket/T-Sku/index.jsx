/**
 * props: 就能自定义组件
 * value
 * onChange
 */

import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import AddModal from './AddModal';
import styles from './index.less';

//笛卡尔积运算
function calcDescartes(array) {
  if (array.length < 2) return array[0] || [];
  return [].reduce.call(array, function(col, set) {
    var res = [];
    col.forEach(function(c) {
      set.forEach(function(s) {
        var t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      });
    });
    return res;
  });
}

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // //规格设置
      // skuList: [
      //   {
      //     skuName: '颜色',
      //     skuValue: [{ name: '红' }, { name: '白' }],
      //   },
      //   {
      //     skuName: '大小',
      //     skuValue: [{ name: '1' }, { name: '2' }],
      //   },
      // ],
      skuList: [],
    };
    this.formRef = React.createRef();
  }
  /**
   * 周期
   */
  componentWillReceiveProps(nextProps) {
    //处理传进来的数据 value
    console.log(nextProps);

    if (nextProps.value) {
      const { skuJson, skuList } = nextProps.value;
      //skuList

      skuList.forEach((obj, index) => {
        if (typeof obj.skuValue == 'object') {
          return;
        } else {
          try {
            obj.skuValue = JSON.parse(obj.skuValue);
          } catch (e) {}
        }
      });
      //skuJson
      let skuJsonStateObj = {};
      skuJson.forEach((obj, index) => {
        //keyStr
        let keyStr = '';
        let propertyList = obj.skuProperty.split('、');
        let keyStrArr = propertyList.map((str, index) => {
          return skuList[index].skuName + '=' + str;
        });
        keyStr = keyStrArr.join('、');
        //keyStr end
        obj.price * 1;
        obj.supplyPrice * 1;
        obj.stock * 1;
        skuJsonStateObj[keyStr + '_supplyPrice'] = obj.supplyPrice;
        skuJsonStateObj[keyStr + '_price'] = obj.price;
        skuJsonStateObj[keyStr + '_stock'] = obj.stock;
        skuJsonStateObj[keyStr + '_retailPrice'] = obj.retailPrice;

        // skuJsonStateObj[keyStr + '_stockNumber'] = obj.stockNumber;
      });
      console.log(skuJsonStateObj);

      this.setState({
        skuList,
        ...skuJsonStateObj,
      });
    }
  }
  /**
   * 方法
   */
  validate = () => {
    console.log(this.formRef.current.validateFields());

    return this.formRef.current.validateFields();
  };
  //增加大规格
  add1 = () => {
    this.addModal.open(name => {
      const { skuList } = this.state;
      let obj = {
        skuName: name,
        skuValue: [],
      };
      skuList.push(obj);
      this.setState({ skuList });
    });
  };
  //增加小规格
  add2 = index => {
    this.addModal.open(name => {
      const { skuList } = this.state;
      let obj = { name };
      if (!skuList[index].skuValue) {
        skuList[index].skuValue = [];
      }
      skuList[index].skuValue.push(obj);
      this.setState({ skuList });
    });
  };
  //删除大规格
  deleteSkuTable = index => {
    const { skuList } = this.state;
    skuList.splice(index, 1);
    this.setState({ skuList });
  };
  //删除小规格
  deleteSkuItem = (index, index2) => {
    const { skuList } = this.state;
    skuList[index].skuValue.splice(index2, 1);
    this.setState({ skuList });
  };
  //下面input change
  onValuesChange = (changedValues, allValues) => {
    let values = {};
    if (this.formRef && this.formRef.current) {
      values = this.formRef.current.getFieldsValue();
    }
    //处理
    //skuJson
    let poolObj = {};
    for (let key in values) {
      if (key && key.indexOf('_') > -1) {
        let skuKey = key.split('_')[0];
        let goodsKey = key.split('_')[1];
        if (!poolObj[skuKey]) {
          poolObj[skuKey] = {};
        }
        poolObj[skuKey][goodsKey] = values[key];
      }
    }
    let skuJson = [];
    for (let key in poolObj) {
      let obj = {};
      let valueArr = [];
      let sku1Arr = key.split('、');
      sku1Arr.forEach(str => {
        //颜色=白
        let key1 = str.split('=')[0];
        let value = str.split('=')[1];
        obj[key1] = value;
        valueArr.push(value);
      });
      obj['skuProperty'] = valueArr.join('、');
      let objTemp = {
        ...obj,
        ...poolObj[key],
      };
      skuJson.push(objTemp);
    }
    //skuList
    const { skuList } = this.state;
    skuList.forEach((obj, index) => {
      obj.skuLabel = index;
    });
    //处理 end

    //传到外面的Form.Item
    this.props.onChange({
      skuList,
      skuJson,
    });
  };
  /**
   * 渲染
   */
  render() {
    const { skuList } = this.state;
    const { labelCol, wrapperCol } = this.props;

    //笛卡尔积运算
    let arr = skuList
      ? skuList.map(obj => {
          return obj.skuValue ? obj.skuValue.map(obj2 => obj2.name) : [];
        })
      : [];
    let calcDescartesArr = calcDescartes(arr);

    return (
      <Fragment>
        <Form
          ref={this.formRef}
          onValuesChange={this.onValuesChange}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <Form.Item label="规格设置" required>
            {skuList
              ? skuList.map((obj, index) => (
                  <Fragment key={index}>
                    <div key={index} className={styles.skuTable}>
                      <div className={styles.skuTitle}>
                        {obj.skuName}
                        <div>
                          <Button
                            size="small"
                            onClick={() => {
                              this.add2(index);
                            }}
                          >
                            新增
                          </Button>
                          <CloseCircleOutlined
                            className={styles.del_icon}
                            onClick={() => {
                              this.deleteSkuTable(index);
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.skuTable1_content}>
                        {obj.skuValue.map((obj2, index2) => (
                          <div key={index2} className={styles.skuItem1}>
                            {obj2.name}
                            <CloseCircleOutlined
                              className={styles.del_icon}
                              onClick={() => {
                                this.deleteSkuItem(index, index2);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ))
              : null}
            <Button type="primary" onClick={this.add1} style={{ marginTop: 8 }}>
              新增
            </Button>
          </Form.Item>
          {/* 规格信息 */}
          <Form.Item label="规格信息" required>
            <div className={styles.skuTable}>
              <div className={styles.skuTitle2}>
                {skuList
                  ? skuList.map((obj, index) => (
                      <span key={index} className={`${styles.td} ${styles.td2}`}>
                        {obj.skuName}
                      </span>
                    ))
                  : null}
                <span className={styles.td}>供货价</span>
                <span className={styles.td}>建议售价</span>
                <span className={styles.td}>本店售价</span>
                <span className={styles.td}>库存</span>
                {/* <span className={styles.td}>库存编号</span> */}
              </div>

              {/* 内容 */}
              {calcDescartesArr && calcDescartesArr.length > 0
                ? calcDescartesArr.map((arr, index) => {
                    let dom = Array.isArray(arr) ? (
                      arr.map((name, idx) => (
                        <span key={idx} className={`${styles.td} ${styles.td2}`}>
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className={`${styles.td} ${styles.td2}`}>{arr}</span>
                    );

                    //一条skuJson的 前缀key
                    let keyStr = '';
                    if (Array.isArray(arr)) {
                      let arr2 = arr.map((str, index) => {
                        return skuList[index].skuName + '=' + str;
                      });
                      keyStr = arr2.join('、');
                    } else {
                      keyStr = skuList[0].skuName + '=' + arr;
                    }

                    return (
                      <div key={index} className={styles.skuTable2_content_div}>
                        {dom}
                        <span className={styles.td}>
                          <Form.Item
                            name={`${keyStr}_supplyPrice`}
                            noStyle
                            rules={[{ required: true, message: '请输入供货价' }]}
                            initialValue={this.state[`${keyStr}_supplyPrice`] || undefined}
                          >
                            <Input disabled size="small" placeholder="请输入供货价" prefix="￥" />
                          </Form.Item>
                        </span>
                        <span className={styles.td}>
                          <Form.Item
                            name={`${keyStr}_price`}
                            noStyle
                            rules={[{ required: true, message: '请输入建议售价' }]}
                            initialValue={this.state[`${keyStr}_price`] || undefined}
                          >
                            <Input disabled size="small" placeholder="请输入建议售价" prefix="￥" />
                          </Form.Item>
                        </span>
                        <span className={styles.td}>
                          <Form.Item
                            name={`${keyStr}_retailPrice`}
                            noStyle
                            rules={[{ required: true, message: '请输入本店售价' }]}
                            initialValue={this.state[`${keyStr}_retailPrice`] || undefined}
                          >
                            <Input size="small" placeholder="请输入本店售价" />
                          </Form.Item>
                        </span>
                        <span className={styles.td}>
                          <Form.Item
                            name={`${keyStr}_stock`}
                            noStyle
                            rules={[{ required: true, message: '请输入库存' }]}
                            initialValue={this.state[`${keyStr}_stock`] || undefined}
                          >
                            <Input disabled size="small" placeholder="请输入库存" />
                          </Form.Item>
                        </span>
                        {/* <span className={styles.td}>
                        <Form.Item
                          name={`${keyStr}_stockNumber`}
                          noStyle
                          rules={[{ required: true, message: '请输入库存编号' }]}
                          initialValue={this.state[`${keyStr}_stockNumber`] || undefined}
                        >
                          <Input size="small" placeholder="请输入..." />
                        </Form.Item>
                      </span> */}
                      </div>
                    );
                  })
                : null}
            </div>
          </Form.Item>
        </Form>

        <AddModal
          ref={e => {
            this.addModal = e;
          }}
        />
      </Fragment>
    );
  }
}
