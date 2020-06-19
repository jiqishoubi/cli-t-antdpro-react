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
  Select,
} from 'antd';
import { getUrlParam, localDB } from '@/utils/utils';
import './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import TypeModal from '@/components/TypeModal';
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
      selectList: [],
      formList: [],
      subTypeId: '',
      teamId: localDB.getItem('teamId'),
    };
    // this.modifydata = this.modifydata.bind(this);
    this.formRef = React.createRef();
    this.setModal.bind(this);
  }
  componentDidMount() {
    // this.getData();
    let { teamId } = this.state;
    this.Tablew.getData({ teamId });
    this.getoneGoodstypeAll();
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
    this.formRef.current.resetFields();
    this.setState({
      addModal: false,
    });
  };
  addressModalsOk = async () => {
    const { productId, upType, teamId } = this.state;
    this.formRef.current.validateFields().then(async values => {
      console.log(values);

      let postdata = {
        ...values,
        teamId: teamId,
        // typeImg: values.fileList[0].url,
      };
      let res = await requestw({
        url: api_goods.twoTypeCreate,
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
        this.Tablew.getData();
      } else {
        message.success('添加分类失败');
        return false;
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
    this.setState(
      {
        setModal: false,
        setModalData: null,
      },
      () => {
        console.log('关闭');
      },
    );
  };
  closeGoodsModalsOk = () => {
    this.formRef.current.validateFields().then(async values => {
      console.log(values);
      let { teamId } = this.state;
      let postdata = {
        typeId: this.state.setModalData.typeId,
        // ...values,
        typeName: values.typeName,
        typeSortValue: values.typeSortValue,
        teamId: teamId,
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
        // let postdata = {
        //   ,
        // };
        let res = await requestw({
          url: api_goods.twoDeleteType + `?typeId=${e.subTypeId}`,
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
    this.child.clear();
    // this.clearModalValue.clear()
    // return
    // console.log(e);
    // this.formRef.current.setFieldsValue({
    //   parentTypeId: this.state.parentTypeId,
    //   subTypeName: this.state.subTypeName,
    // })
    // let dat = {
    //   parentTypeId: e.parentTypeId,
    //   subTypeName: e.subTypeName,
    // }
    // this.formRef.current.setFieldsValue(dat);
    // this.formRef.current.resetFields()

    // this.formRef.current.validateFields().then(async (values) => {
    // console.log(this.formRef);

    // console.log(this.formRef.current);

    // this.formRef.current.setFieldsValue({
    //   parentTypeId: '',
    //   subTypeName: '',
    // })
    // this.formRef.current.setFieldsValue().then({
    //   parentTypeId: '',
    //   subTypeName: '',
    // })
    let formList = [
      {
        type: 'select',
        label: '一级分类',
        message: '请选择一级分类',
        list: this.state.selectList,
        name: 'parentTypeId',
        defaultValue: e.parentTypeId,
      },
      {
        type: 'ipt',
        label: '二级分类',
        message: '请输入二级分类名称',
        name: 'subTypeName',
        defaultValue: e.subTypeName,
      },
    ];
    let subTypeId = e.subTypeId;
    console.log(subTypeId);

    this.setState({
      setModal: true,
      formList,
      subTypeId,
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
    let formList = [
      {
        type: 'select',
        label: '一级分类',
        message: '请选择一级分类',
        list: this.state.selectList,
        name: 'parentTypeId',
      },
      {
        type: 'ipt',
        label: '二级分类',
        message: '请输入二级分类名称',
        name: 'subTypeName',
        // defaultValue: '888'
      },
    ];
    this.setState({
      addModal: true,
      formList,
    });
  };
  getoneGoodstypeAll = async () => {
    let { teamId } = this.state;
    let res = await requestw({
      url: api_goods.getGoodstypeAll,
      data: {
        teamId: teamId,
        pageSize: 9999,
        pageNum: 1,
      },
    });
    if (res.code == 200) {
      this.setState({
        selectList: res.data.data,
      });
    } else {
      message.warning('删除一级分类失败');
    }
  };
  //添加
  judgeCreatePlan = async val => {
    console.log(val, 'add');
    let res = await requestw({
      url: api_goods.twoTypeCreate,
      data: val,
    });
    if (res.code == 200) {
      this.setState({
        addModal: false,
      });
      message.success('添加分类成功');
      this.setState({
        addModal: false,
      });

      this.Tablew.getData({ teamId: this.state.teamId });
    } else {
      message.success('添加分类失败');
      return;
    }
  };
  //修改
  judgeCreatePlans = async val => {
    console.log(val, 'set');
    let res = await requestw({
      url: api_goods.twoUpdataPorduct,
      data: val,
    });
    console.log(res);
    if (res.code == 200) {
      this.setState({
        setModal: false,
      });
      message.success('修改分类成功');
      this.Tablew.getData({ teamId: this.state.teamId });
    } else {
      message.success('修改分类失败');
      return;
    }
  };
  handleCancel = () => {
    console.log(1);
    this.setState({
      addModal: false,
      setModal: false,
    });
  };
  // clearModalValue=()=>{

  // }

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
      selectList,
      formList,
      subTypeId,
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
          <Breadcrumb.Item>二级分类</Breadcrumb.Item>
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
            teamId: this.state.teamId,
          }}
          pageOjb={true}
          restype={goodsStatus}
          //表格
          queryApi={api_goods.getTwoQueryPage}
          columns={[
            {
              title: '二级分类',
              key: 'subTypeName',
            },

            {
              title: '一级分类',
              key: 'parentTypeName',
              // render: (e) => {
              //   selectList.map((item, ind) => {
              //     console.log(e, item.typeId, item.typeName);

              //     // if (e == item.typeId) {
              //     //   console.log('相同了啊');

              //     return (
              //       <div key={ind}>{item.typeName}</div>
              //     )
              //     // }
              //   });
              // },
            },
            // { title: '分类排序', key: 'typeSortValue' },
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
        <TypeModal
          show={addModal}
          onOk={values => this.judgeCreatePlan(values)}
          onCancel={this.handleCancel}
          formList={formList}
        />
        <TypeModal
          subTypeId={subTypeId}
          onRef={ref => {
            this.child = ref;
          }}
          show={setModal}
          onOk={values => this.judgeCreatePlans(values)}
          onCancel={this.handleCancel}
          formList={formList}
        />
        {/* <Modal
          title="添加分类"
          visible={addModal}
          closable={false}
          onCancel={this.closeAddressModals}
          onOk={this.addressModalsOk}
          width={600}
          maskClosable={false}
        >
          <div style={{ height: '100px' }}>

            <Form {...formItemLayout} ref={this.formRef} style={{ float: 'left' }}>

              <Form.Item
                label="一级分类"
                name="parentTypeId"
                rules={[{ required: true, message: '请选择一级分类' }]}
              >

                <Select
                  placeholder="请选择一级分类"
                >
                  {
                    selectList.map((item, ind) => {
                      return (
                        <Option value={item.typeId} key={ind}>{item.typeName}</Option>

                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="分类名称"
                name="subTypeName"
                rules={[{ required: true, message: '请输入分类名称' }]}
              >
                <Input placeholder="请输入分类名称" style={{ width: 380 }} />
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
          maskClosable={false}

          title="编辑分类"
          visible={setModal}
          closable={false}
          onCancel={this.closedeleteGoodsModals}
          onOk={this.closeGoodsModalsOk}
        >
          <div style={{ height: '240px' }}>

            <Form {...formItemLayout} ref={this.formRef} style={{ float: 'left' }}>
              <Form.Item
                label="一级分类"
                name="parentTypeId"
                rules={[{ required: true, message: '请选择一级分类' }]}
                initialValue={setModalData ? setModalData.parentTypeId : ''}
              >

                <Select
                  placeholder="请选择一级分类"
                >
                  {
                    selectList.map((item, ind) => {
                      return (
                        <Option value={item.typeId} key={ind}>{item.typeName}</Option>

                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="分类名称"
                name="subTypeName"
                rules={[{ required: true, message: '请输入分类名称' }]}
                initialValue={setModalData ? setModalData.subTypeName : ''}
              >
                <Input placeholder="请输入分类名称" style={{ width: 380 }} />
              </Form.Item>

            </Form>
          </div>
        </Modal>
        */}
      </div>
    );
  }
}

export default typeManager;
