import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';

// Assign the array to a variable
const eslintConfig = [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
        settings: { react: { version: 'detect' } }, // Automatically detect React version
        plugins: ['react', 'react-hooks', 'react-refresh'], // Plugins should be an array
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react/jsx-no-target-blank': 'off', // Disabling this rule for specific use cases
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
        },
    },
];

// Export the named variable as the default export
export default eslintConfig;
