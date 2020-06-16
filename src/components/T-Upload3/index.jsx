/**
 * props:
 * callback
 */
import React, { Component } from 'react';
import { Upload, Button, Form, message } from 'antd';
import { uploadAjax } from '@/services/common';
import api_common from '@/services/api/common';
import { globalHost } from '@/utils/utils';

class index extends Component {
  //自定义上传
  handleRequest = async e => {
    console.log('request', e);
    let file = e.file;
    let url = await uploadAjax(file);
    e.onSuccess();
    if (!url) {
      return;
    }

    console.log('上传成功');
    if (this.props.callback) {
      this.props.callback(url);
    }
  };

  // //处理fileList 发射出去
  // dealFileList = (fileList) => {
  //   return fileList.map((item) => {
  //     if (item.xhr && item.response) {
  //       let url = 'https://' + item.response.data.basUrl + item.response.data.list[0].filePath; //自定义
  //       return {
  //         uid: item.uid,
  //         name: item.name,
  //         status: 'done',
  //         url,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });
  // };

  /**
   * 渲染
   */
  render() {
    const { children } = this.props;

    return (
      <div>
        <Upload
          showUploadList={false}
          // action={`${globalHost()}${api_common.uploadApi}`}
          customRequest={this.handleRequest}
          onChange={this.handleChange}
        >
          {children}
        </Upload>
      </div>
    );
  }
}

export default index;
