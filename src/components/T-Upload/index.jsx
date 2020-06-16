/**
 * props:
 * onChange
 */
import React, { Component, useState } from 'react';
import { Upload, Button, Icon, Input } from 'antd';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      imgUrl: '',
    };
  }

  handleRequest = e => {
    console.log('request', e);
    this.setState(
      {
        loading: true,
        imgUrl: '',
      },
      () => {
        this.imgUrlChange();
      },
    );
    setTimeout(() => {
      this.setState(
        {
          loading: false,
          imgUrl: 'https://cdn.s.bld365.com/greecardindex_banner_new2_03_01.png',
        },
        () => {
          this.imgUrlChange();
        },
      );
    }, 1000);
  };

  handleChange = e => {
    console.log('change', e);
  };

  imgUrlChange = () => {
    const { onUploadChange } = this.props;
    if (onUploadChange) {
      onUploadChange(this.state.imgUrl);
    }
  };

  render() {
    const { loading, list, imgUrl } = this.state;

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <Upload
        accept="image/jpg,image/jpeg,image/png"
        listType="picture-card"
        showUploadList={false}
        onChange={this.handleChange}
        customRequest={this.handleRequest}
      >
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default index;
