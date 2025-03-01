// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_.*_$', varsIgnorePattern: '^_.*_$' },
            ],
            // '@typescript-eslint/explicit-function-return-type': 'error',
            // '@typescript-eslint/explicit-module-boundary-types': 'error',
            // '@typescript-eslint/explicit-member-accessibility': 'error',
            // '@typescript-eslint/no-inferrable-types': 'error',
            '@/no-extra-semi': 'warn',
            eqeqeq: 'error',
            'keyword-spacing': 'error',
            'space-infix-ops': 'error',
            'prefer-destructuring': 'error',
            'prefer-object-spread': 'error',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'require-await': 'error',
            'no-useless-escape': 'error',
            'no-implicit-coercion': 'error',
            'no-implicit-globals': 'error',
            'no-extra-semi': 'error',
            'no-extra-bind': 'error',
            'no-extra-label': 'error',
            'no-extra-parens': 'error',
            'no-extra-boolean-cast': 'error',
            'no-invalid-this': 'error',
            'no-lone-blocks': 'error',
            'no-loop-func': 'error',
            'no-multi-str': 'error',
            'no-new-func': 'error',
            'no-new-wrappers': 'error',
            'no-octal-escape': 'error',
            'no-proto': 'error',
            'no-redeclare': 'error',
            'no-return-assign': 'error',
            'no-return-await': 'error',
            'no-self-assign': 'error',
            'no-self-compare': 'error',
            'no-sequences': 'error',
            'no-shadow': 'error',
            'no-shadow-restricted-names': 'error',
            'no-throw-literal': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-unneeded-ternary': 'error',
            'no-unused-expressions': 'error',
            'no-unused-labels': 'error',
            'no-useless-call': 'error',
            'no-useless-concat': 'error',
            'no-useless-return': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
            'operator-assignment': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-const': 'error',
            'prefer-template': 'error',
            'guard-for-in': 'error',
            'no-case-declarations': 'error',
            'no-constant-condition': 'error',
            'no-constructor-return': 'error',
            'no-dupe-else-if': 'error',
            'no-dupe-keys': 'error',
            'no-duplicate-case': 'error',
            'no-empty': 'error',
            'no-empty-character-class': 'error',
            'no-ex-assign': 'error',
            'no-fallthrough': 'error',
            'arrow-body-style': ['error', 'as-needed'],
            'arrow-parens': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'constructor-super': 'error',
            'no-class-assign': 'error',
            'no-confusing-arrow': 'error',
            'no-const-assign': 'error',
            'no-dupe-class-members': 'error',
            'padding-line-between-statements': [
                'error',
                // { blankLine: 'always', prev: 'function', next: '*' }, // Blank line after function declarations
                // { blankLine: 'always', prev: 'method', next: '*' }, // Blank line after class methods
                // { blankLine: 'always', prev: 'method', next: 'method' }, // Ensures a blank line between methods
                { blankLine: 'always', prev: '*', next: 'return' }, // Blank line before return statements
                { blankLine: 'always', prev: '*', next: '*' }, // Blank line between all statements
                { blankLine: 'any', prev: 'import', next: 'import' }, // Allows multiple blank lines between imports
            ],
            'no-multiple-empty-lines': [
                'error',
                { max: 2, maxEOF: 1, maxBOF: 1 },
            ],
        },
    },
);
