module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  globals: {
    setImmediate: true,
    exports: true,
    module: true,
    process: true,
    require: true
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:vue/essential', '@vue/prettier'],
  rules: {},
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint'
  }
}
