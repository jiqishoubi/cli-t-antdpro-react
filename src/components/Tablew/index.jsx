/**
 * 封装table
 */
/**
 * props:
 * 查询条件
 * 1/ queryItems [{type,title,key,options}]
 *    type :默认input，select，date, dom
 *     注：如果是date key请包含start和end字段  range:时间范围
 *        如果是select，codeParam 字符串，customOptions [{codeKey,codeValue}]
 *    dom就是自定义  具有dom属性
 *    options 就是formItem的配置
 *
 * 表格
 * 1/ queryApi
 * 2/ columns [{title,key}]
 *    可以写width  fixed属性
 *    type如果是 caozuo的话，可以写render属性
 */
import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'dva';
import moment from 'moment';
import { Table, Form, Row, Col, Input, Select, Button, Tooltip, DatePicker, message } from 'antd';
import requestw from '@/utils/requestw';
import { RedoOutlined } from '@ant-design/icons';
// import { localDB } from '@/utils/utils';
import router from 'umi/router';

const { Option } = Select;

// @connect(({ common }) => ({
//   common,
// }))
// @Form.useForm()
class index extends React.Component {
  constructor(props) {
    super(props);
    // 日期的key
    let startDateKey = null;
    let endDateKey = null;
    // if (props.queryItems) {
    //   let filterArrStart = props.queryItems.filter(
    //     (obj) => obj.type == 'date' && obj.key.indexOf('start') > -1,
    //   );
    //   let filterArrEnd = props.queryItems.filter(
    //     (obj) => obj.type == 'date' && obj.key.indexOf('end') > -1,
    //   );
    //   if (filterArrStart[0]) startDateKey = filterArrStart[0].key;
    //   if (filterArrEnd[0]) endDateKey = filterArrEnd[0].key;
    // }
    this.state = {
      // 查询
      startDateKey,
      endDateKey,
      // 表格
      page: 1,
      pageSize: 10,
      tableInfo: null,
      // loading
      loading_table: false,
      // teamId: localDB.getItem('teamId'),
    };
    if (props.onRef) {
      //如果父组件传来该方法 则调用方法将子组件this指针传过去
      props.onRef(this);
    }
    // const form = Form.useForm();
  }

  componentDidMount() {
    // this.getSelects(); // 查码表
    this.getData();
  }
  /**
   * 方法
   */
  // 查询条件相关

  // getSelects = () => {
  //   const { dispatch, queryItems } = this.props;
  //   if (!queryItems) return;
  //   for (let i = 0; i < queryItems.length; i++) {
  //     let item = queryItems[i];
  //     if (item.type == 'select' && item.codeParam) {
  //       dispatch({
  //         type: `common/getSysCodeByParam`,
  //         payload: item.codeParam,
  //       });
  //     }
  //   }
  // };
  /** 日期方法开始 */
  // 开始日期不能大于 结束日期

