import request from './request';
import { globalHost, localDB } from './utils';
import { allHostObj, loginStateKey } from './consts';

const requestw = ({ type = 'post', url, data, headers, requestType, timeout = 1000 * 120 }) => {
  let postData = {};
  if (type == 'formdata') {
    postData = data;
  } else {
    //过滤一下data
    for (let key in data) {
      if (data[key] == undefined || data[key] == null || data[key] == NaN) {
        delete data[key];
      }
    }
    postData = {
      ...data,
    };
  }

  const token =
    localDB.getItem(loginStateKey) && localDB.getItem(loginStateKey).loginInfo.userOpenId
      ? localDB.getItem(loginStateKey).loginInfo.userOpenId
      : null;
  // const token = '02aa48ad-132f-4f3c-9c70-1a9cf9721f67' //测试

  let postHeaders = {
    ...headers,
    token: token,
  };

  let postUrl = '';
  // console.log(REACT_APP_ENV);
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

  return request(postUrl, {
    method: type == 'formdata' ? 'post' : type,
    params: type == 'get' ? postData : null,
    data: type == 'post' || type == 'formdata' ? postData : null,
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
