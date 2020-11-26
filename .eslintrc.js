module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    // add more generic rulesets here, such as:
    // "eslint:recommended",
    // "plugin:vue/recommended" // Use this if you are using Vue.js 2.x.
    "plugin:vue/vue3-recommended",
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-multiple-template-root": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off'
  },
  overrides: [
    {
      files: ['**/tests/*.{j,t}s?(x)', '**/tests/**/*.spec.{j,t}s?(x)', '**/tests/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ]
}