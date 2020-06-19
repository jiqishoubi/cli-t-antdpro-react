/**
 * props:
 * callback //成功的回调
 *
 * 方法：
 * open 参数 productObj
 * close
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Drawer, Form, Input, Radio, Select, Button, message } from 'antd';
import TUpload2 from '@/components/T-Upload2';
import TSku from '@/components/SupplyGoods/T-Sku';
import TEditDetails from '@/components/SupplyGoods/T-EditDetails';
import { mConfirm, pathimgHeader, localDB } from '@/utils/utils';
import { getProductsAjax, updateProductAjaxs, addProductAjaxs } from '@/services/goods';
import styles from './index.less';

const label = 4;
const total = 23;
const formLayout = {
  labelCol: { span: label },
  wrapperCol: { span: total - label },
};
const formLayoutTail = {
  wrapperCol: { offset: label, span: total - label },
};

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      productObj: {},
      lookingRecord: null,

      //form
      typeId: '',
      specsType: 0,
    };
    this.formRef = React.createRef();
    this.tSku = React.createRef();
  }

  /**
   * 周期
   */
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }

    const { dispatch } = this.props;
    dispatch({
      type: 'goods/getGoodsType',
    });
  }

  /**
   * 方法
   */
  open = record => {
    this.setState({
      visible: true,
      lookingRecord: record || null,
    });
    //获取详情
    console.log(record);

    if (record) {
      this.getInfo(record);
    }
  };
  close = () => {
    this.setState({
      visible: false,
      productObj: {},
      lookingRecord: null,
    });
  };
  /**
   * form change
   */
  onValuesChange = (changedValues, allValues) => {
    console.log(changedValues);
  };
  typeIdChange = typeId => {
    this.setState({ typeId });
    this.formRef.current.resetFields(['subTypeId']);
  };
  specsTypeChange = e => {
    let value = e.target.value;
    this.setState({ specsType: value });
  };

  //select
  getSelect2List = typeId => {
    const { goods } = this.props;
    const { goodsTypeList } = goods;
    let goodsTypeList2 = [];
    if (typeId !== undefined) {
      let filterArr = goodsTypeList.filter(obj => obj.typeId == typeId);
      if (filterArr[0]) {
        goodsTypeList2 = filterArr[0].subTypeList;
      }
    }
    return goodsTypeList2;
  };

  //type 1 old=>form
  //type 2 form=>old
  dealInfoData = (type, values) => {
    const { productObj, lookingRecord } = this.state;
    let data = '';
    if (type == 1) {
      /**
       * 改成放进form的
       */
      data = JSON.parse(JSON.stringify(values));
      //图片
      let fileList = data.productPic.split(',').map((str, index) => {
        let url = str.indexOf('http') > -1 ? str : pathimgHeader + str;
        return {
          uid: -(index + 1),
          name: url,
          status: 'done',
          url,
        };
      });
      //价格
      // data.productPrice = data.productPrice / 100;
      data.price = data.price / 100;
      data.transportAmount = data.transportAmount / 100;
      //图片
      data.fileList = fileList;
      //多规格
      if (data.specsType == 1) {
        data.skuPropertyList.forEach(obj => {
          obj.price = obj.price / 100;
        });
        data.sku = {
          skuJson: data.skuPropertyList,
          skuList: data.skuPropertys,
        };
      }
    } else {
      /**
       * 转成提交
       */
      if (lookingRecord) {
        //编辑
        data = JSON.parse(JSON.stringify(productObj));
        let deleteKeyArr = [
          'createTime',
          'modifyTime',
          'upperTime',
          'distributionType',
          'distributionValu',
          'typeName',
        ];
        deleteKeyArr.forEach(key => {
          delete data[key];
        });
      } else {
        //新增
        data = JSON.parse(JSON.stringify(values));
      }
      //图片
      let productPic = values.fileList
        .map((item, index) => {
          return item.url;
        })
        .join(',');
      data = {
        ...data,
        ...values,
        productPic,
        //价格
        price: values.price ? values.price * 100 : null,
        // productPrice: values.productPrice * 100,
        transportAmount: values.transportAmount * 100,
      };
      //多规格
      if (data.specsType == 1) {
        data.sku.skuJson.forEach(obj => {
          obj.price = obj.price * 100;
        });
        data.skuJson = data.sku.skuJson;
        data.tradeSkuProperty = data.sku.skuList;
      }
    }
    return data;
  };

  //获取详情
  getInfo = async record => {
    console.log(record);

    let postData = {
      productId: record.productId,
      teamId: record.teamId,
      productType: record.productType,
    };
    let res = await getProductsAjax(postData);
    if (res && res.status == 0 && res.data && res.data[0]) {
      console.log('详情', res.data[0]);
      let productObj = res.data[0];

      this.setState({
        productObj,
        //form
        typeId: productObj.typeId,
        specsType: productObj.specsType,
      });
      //回显
      let formData = this.dealInfoData(1, productObj);
      this.formRef.current.setFieldsValue(formData);
    }
  };
  /**
   * 提交
   */
  submit = async () => {
    const { lookingRecord } = this.state;
    if (this.tSku && this.tSku.current) {
      await this.tSku.current.validate();
    }
    let values = await this.formRef.current.validateFields();
    console.log(values);

    let confirmStr = lookingRecord ? '确认修改？' : '确认新增？';
    mConfirm(confirmStr, async () => {
      return lookingRecord ? await this.edit(values) : await this.add(values);
    });
  };
  /**
   * 编辑
   */
  edit = values => {
    return new Promise(async resolve => {
      let postData = this.dealInfoData(0, values);
      postData.productType = 'SUPPLY_GOODS';
      postData.teamId = localDB.getItem('teamId');
      let res = await updateProductAjaxs(postData);
      if (res && res.status == 0) {
        message.success('修改成功');
        this.close();
        if (this.props.callback) {
          this.props.callback();
        }
      } else {
        message.warning(res.message || '网络异常');
      }
      resolve();
    });
  };
  /**
   * 新增
   */
  add = values => {
    return new Promise(async resolve => {
      let postData = this.dealInfoData(0, values);
      postData.productType = 'SUPPLY_GOODS';
      console.log(postData);
      postData.teamId = localDB.getItem('teamId');
      let res = await addProductAjaxs(postData);
      if (res && res.data.status == 0) {
        message.success(res.message || '新增成功');
        this.close();
        if (this.props.callback) {
          this.props.callback();
        }
      } else {
        message.warning(res.message || '网络异常');
      }
      resolve();
    });
  };

  /**
   * 渲染
   */
  render() {
    const {
      visible,
      productObj,
      //form
      typeId,
      specsType,
    } = this.state;
    const { goods, supplyGoodsList } = this.props;
    const { goodsTypeList } = goods;
    console.log(supplyGoodsList);

    let goodsTypeList2 = this.getSelect2List(typeId);

    return (
      <Drawer
        destroyOnClose
        visible={visible}
        maskClosable={false}
        placement="left"
        width={820}
        onClose={this.close}
      >
        <Form ref={this.formRef} {...formLayout} onValuesChange={this.onValuesChange}>
          {/* 基本信息 */}
          <Form.Item className={styles.item_title}>基本信息</Form.Item>
          <Form.Item
            label="商品图片"
            name="fileList"
            rules={[{ required: true, message: '请上传图片' }]}
          >
            <TUpload2 />
          </Form.Item>
          <Form.Item
            label="商品名称"
            name="productName"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          {/* <Form.Item
            label="商品一级分类"
            name="typeId"
            rules={[{ required: true, message: '请选择商品分类' }]}
          >
            <Select placeholder="请选择商品分类" onChange={this.typeIdChange}>
              {goodsTypeList.map((obj, index) => (
                <Select.Option key={index} value={obj.typeId}>
                  {obj.typeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="商品二级分类"
            name="subTypeId"
            rules={[{ required: true, message: '请选择商品分类' }]}
          >
            <Select placeholder="请选择商品分类">
              {goodsTypeList2.map((obj, index) => (
                <Select.Option key={index} value={obj.subTypeId}>
                  {obj.subTypeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item> */}
          <Form.Item
            label="供货商品分类"
            name="supplyType"
            rules={[{ required: true, message: '请选择供货商品分类' }]}
          >
            <Select placeholder="请选择供货商品分类" onChange={this.typeIdChange}>
              {supplyGoodsList.map((obj, index) => (
                <Select.Option key={index} value={obj.typeId}>
                  {obj.typeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="在线支付"
            name="canBuy"
            rules={[{ required: true, message: '是否在线支付' }]}
            initialValue={1}
          >
            <Radio.Group>
              <Radio value={1}>支持线上支付</Radio>
              <Radio value={0}>仅线上展示</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="商品排序"
            name="productSort"
            rules={[{ required: true, message: '请输入商品排序' }]}
          >
            <Input placeholder="请输入商品排序" />
          </Form.Item>

          {/* 商品详情 */}
          <Form.Item className={styles.item_title}>商品详情</Form.Item>
          <Form.Item label="详情设置" name="productDetail">
            <TEditDetails />
          </Form.Item>

          {/* 价格库存 */}
          <Form.Item className={styles.item_title}>价格库存</Form.Item>
          <Form.Item label="规格设置" name="specsType" required initialValue={0}>
            <Radio.Group onChange={this.specsTypeChange}>
              <Radio value={0}>单规格</Radio>
              <Radio value={1}>多规格</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="销售单位"
            name="productCompany"
            rules={[{ required: true, message: '请输入销售单位' }]}
          >
            <Input placeholder="请输入销售单位" />
          </Form.Item>
          {/* <Form.Item
            label="商品原价"
            name="productPrice"
            rules={[{ required: true, message: '请输入商品原价' }]}
          >
            <Input placeholder="请输入商品原价" prefix="￥" />
          </Form.Item> */}

          <Form.Item
            label="建议售价"
            name="price"
            rules={[{ required: true, message: '请输入建议售价' }]}
          >
            <Input placeholder="请输入建议售价" prefix="￥" />
          </Form.Item>
          {specsType == 0 ? (
            <Fragment>
              <Form.Item
                label="供货价"
                name="supplyPrice"
                rules={[{ required: true, message: '请输入供货价' }]}
              >
                <Input placeholder="请输供货价" prefix="￥" />
              </Form.Item>
              <Form.Item
                label="库存"
                name="productStock"
                rules={[{ required: true, message: '请输入库存' }]}
              >
                <Input placeholder="请输入库存" />
              </Form.Item>
              {/* <Form.Item
                label="物料编号"
                name="productStockNumber"
                rules={[{ required: true, message: '请输入物料编号' }]}
              >
                <Input placeholder="请输入物料编号" />
              </Form.Item> */}
            </Fragment>
          ) : (
            <Form.Item name="sku" wrapperCol={{ span: 24 }}>
              <TSku ref={this.tSku} {...formLayout} />
            </Form.Item>
          )}

          {/* 配送设置 */}
          <Form.Item className={styles.item_title}>配送设置</Form.Item>
          <Form.Item
            label="运费"
            name="transportAmount"
            rules={[{ required: true, message: '请输入商品原价' }]}
          >
            <Input placeholder="请输入商品原价" prefix="￥" />
          </Form.Item>

          {/* 操作 */}
          <Form.Item {...formLayoutTail}>
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

export default connect(({ goods }) => ({
  goods,
}))(index);
