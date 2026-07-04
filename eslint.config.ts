import { globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default tseslint.config(
  { name: 'app/files-to-lint', files: ['**/*.{ts,mts,tsx}'] },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...tseslint.configs.recommended,

  { ...pluginPlaywright.configs['flat/recommended'], files: ['e2e/**/*.{test,spec}.ts'] },

  {
    files: ['src/**/*.{test,spec}.ts', '**/__mocks__/**/*.ts'],
    plugins: { vitest: pluginVitest },
    languageOptions: { globals: { ...pluginVitest.environments.env.globals } },
    rules: {
      ...pluginVitest.configs.recommended.rules,
    },
  },

  pluginOxlint.configs['flat/recommended'],
  skipFormatting,
)
