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
  },
};