  disabledStartDate = startValue => {
    const { endDateKey } = this.state;
    const { form } = this.props;
    let endValue = form.getFieldValue(endDateKey);
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startDateKey } = this.state;
    const { form } = this.props;
    let startValue = form.getFieldValue(startDateKey);
    return startValue.valueOf() > endValue.valueOf() || endValue.valueOf() > new Date().getTime();
  };
  // 限制查询订单时间最大为range天

  onStartChange = (startValue, range = 30) => {
    const { endDateKey } = this.state;
    const { form } = this.props;
    let endValue = form.getFieldValue(endDateKey);
    let startStamp = startValue.valueOf();
    let endStamp = endValue.valueOf();
    if (endStamp - startStamp > 86400000 * range) {
      form.setFieldsValue({
        [endDateKey]: moment(startStamp + 86400000 * range).fromNow(),
      });
    }
  };

  onEndChange = (endValue, range = 30) => {
    const { startDateKey } = this.state;
    const { form } = this.props;
    let startValue = form.getFieldValue(startDateKey);
    let startStamp = startValue.valueOf();
    let endStamp = endValue.valueOf();
    if (endStamp - startStamp > 86400000 * range) {
      form.setFieldsValue({
        [startDateKey]: moment(endStamp - 86400000 * range).fromNow(),
      });
    }
  };
  /** 日期方法结束 end */

  resetSearch = () => {
    const { form } = this.props;
    form.resetFields();
  };

  clickSearch = () => {
    this.setState({ page: 1 }, () => {
      this.getData();
    });
  };
  // 查询条件相关 end
  // 表格相关

  getData = code => {
    const { startDateKey, endDateKey } = this.state;
    const { queryApi, modifydata, retType, postdates, restype, pageOjb } = this.props;
    this.refs.formRef.validateFields().then(async values => {
      // form.validateFields().then((values) => {
      //   // success
      //   console.log(values);
      // });
      // let formData = form.getFieldsValue();
      // const formData = Form.useForm();
      let formData = values;
      // console.log(form);
      let postData_date = {};
      if (startDateKey) {
        postData_date = {
          [startDateKey]: formData[startDateKey].format('YYYY-MM-DD'),
          [endDateKey]: formData[endDateKey].format('YYYY-MM-DD'),
        };
      }
      let pagge = {};
      if (pageOjb) {
        pagge = {
          pageSize: this.state.pageSize,
          pageNum: this.state.page,
        };
      } else {
        pagge = {
          pageSize: this.state.pageSize,
          pageNo: this.state.page,
        };
      }

      let postData = {
        ...postdates,
        ...pagge,
        ...formData,
        ...postData_date,
        ...code,
      };
      if (restype) {
        postData.type = restype;
      }
      this.setState({ loading_table: true });
      let resDtat;
      let res = await requestw({
        type: retType ? retType : 'post',
        url: queryApi,
        data: postData,
      });
      if (res || res.status || res.status == '0') {
        if (modifydata) {
          resDtat = this.props.modifydata(res.data);
        }
      } else if (!res || res.code !== '0') {
        this.setState({ loading_table: false });
        message.warning(res.message ? res.message : '暂无数据');
        return;
      }

      // 处理idw
      // res.data.data.forEach((obj, index) => {
      //   obj.idw = index;
      // });

      this.setState({
        tableInfo: resDtat,
        page: resDtat.pageNo,
        loading_table: false,
      });
    });
  };

  onFinish = () => {};

  changePage = current => {
    this.setState(
      {
        page: current,
        pageSize: this.state.pageSize,
      },
      () => {
        this.getData();
      },
    );
  };

  tableOnChange = current => {
    this.setState(
      {
        page: current.current,
        pageSize: current.pageSize,
      },
      () => {
        this.getData();
      },
    );
  };

  // 表格相关 end
  /**
   * 渲染
   */
  render() {
    const {
      // 查询
      // startDateKey,
      // endDateKey,
      // 表格
      tableInfo,
      loading_table,
      // teamId,
      // loading
    } = this.state;
    const {
      form,
      // common,
      // props
      queryItems,
      columns,
      // loading,
      querystyle,
      Externalplacement,
    } = this.props;
    // const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    // const NormalLoginForm = () => {
    //   const onFinish = (values) => {
    //     //提交表单且数据验证成功后回调事件
    //     console.log('Received values of form: ', values);
    //   };

    //   return (
    //     <Form {...formItemLayout} form={form}>
    //       <Row gutter={10} type="flex" align="middle">
    //         {queryItems.map((obj, index) => {
    //           let inputDom;
    //           if (obj.type == 'select') {
    //             let optionsArr = null;
    //             if (obj.codeParam) {
    //               //redux码表
    //               // optionsArr = common[obj.codeParam + '_list'];
    //             } else {
    //               //自定义options
    //               optionsArr = obj.customOptions;
    //             }
    //             inputDom = (
    //               <Select placeholder={obj.title} style={{ width: 180 }}>
    //                 <Option value="">不限</Option>
    //                 {optionsArr && optionsArr.length > 0
    //                   ? optionsArr.map((opObj, opIndex) => (
    //                       <Option key={opIndex} value={opObj.codeKey}>
    //                         {opObj.codeValue}
    //                       </Option>
    //                     ))
    //                   : null}
    //               </Select>
    //             );
    //           } else if (obj.type == 'date') {
    //             inputDom = (
    //               <DatePicker
    //                 format="YYYY-MM-DD"
    //                 placeholder={
    //                   obj.key.indexOf('start') > -1 ? '请选择开始日期' : '请选择结束日期'
    //                 }
    //                 allowClear={false}
    //                 style={{ width: 180 }}
    //                 //方法
    //                 disabledDate={
    //                   obj.key.indexOf('start') > -1 ? this.disabledStartDate : this.disabledEndDate
    //                 }
    //                 onChange={
    //                   obj.range == false
    //                     ? () => {}
    //                     : obj.key.indexOf('start') > -1
    //                     ? (val) => {
    //                         this.onStartChange(val, obj.range);
    //                       }
    //                     : (val) => {
    //                         this.onEndChange(val, obj.range);
    //                       }
    //                 }
    //               />
    //             );
    //           } else if (obj.type == 'dom') {
    //             inputDom = obj.dom;
    //           } else {
    //             //input
    //             inputDom = <Input placeholder={obj.title} style={{ width: 180 }} />;
    //           }

    //           return (
    //             <Col key={index}>
    //               <Form.Item style={{ marginRight: 0 }} name={obj.key}>
    //                 {/* {getFieldDecorator(obj.key, {
    //                 ...obj.options,
    //               })(inputDom)} */}
    //                 {inputDom}
    //               </Form.Item>
    //             </Col>
    //           );
    //         })}
    //         <Col>
    //           <Tooltip placement="top" title="重置搜索条件">
    //             <Button type="primary" shape="circle" icon="reload" onClick={this.resetSearch} />
    //           </Tooltip>
    //         </Col>
    //         <Col>
    //           <Button type="primary" onClick={this.clickSearch}>
    //             查询
    //           </Button>
    //         </Col>
    //       </Row>
    //     </Form>
    //   );
    // };
    // 查询条件
    let panel = queryItems ? (
      <Form
        {...formItemLayout}
        onFinish={this.onFinish}
        form={form}
        ref="formRef"
        style={{ marginBottom: '10px' }}
      >
        {Externalplacement ? Externalplacement : null}

        <Row gutter={10} type="flex" align="middle" style={querystyle}>
          {queryItems.map((obj, index) => {
            let inputDom;
            if (obj.type == 'select') {
              let optionsArr = null;
              if (obj.codeParam) {
                //redux码表
                // optionsArr = common[obj.codeParam + '_list'];
              } else {
                //自定义options
                optionsArr = obj.customOptions;
              }
              inputDom = (
                <Select placeholder={obj.title} style={{ width: 25 }}>
                  <Option value="">不限</Option>
                  {optionsArr && optionsArr.length > 0
                    ? optionsArr.map((opObj, opIndex) => (
                        <Option key={opIndex} value={opObj.codeKey}>
                          {opObj.codeValue}
                        </Option>
                      ))
                    : null}
                </Select>
              );
            } else if (obj.type == 'date') {
              inputDom = (
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder={obj.key.indexOf('start') > -1 ? '请选择开始日期' : '请选择结束日期'}
                  allowClear={false}
                  style={{ width: 25 }}
                  //方法
                  disabledDate={
                    obj.key.indexOf('start') > -1 ? this.disabledStartDate : this.disabledEndDate
                  }
                  onChange={
                    obj.range == false
                      ? () => {}
                      : obj.key.indexOf('start') > -1
                      ? val => {
                          this.onStartChange(val, obj.range);
                        }
                      : val => {
                          this.onEndChange(val, obj.range);
                        }
                  }
                />
              );
            } else if (obj.type == 'dom') {
              inputDom = obj.dom;
            } else {
              //input
              inputDom = <Input placeholder={obj.title} style={{ width: 180 }} />;
            }

            return (
              <Col key={index}>
                <Form.Item style={{ marginRight: 0, marginBottom: '0' }} name={obj.key}>
                  {/* {getFieldDecorator(obj.key, {
                    ...obj.options,
                  })(inputDom)} */}
                  {inputDom}
                </Form.Item>
              </Col>
            );
          })}
          {queryItems.length ? (
            <>
              <Col>
                <Tooltip placement="top" title="重置搜索条件">
                  <Button type="primary" shape="circle" onClick={this.resetSearch}>
                    <RedoOutlined />
                  </Button>
                </Tooltip>
              </Col>
              <Col>
                <Button type="primary" onClick={this.clickSearch}>
                  查询
                </Button>
              </Col>
            </>
          ) : null}
        </Row>
      </Form>
    ) : null;

    // 表格 列
    let columnsTemp = columns.map(obj => {
      let columnObj;
      if (obj.type && obj.type.indexOf('caozuo') > -1) {
        //操作
        columnObj = {
          align: obj.align ? obj.align : 'center',
          title: obj.title,
          render: record => {
            return obj.render(record);
          },
        };
      } else {
        if (obj.render) {
          columnObj = {
            align: obj.align ? obj.align : 'center',
            title: obj.title,
            key: obj.key,
            dataIndex: obj.key,
            render: record => {
              return obj.render(record);
            },
          };
        } else {
          columnObj = {
            align: obj.align ? obj.align : 'center',
            title: obj.title,
            key: obj.key,
            dataIndex: obj.key,
          };
        }
      }
      // width fixed属性
      if (obj.width) columnObj.width = obj.width;
      if (obj.fixed) columnObj.fixed = obj.fixed;
      return columnObj;
    });

    /**
     * dom
     */
    return (
      <div>
        {panel}
        {/* {queryItems} */}
        <Table
          rowKey="idw"
          columns={columnsTemp}
          dataSource={tableInfo && tableInfo.data ? tableInfo.data : []}
          loading={loading_table}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total, range) => `当前显示${range[0]}-${range[1]}条 共${total}条`,
            current: this.state.page,
            pageSize: this.state.pageSize,
            total: tableInfo && tableInfo.rowTop ? tableInfo.rowTop : 0,
          }}
          scroll={{ y: '470px' }}
          onChange={current => this.tableOnChange(current)}
          onRow={record => {
            return {
              onClick: event => {
                if (event.target.dataset && event.target.dataset.value) {
                  return;
                }
                if (this.props.routerUrl) {
                  router.push({
                    pathname: this.props.routerUrl,
                    query: {
                      productId: record.productId,
                      productType: record.productType,
                    },
                  });
                }
              }, // 点击行
            };
          }}
        />
      </div>
    );
  }
}

index.propTypes = {
  //查询
  queryItems: PropTypes.array,
  //表格
  queryApi: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
};

export default index;
