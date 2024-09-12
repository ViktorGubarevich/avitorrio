import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-multiple-empty-lines': [2, { max: 1 }],
      'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
      'no-restricted-imports': [2, 'echarts', 'echarts-for-react'],
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/prefer-default-export': 0,
      'import/extensions': 0,
      'import/no-unresolved': 0,
      'import/no-extraneous-dependencies': 0,
      'react/jsx-uses-react': 0,
      'react/react-in-jsx-scope': 0,
      'react/jsx-props-no-spreading': [0],
      'react/require-default-props': [0],
      'react/state-in-constructor': [0],
      'react/function-component-definition': [0],
      'react/no-danger': 0,
      'react/prop-types': 0,
      'jsx-a11y/anchor-is-valid': [
        0,
        {
          components: ['a'],
          specialLink: ['href'],
        },
      ],
      'jsx-a11y/click-events-have-key-events': [0],
      'jsx-a11y/no-static-element-interactions': [0],
      'no-shadow': 0,
      'no-use-before-define': 0,
      'no-unused-vars': 0,
      'no-undef': 0,
      'no-bitwise': 0,
      'consistent-return': 0,
      'no-plusplus': 0,
      'no-restricted-globals': [0, 'event', 'pageYOffset'],
      'no-template-curly-in-string': 0,
      'no-control-regex': 0,
      'func-names': ['error', 'never'],
    },
  },
);
