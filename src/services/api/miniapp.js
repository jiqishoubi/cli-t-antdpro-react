const api = {
  getAuthUrlApi: '/goto_auth_url', //获取授权的跳转链接
  getAuthApi: '/thirdPart/callback/jump', //用code授权
  getMiniappInfoApi: '/thirdPart/miniAppInfo', //获取小程序信息

  pushCodeApi: '/uploadProgram', //上传代码
  submitCodeApi: '/commit', //提交审核
  cancelSubmitApi: '/undoCodeAudit', //撤销审核
  publishAppApi: '/releaes', //发布上线
  verifyListApi: '/thirdPart/getWxMiniProgramAuditList', //审核列表

  getExperienceCodeApi: '/getQrcode', //获取体验二维码

  bindTesterApi: '/bindTester', //绑定体验人员
  unbindTesterApi: '/unbindTester', //解绑体验成员
  getTesterApi: '/getTesterList', //获取体验成员列表
};

export default api;
