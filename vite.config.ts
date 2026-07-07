import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite-plus'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  // Code Formatting Configuration
  fmt: {
    semi: false,
    singleQuote: true,
  },

  // Global Linting and Type Quality Rules
  lint: {
    plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vitest'],
    categories: {
      correctness: 'error',
    },
    env: {
      browser: true,
      builtin: true,
    },
    ignorePatterns: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    rules: {
      'no-array-constructor': 'error',
      'typescript/ban-ts-comment': 'error',
      'typescript/no-empty-object-type': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-namespace': 'error',
      'typescript/no-require-imports': 'error',
      'typescript/no-unnecessary-type-constraint': 'error',
      'typescript/no-unsafe-function-type': 'error',
    },
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
          'no-var': 'error',
          'prefer-const': 'error',
          'prefer-rest-params': 'error',
          'prefer-spread': 'error',
        },
      },
      {
        files: ['e2e/**/*.{test,spec}.ts'],
        rules: {
          'no-empty-pattern': 'off',
          'playwright/missing-playwright-await': 'error',
          'playwright/no-focused-test': 'error',
          'playwright/no-networkidle': 'error',
          'playwright/no-standalone-expect': 'error',
          'playwright/prefer-web-first-assertions': 'error',
          'playwright/valid-describe-callback': 'error',
          'playwright/valid-expect': 'error',
        },
        jsPlugins: ['eslint-plugin-playwright'],
      },
      {
        files: ['src/**/*.{test,spec}.ts'],
        rules: {
          'vitest/expect-expect': 'error',
          'vitest/no-commented-out-tests': 'error',
          'vitest/no-focused-tests': 'error',
          'vitest/no-identical-title': 'error',
          'vitest/valid-expect': 'error',
        },
        globals: {
          describe: 'writable',
          test: 'writable',
          it: 'writable',
          expect: 'writable',
          vi: 'writable',
          beforeEach: 'writable',
          afterEach: 'writable',
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },

  // Git Hook Pre-commit Pipeline
  staged: {
    '*.ts': ['vp lint --fix -D correctness', 'vp lint --fix', 'vp test related --run', 'vp fmt'],
    '*.{css,json,md,html}': ['vp fmt'],
  },

  // Asset Bundling Performance (Single HTML bundle target)
  plugins: [tailwindcss(), viteSingleFile()] as never,
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
  },
})
