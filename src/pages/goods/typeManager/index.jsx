import React from 'react';
import { connect } from 'dva';
import {
  Button,
  Card,
  Row,
  Col,
  Breadcrumb,
  Radio,
  Modal,
  message,
  Form,
  Upload,
  Input,
} from 'antd';
import { getUrlParam } from '@/utils/utils';
import './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TUpload2 from '@/components/T-Upload2';

// import EditModal from '@/components/EditModal';
import { pathimgHeader, pathVideoHeader } from '@/utils/utils';
import moment from 'moment';
const { confirm } = Modal;

// import router from 'umi/router';
class typeManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageNo: 1,
      tableDate: [],
      productStatusValue: '',
      upType: '',
      upOrDown: false,
      productId: '',
      delGoods: false,
      productStatus: '',

      //-----------------------------------新的///
      addModal: false,
      setModal: false,

      //----------------------上传
      imageUrl: '',
      loading: false,

      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      setModalData: null,
    };
    // this.modifydata = this.modifydata.bind(this);
    this.formRef = React.createRef();
  }
  componentDidMount() {
    // this.getData();
    this.Tablew.getData({ teamId: 2 });
  }

  modifydata(e) {
    console.log(e);
    console.log(1);

    let newObj = {};
    newObj.data = e.data;
    newObj.rowTop = e.total;
    newObj.pageNo = e.pageNum;
    return newObj;
  }
  recordEdit(record) {
    // console.log(record);
    router.push('/goodsAdd?id=' + record.productId);
  }
  onRadioChange = e => {
    console.log(e);
    let getCode = e.target.value;
    this.setState(
      {
        goodsStatus: getCode,
      },
      () => {
        // this.getData();
        this.Tablew.getData();
      },
    );
  };
  //上架下架
  upOrDownMethod = e => {
    if (e.productStatus == 0) {
      this.setState({
        productStatusValue: '上架',
        upType: '1',
      });
    } else {
      this.setState({
        productStatusValue: '下架',
        upType: '0',
      });
    }
    this.setState({ upOrDown: true, productStatus: e.productStatus, productId: e.productId });
  };
  closeAddressModals = () => {
    this.setState({
      addModal: false,
    });
  };
  addressModalsOk = async () => {
    const { productId, upType } = this.state;
    this.formRef.current.validateFields().then(async values => {
      console.log(values);

      let postdata = {
        ...values,
        teamId: 2,
        typeImg: values.fileList[0].url,
      };
      let res = await requestw({
        url: api_goods.createGoodsProduct,
        data: postdata,
      });
      console.log(res);
      this.setState({
        upOrDown: false,
      });
      if (res.code == 200) {
        message.success('添加分类成功');
        this.Tablew.getData();
        this.setState({
          addModal: false,
        });
      } else {
        message.success('添加分类失败');
        return false;
        // this.Tablew.getData();
      }
    });
  };
  // ///删除 商品
  // deleteGoods(e) {
  //   this.setState({
  //     delGoods: true,
  //     delProductId: e.productId,
  //   });
  // }
  //关闭删除商品弹框
  closedeleteGoodsModals = () => {
    this.setState({
      setModal: false,
    });
  };
  closeGoodsModalsOk = () => {
    this.formRef.current.validateFields().then(async values => {
      console.log(values);

      let postdata = {
        typeId: this.state.setModalData.typeId,
        // ...values,
        typeName: values.typeName,
        typeSortValue: values.typeSortValue,
        teamId: 2,
        // typeImg: values.fileList[0].url,
      };
      // console.log();
      if (values.fileList[0] && values.fileList[0].uid) {
        postdata.typeImg = values.fileList[0].url;
      } else {
        postdata.typeImg = values.fileList[0];
      }
      console.log(postdata.typeImg);

      let res = await requestw({
        url: api_goods.updateGoodsProduct,
        data: postdata,
      });
      console.log(res);
      this.setState({
        upOrDown: false,
      });
      if (res.code == 200) {
        message.success('修改分类成功');
        this.Tablew.getData();
        this.setState({
          setModal: false,
        });
      } else {
        message.success('修改分类失败');
        return false;
        // this.Tablew.getData();
      }
    });
  };
  //删除商品接口
  deleteGoods = async e => {
    let that = this;
    console.log(e);
    confirm({
      title: '确定删除该分类？',
      content: '',
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        let postdata = {
          typeId: e.typeId,
        };
        let res = await requestw({
          url: api_goods.deleteGoodsType,
          data: postdata,
        });
        console.log(res);
        if (res.code == 200) {
          message.success('删除商品成功');
          that.Tablew.getData();
        } else {
          message.warning('删除商品失败');
        }
        // Modal.destroyAll();
      },
    });
  };
  setModal = e => {
    console.log(e);

    this.setState({
      setModal: true,
      setModalData: e,
    });
  };
  // 上传方法-----------------------------------------
  // getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }
  // handleCancel = () => this.setState({ previewVisible: false });

  // handlePreview = async (file) => {
  //   console.log(file);

  //   if (!file.url && !file.preview) {
  //     file.preview = await this.getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //     previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
  //   });
  // };

  // handleChange = ({ fileList }) => {
  //   console.log(fileList);
  //   // let url = fileList[0].response.data.list[0].filePath;
  //   //  this.state.fileList.push(url)
  //   if (!fileList.length) {
  //     this.setState({ fileList: [] });
  //     return;
  //   }
  //   if (
  //     fileList[0].status === 'uploading' ||
  //     fileList[0].status === 'done' ||
  //     fileList[0].status === 'error'
  //   ) {
  //     // this.setState({ loading: true });
  //     console.log(1);
  //     this.setState({ fileList: fileList }, () => {
  //       if (fileList[0].status === 'uploading' || fileList[0].status === 'done') {
  //         console.log(2);
  //         this.setState({ fileList: fileList });
  //       } else {
  //         this.setState({ fileList: [] });
  //       }
  //     });
  //   }
  //   // this.setState({ fileList });
  // };

  shwoAddModal = () => {
    this.setState({
      addModal: true,
    });
  };
  render() {
    const {
      tableDate,
      goodsStatus,
      productStatusValue,
      upType,
      upOrDown,
      productId,
      productStatus,
      delGoods,

      //////
      addModal,
      setModal,
      fileList,
      previewVisible,
      previewTitle,
      previewImage,
      setModalData,
    } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    console.log(pathimgHeader);
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    let pageTiaojian = (
      <>
        <Button style={{}} onClick={this.shwoAddModal}>
          添加分类
        </Button>
      </>
    );
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>一级分类</Breadcrumb.Item>
        </Breadcrumb>

        <Tablew
          onRef={c => (this.Tablew = c)}
          //外部添加查询条件
          Externalplacement={pageTiaojian}
          modifydata={this.modifydata}
          //查询条件
          querystyle={{ float: 'right' }}
          queryItems={[]}
          postdates={{
            teamId: 2,
          }}
          pageOjb={true}
          restype={goodsStatus}
          //表格
          queryApi={api_goods.getGoodstypeAll}
          columns={[
            {
              title: '分类名称',
              key: 'typeName',
            },
            {
              title: '分类图片',
              key: 'typeImg',
              render: v => {
                return (
                  <img
                    style={{ width: '80px', height: '80px', marginRight: '10px' }}
                    src={v.split(',')[0]}
                  />
                );
              },
            },

            {
              title: '包含商品',
              key: 'productCount',
            },
            { title: '分类排序', key: 'typeSortValue' },
            {
              title: '操作',
              key: '',
              // type: 'caozuo',
              render: record => (
                <>
                  <a
                    style={{ marginRight: '5px' }}
                    onClick={() => {
                      this.setModal(record);
                    }}
                  >
                    编辑
                  </a>
                  <a
                    onClick={() => {
                      this.deleteGoods(record);
                    }}
                  >
                    删除
                  </a>
                </>
              ),
            },
          ]}
        />
        <Modal
          title="添加分类"
          visible={addModal}
          closable={false}
          onCancel={this.closeAddressModals}
          onOk={this.addressModalsOk}
          width={600}
        >
          <div style={{ height: '240px' }}>
            {/* <div className="Managerimgleftbox">
              <span style={{ float: 'left', height: '100px', lineHeight: '80px' }}>上传图片：</span>
            </div>
            <div className="Managerimgrightbox">
              <Upload
                style={{ float: 'left', height: '100px' }}
                action={'https://greecardcrmt.bld365.com/' + api_goods.upload}
                name="file"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <span style={{ color: '#ccc', width: '100%' }}>
                最多上传一张请选择格式为jpg、jpeg、png，小于2MB的图片
              </span>
            </div> */}
            <Form {...formItemLayout} ref={this.formRef} style={{ float: 'left' }}>
              <Form.Item
                label="商品图片"
                name="fileList"
                rules={[{ required: true, message: '请上传图片' }]}
              >
                <TUpload2 />
              </Form.Item>
              <Form.Item
                label="分类名称"
                name="typeName"
                rules={[{ required: true, message: '请输入分类名称' }]}
              >
                <Input placeholder="请输入分类名称" style={{ width: 380 }} />
              </Form.Item>
              <Form.Item
                label="分类排序"
                name="typeSortValue"
                rules={[{ required: true, message: '请输入分类排序' }]}
              >
                <Input placeholder="请输入分类排序" style={{ width: 380 }} />
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Modal
          title="编辑分类"
          visible={setModal}
          closable={false}
          onCancel={this.closedeleteGoodsModals}
          onOk={this.closeGoodsModalsOk}
        >
          <div style={{ height: '240px' }}>
            {/* <div className="Managerimgleftbox">
              <span style={{ float: 'left', height: '100px', lineHeight: '80px' }}>上传图片：</span>
            </div>
            <div className="Managerimgrightbox">
              <Upload
                style={{ float: 'left', height: '100px' }}
                action={'https://greecardcrmt.bld365.com/' + api_goods.upload}
                name="file"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <span style={{ color: '#ccc', width: '100%' }}>
                最多上传一张请选择格式为jpg、jpeg、png，小于2MB的图片
              </span>
            </div> */}
            <Form {...formItemLayout} ref={this.formRef} style={{ float: 'left' }}>
              <Form.Item
                label="商品图片"
                name="fileList"
                rules={[{ required: true, message: '请上传图片' }]}
                initialValue={[`${setModalData ? setModalData.typeImg : ''}`]}
              >
                <TUpload2 />
              </Form.Item>
              <Form.Item
                label="分类名称"
                name="typeName"
                rules={[{ required: true, message: '请输入分类名称' }]}
                initialValue={setModalData ? setModalData.typeName : ''}
              >
                <Input placeholder="请输入分类名称" style={{ width: 380 }} />
              </Form.Item>
              <Form.Item
                label="分类排序"
                name="typeSortValue"
                rules={[{ required: true, message: '请输入分类排序' }]}
                initialValue={setModalData ? setModalData.typeSortValue : ''}
              >
                <Input placeholder="请输入分类排序" style={{ width: 380 }} />
              </Form.Item>
            </Form>
          </div>
        </Modal>
        {/* setModalData */}
      </div>
    );
  }
}

export default typeManager;
