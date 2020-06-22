module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    // 解构赋值
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: false,
      },
    ],
    eqeqeq: 0, // ===
    'operator-assignment': 0, // 运算符赋值 +=
    'no-param-reassign': 0, // 函数参数的属性赋值
    'jsx-a11y/alt-text': 0, // img必须有alt
    'prefer-template': 0, // 必须使用模板字符串
    'spaced-comment': 0, // 注释//后面必须是空格
    'no-console': 'error', //不能console
    'prefer-const': 0,
    'object-shorthand': 0,
    'no-useless-escape': 0,
    'no-empty': 0, //空语句
    'array-callback-return': 0, //箭头函数返回return
    'consistent-return': 0, //箭头函数返回return
    'no-unused-expressions': 0, //改变参数必须搞个函数？
    'no-restricted-syntax': 0, //不让用for in
    'guard-for-in': 0, //for in >?
    'dot-notation': 0, //不让用 a['b']
    'no-shadow': 0, //已经在上限范围中声明了“index”？
    'react/no-string-refs': 0, //不让用ref
    'no-unneeded-ternary': 0, //不必要的条件表达式  ？ ：
    'react/no-access-state-in-setstate': 0, //
    'no-nested-ternary': 0, //三元表达式
    'no-lonely-if': 0, //
    'react/require-default-props': 0, //
    'no-plusplus': 0, //不让用++可还行
    'class-methods-use-this': 0, //this
    'no-return-assign': 0, //间接导致 onRef=(ref=>this.ref)不能使用
    'react/button-has-type': 0,
    'no-else-return': 0, //不让else return
    'react/jsx-boolean-value': 0, //boolean属性的值必须省略
    'no-continue': 0, //----。。。。。
    'color-hex-length': null, //color 必须三位？
    'order/properties-order': null, //color 必须在background前面？
  },
};
