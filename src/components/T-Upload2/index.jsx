/**
 * props:
 * value
 * onChange
 *
 * length 默认8
 */
import React, { Component, useState } from 'react';
import { Upload, Button, Input, Modal, Form, message } from 'antd';
import SublimeVideo from 'react-sublime-video';
import { PlusOutlined } from '@ant-design/icons';
import { uploadAjax } from '@/services/common';
import api_common from '@/services/api/common';
import { globalHost, isIMG, isVIDEO, pathVideoHeader, pathimgHeader } from '@/utils/utils';
import './index.less';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      //modal
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      //loading
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      let value = nextProps.value.map((item, index) => {
        if (typeof item == 'object') {
          return item;
        } else {
          let arr = item.split('/');
          let name = arr[arr.length - 1];
          return {
            uid: -(index + 1),
            name,
            status: 'done',
            url: item,
          };
        }
      });
      this.setState({ fileList: value });
    }
  }

  isImageUrl = file => {
    let url = file.url;
    return isIMG(url || '');
  };

  // //自定义上传
  // handleRequest = async (e) => {
  //   console.log('request', e)
  //   const { fileList } = this.state
  //   let file = e.file
  //   this.setState({ loading: true })
  //   let url = await uploadAjax(file)
  //   this.setState({ loading: false })
  //   if (!url) {
  //     e.onSuccess()
  //     return
  //   }

  //   //file格式
  //   let obj = {
  //     uid: file.uid,
  //     name: file.name,
  //     status: 'done',
  //     url,
  //   }
  //   fileList.push(obj)
  //   console.log('上传成功')
  //   this.setState({
  //     fileList
  //   })
  // };

  //change
  handleChange = e => {
    console.log('change', e);
    const { file, fileList } = e;
    if (file.status == 'uploading' || file.status == 'removed' || file.status == 'done') {
      console.log('执行');
      this.setState({ fileList }, () => {
        if (file.status == 'removed') {
          if (this.props.onChange) {
            this.props.onChange(this.dealFileList(fileList));
          }
        }

        if (file.status == 'done') {
          if (file.response && file.response.status == 0) {
            if (this.props.onChange) {
              this.props.onChange(this.dealFileList(fileList));
            }
          } else {
            let curFileList = this.state.fileList;
            let newFileList = curFileList.filter(obj => obj.uid !== file.uid);
            this.setState({ fileList: newFileList });
            console.log('业务失败', e);
            message.warning('网络异常');
          }
        }
      });
    }
    if (file.status == 'error') {
      let curFileList = this.state.fileList;
      let newFileList = curFileList.filter(obj => obj.uid !== file.uid);
      this.setState({ fileList: newFileList });
      console.log('error', e);
      message.warning('网络异常');
    }
  };

  //处理fileList 发射出去
  dealFileList = fileList => {
    return fileList.map(item => {
      if (item.xhr && item.response) {
        let filePath = item.response.data.list[0].filePath;
        let host = isVIDEO(filePath) ? pathVideoHeader : pathimgHeader;
        let url = host + item.response.data.list[0].filePath; //自定义
        return {
          uid: item.uid,
          name: item.name,
          status: 'done',
          url,
        };
      } else {
        return item;
      }
    });
  };

  //Modal
  openModal = async file => {
    console.log(file);
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  closeModal = () => {
    this.setState({ previewVisible: false });
  };

  /**
   * 渲染
   */
  render() {
    const {
      fileList,
      //modal
      previewVisible,
      previewTitle,
      previewImage,
    } = this.state;
    const { length } = this.props;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <div>
        <Upload
          listType="picture-card"
          isImageUrl={this.isImageUrl}
          fileList={fileList}
          action={`${globalHost()}${api_common.uploadApi}`}
          // customRequest={this.handleRequest}
          onChange={this.handleChange}
          onPreview={this.openModal}
        >
          {fileList.length >= (length || 8) ? null : uploadButton}
        </Upload>
        <Modal
          destroyOnClose
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.closeModal}
        >
          <div id="component_t_upload_2_modal">
            {previewImage && isIMG(previewImage) ? (
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            ) : null}
            {previewImage && isVIDEO(previewImage) ? (
              <SublimeVideo loop style={{ width: '420px', height: '420px' }} src={previewImage} />
            ) : null}
          </div>
        </Modal>
      </div>
    );
  }
}

export default index;
