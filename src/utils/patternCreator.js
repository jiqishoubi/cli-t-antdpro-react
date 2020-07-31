//正则判定 pattern
const patternCreator = {
  //手机号
  mobilePhone: {
    pattern: /^1[3-9]\d{9}$/,
  },
  //联系电话 包括 手机 座机
  phone: {
    pattern: /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^1[3-9]\d{9}$/,
  },
  //密码 8-20个字符，包含大、小写字母和数字
  password: {
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S{8,20}$/,
  },
  //邮箱
  email: {
    pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  },
  //数字
  number: {
    pattern: /^[0-9]*$/,
  },
  //正整数
  positiveInteger: {
    pattern: /^\+?[1-9][0-9]*$/,
  },
  //0 正整数
  zeroPositive: {
    pattern: /^([1-9]\d*|[0]{1,1})$/,
  },
  //0 正整数 可以带 小数点
  zeroPositiveDecimal: {
    pattern: /^([1-9]\d*|[0]{1,1})(\.\d{1,2})?$/,
  },
  //正整数||-1（代表无限制）
  positiveIntegerUnlimited: {
    pattern: /^\+?[1-9][0-9]*$|^-1$/,
  },
  //0-100
  zeroToHundred: {
    pattern: /^([1-9]?\d|100)$/,
  },
  //0-100最多两位小数
  zeroToHundredDecimal: {
    pattern: /^(\d|[1-9]\d|100)(\.\d{1,2})?$/,
  },
  //只能输入汉字
  character: {
    pattern: /^[\u4e00-\u9fa5]{0,}$/,
  },
  //金钱
  money: {
    pattern: /^(\d+)((?:\.\d+)?)$/,
  },
  //正数金钱（两位小数）
  positiveMoney: {
    pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
  },
  //允许负数金钱（两位小数）
  canNegativeMoney: {
    pattern: /(^-?[1-9](\d+)?(\.\d{1,2})?$)|(^-?0$)|(^-?\d\.\d{1,2}$)/,
  },
  //营业执照注册号
  businessLicense: {
    pattern: /^[0-9a-zA-Z]{15}$|^[0-9a-zA-Z]{18}$/,
  },
  //IP地址
  IPAddress: {
    pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
  },
  //身份证号
  identityNo: {
    pattern: /^[1-9][0-7]\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,
  },
  //银行卡号
  bankNo: {
    pattern: /^[0-9]{16,19}$/,
  },
  //地址必须以http/https/ftp/ftps开头  网址
  weburl: {
    pattern: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
  },

  //pattern生成器 func---------------------------------------------------------------
  //a-b个汉字
  characterLength: (a, b) => {
    //a b number
    return {
      pattern: new RegExp(`^[\u4e00-\u9fa5]{${a},${b}}$`),
    };
  },
  //a-b个数字
  numberLength: (a, b) => {
    return {
      pattern: new RegExp(`^[0-9]{${a},${b}}$`),
    };
  },
  //文件后缀格式
  fileExtension: (...argus) => {
    //argus 参数  "jpg", "jpeg", "png"
    let regStr = argus.map(str => `.${str}$`).join('|');
    return {
      pattern: new RegExp(regStr),
    };
  },
  //0-100百分比正则
  percentageDecimal: decimalCount => {
    // decimalCount小数位数      不带%号的
    return {
      pattern: new RegExp(`^(100|[1-9]?\d(\.\d{1,${decimalCount}})?)$|0$`),
    };
  },
};

export default patternCreator;
