import requestw from '@/utils/requestw';
import api_miniapp from './api/miniapp';

// 获取授权url
export async function getAuthUrlAjax(postData) {
  return requestw({
    type: 'post',
    url: api_miniapp.getAuthUrlApi,
    data: postData,
  });
}

export async function getAuthAjax(postData) {
  return requestw({
    type: 'get',
    url: api_miniapp.getAuthApi,
    data: postData,
  });
}

export async function getMiniappInfoAjax(appid) {
  return requestw({
    type: 'get',
    url: api_miniapp.getMiniappInfoApi,
    data: { app_id: appid },
  });
}

//上传代码
export async function pushCodeAjax(appid) {
  return requestw({
    url: api_miniapp.pushCodeApi,
    data: { app_id: appid },
  });
}

//提交审核
export async function submitCodeAjax(appid) {
  return requestw({
    url: api_miniapp.submitCodeApi,
    data: { app_id: appid },
  });
}

//撤销审核
export async function cancelSubmitAjax(appid) {
  return requestw({
    url: api_miniapp.cancelSubmitApi,
    data: { app_id: appid },
  });
}

//发布上线
export async function publishAppAjax(appid) {
  return requestw({
    url: api_miniapp.publishAppApi + '/' + appid,
    // data: { authorizerAppid: appid },
  });
}

//审核列表
export async function verifyListAjax(appid) {
  return requestw({
    type: 'get',
    url: api_miniapp.verifyListApi,
    data: { app_id: appid },
  });
}

/**
 * 体验
 */
//审核列表
export async function getExperienceCodeAjax(params) {
  return requestw({
    url: api_miniapp.getExperienceCodeApi,
    data: params,
  });
}
// app_id path

//绑定体验人员
export async function bindTesterAjax(params) {
  return requestw({
    url: api_miniapp.bindTesterApi,
    data: params,
  });
}
// app_id wechatid

//解绑体验人员
export async function unbindTesterAjax(params) {
  return requestw({
    url: api_miniapp.unbindTesterApi,
    data: params,
  });
}
// app_id
// wechatid
// userstr

//获取体验人员
export async function getTesterAjax(appid) {
  return requestw({
    url: api_miniapp.getTesterApi,
    data: { app_id: appid },
  });
}
// app_id
