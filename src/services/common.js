import requestw from '@/utils/requestw';
import api_common from './api/common';
import { message } from 'antd';

// 上传文件
export async function uploadAjax(file) {
  return new Promise(async resolve => {
    const formData = new FormData();
    formData.append('file', file);
    let res = await requestw({
      type: 'formdata',
      url: api_common.uploadApi,
      data: formData,
    });
    if (
      res &&
      res.status == 0 &&
      res.data &&
      res.data.basUrl &&
      res.data.list &&
      res.data.list[0] &&
      res.data.list[0].filePath
    ) {
      let url = 'https://' + res.data.basUrl + res.data.list[0].filePath;
      resolve(url);
    } else {
      message.warning('上传失败');
      resolve(null);
    }
  });
}
