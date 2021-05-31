/* eslint-disable import/no-commonjs */
module.exports = {
  root: true,
  extends: [
    '@open-wc/eslint-config',
    // 'eslint-config-prettier',
  ],
  // extends: [
  //   require.resolve('@open-wc/eslint-config'),
  //   require.resolve('eslint-config-prettier'),
  // ],
  // parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module',
  //   ecmaVersion: 8,
  // },
  // env: {
  //   browser: true,
  //   mocha: true,
  //   node: true,
  //   es6: true,
  // },
  // plugins: [
  //   'no-only-tests',
  //   'babel',
  //   'import',
  // ],
  rules: {
    'arrow-parens': [
      'error',
      'always',
      {
        requireForBlockBody: true,
      },
    ],
    'lines-between-class-members': 'error',
    'import/no-nodejs-modules': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: [
          '**/src/**/*.js',
          '**/test/**/*.js',
          '**/*.config.js',
          '**/*.conf.js',
        ],
      },
    ],
    'max-len': ['error', { code: 180 }],
    'class-methods-use-this': 'off',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
  //   'no-undef': 'error',
  //   'comma-dangle': 'warn',
  //   'new-cap': [
  //     'error',
  //     {
  //       properties: false,
  //       capIsNew: false,
  //     },
  //   ],
  //   'object-curly-spacing': [
  //     'error',
  //     'always',
  //   ],
  //   'no-shadow': [
  //     'error',
  //     {
  //       builtinGlobals: true,
  //     },
  //   ],
  // //   'require-jsdoc': ['off', {
  // //     require: {
  // //       FunctionDeclaration: true,
  // //       MethodDefinition: true,
  // //       ClassDeclaration: true,
  // //       ArrowFunctionExpression: true,
  // //       FunctionExpression: true,
  // //     },
  // //   }],
  // //   'no-return-await': 'error',
  // //   'no-template-curly-in-string': 'error',
  // //   indent: [
  // //     'error',
  // //     2,
  // //     {
  // //       SwitchCase: 1,
  // //       VariableDeclarator: 1,
  // //       outerIIFEBody: 0,
  // //       MemberExpression: 0,
  // //     },
  // //   ],
  },
};
