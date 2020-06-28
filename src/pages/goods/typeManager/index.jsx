import React from 'react';
import { Button, Modal, message, Form, Input } from 'antd';
import './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import TUpload2 from '@/components/T-Upload2';
import { localDB } from '@/utils/utils';
import router from 'umi/router';

const { confirm } = Modal;

class typeManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //-----------------------------------新的///
      addModal: false,
      setModal: false,
      //----------------------上传
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      setModalData: null,
      teamId: localDB.getItem('teamId'),
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.Tablew.getData({ teamId: this.state.teamId });
  }

  modifydata(e) {
    let newObj = {};
    newObj.data = e.data;
    newObj.rowTop = e.total;
    newObj.pageNo = e.pageNum;
    return newObj;
  }

  recordEdit(record) {
    router.push('/goodsAdd?id=' + record.productId);
  }

  onRadioChange = e => {
    let getCode = e.target.value;
    this.setState(
      {
        goodsStatus: getCode,
      },
      () => {
        this.Tablew.getData();
      },
    );
  };

  //上架下架
  upOrDownMethod = () => {};

  closeAddressModals = () => {
    this.setState({
      addModal: false,
    });
  };

  addressModalsOk = async () => {
    const { teamId } = this.state;
    this.formRef.current.validateFields().then(async values => {
      let postdata = {
        ...values,
        teamId: teamId,
        typeImg: values.fileList[0].url,
      };
      let res = await requestw({
        url: api_goods.createGoodsProduct,
        data: postdata,
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
      }
    });
  };

  //关闭删除商品弹框
  closedeleteGoodsModals = () => {
    this.setState({
      setModal: false,
    });
  };

  closeGoodsModalsOk = () => {
    this.formRef.current.validateFields().then(async values => {
      let postdata = {
        typeId: this.state.setModalData.typeId,
        typeName: values.typeName,
        typeSortValue: values.typeSortValue,
        teamId: this.state.teamId,
      };
      if (values.fileList[0] && values.fileList[0].uid) {
        postdata.typeImg = values.fileList[0].url;
      } else {
        postdata.typeImg = values.fileList[0];
      }
      let res = await requestw({
        url: api_goods.updateGoodsProduct,
        data: postdata,
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
      }
    });
  };

  //删除商品接口
  deleteGoods = async e => {
    let that = this;
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
        if (res.code == 200) {
          message.success('删除商品成功');
          that.Tablew.getData();
        } else {
          message.warning('删除商品失败');
        }
      },
    });
  };

  setModal = e => {
    this.setState({
      setModal: true,
      setModalData: e,
    });
  };

  shwoAddModal = () => {
    this.setState({
      addModal: true,
    });
  };

  render() {
    const {
      goodsStatus,
      addModal,
      setModal,
      previewVisible,
      previewTitle,
      previewImage,
      setModalData,
    } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    let pageTiaojian = (
      <>
        <Button style={{}} onClick={this.shwoAddModal}>
          添加分类
        </Button>
      </>
    );
    return (
      <div>
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
      </div>
    );
  }
}

export default typeManager;
