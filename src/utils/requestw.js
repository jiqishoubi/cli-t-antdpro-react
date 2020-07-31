import request from './request';
import { localDB } from './utils';
import { allHostObj, loginStateKey } from './consts';
import { message } from 'antd';

/**
 * 错误处理
 */
export const handleRes = res => {
  if (res.code + '' !== '0') {
    message.warning(res.message || '网络异常');
    return false;
  }
  return true;
};

const requestw = ({
  type = 'post',
  url,
  data,
  headers,
  requestType = 'form', //json form
  timeout = 1000 * 120,
}) => {
  let loginObj = localDB.getItem(loginStateKey);
  const token =
    loginObj && loginObj.loginInfo && loginObj.loginInfo.token ? loginObj.loginInfo.token : null;

  let postType = type == 'formdata' ? 'post' : type;

  let postData = {
    token,
    ...data,
  };
  if (postType !== 'formdata') {
    for (let key in postData) {
      if (postData.hasOwnProperty(key)) {
        if (postData[key] == undefined || postData[key] == null) {
          delete postData[key];
        }
      }
    }
  }

  let postHeaders = {
    // 'Content-Type':'application/json',
    // 'Content-Type':'application/x-www-form-urlencoded',
    ...headers,
  };

  let postUrl = '';
  switch (REACT_APP_ENV) {
    case 'dev':
      postUrl = allHostObj.devHost.host + url;
      break;
    case 'mock':
      postUrl = url;
      break;
    case 'pre':
      postUrl = allHostObj.proHost.host + url;
      break;
    default:
      postUrl = allHostObj.devHost.host + url;
      break;
  }
  if (token) {
    postUrl = postUrl + '?sessionId=' + token;
  }

  //请求
  return request(postUrl, {
    method: postType,
    params: postType == 'get' ? postData : null,
    data: postType == 'post' ? postData : null,
    headers: postHeaders,
    timeout,
    requestType,
  })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return error;
    });
};

export default requestw;
