import React from 'react';
import { Modal, message } from 'antd';
import './index.less';
import requestw from '@/utils/requestw';
import api_goods from '@/services/api/goods';
import Tablew from '@/components/Tablew';
import TypeModal from '@/components/TypeModal';
import { localDB } from '@ant-design/icons';
import router from 'umi/router';

const { confirm } = Modal;

class typeManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      setModal: false,
      setModalData: null,
      selectList: [],
      formList: [],
      subTypeId: '',
      teamId: localDB.getItem('teamId'),
    };
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
        // this.getData();
        this.Tablew.getData();
      },
    );
  };

  //上架下架
  upOrDownMethod = () => {};

  closeAddressModals = () => {
    this.formRef.current.resetFields();
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
      };
      let res = await requestw({
        url: api_goods.twoTypeCreate,
        data: postdata,
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

  //关闭删除商品弹框
  closedeleteGoodsModals = () => {
    this.setState(
      {
        setModal: false,
        setModalData: null,
      },
      () => {},
    );
  };

  closeGoodsModalsOk = () => {
    this.formRef.current.validateFields().then(async values => {
      let { teamId } = this.state;
      let postdata = {
        typeId: this.state.setModalData.typeId,
        // ...values,
        typeName: values.typeName,
        typeSortValue: values.typeSortValue,
        teamId: teamId,
        // typeImg: values.fileList[0].url,
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
        let res = await requestw({
          url: api_goods.twoDeleteType + `?typeId=${e.subTypeId}`,
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
    this.child.clear();
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

    this.setState({
      setModal: true,
      formList,
      subTypeId,
    });
  };

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
    }
  };

  //修改
  judgeCreatePlans = async val => {
    let res = await requestw({
      url: api_goods.twoUpdataPorduct,
      data: val,
    });
    if (res.code == 200) {
      this.setState({
        setModal: false,
      });
      message.success('修改分类成功');
      this.Tablew.getData({ teamId: this.state.teamId });
    } else {
      message.success('修改分类失败');
    }
  };

  handleCancel = () => {
    this.setState({
      addModal: false,
      setModal: false,
    });
  };

  render() {
    const { goodsStatus, addModal, setModal, formList, subTypeId } = this.state;

    return (
      <div>
        <Tablew
          onRef={c => (this.Tablew = c)}
          //外部添加查询条件
          // Externalplacement={pageTiaojian}
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
            },
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
      </div>
    );
  }
}

export default typeManager;
