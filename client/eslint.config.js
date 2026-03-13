import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,

  ...svelte.configs['flat/recommended'],

  {
    files: ['**/*.svelte', '**/*.js', '**/*.ts'],
    languageOptions: {
      parser: tsParser
    }
  },

  prettier
]