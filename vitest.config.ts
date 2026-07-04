import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config'

export default defineConfig({
  test: {
    root: fileURLToPath(new URL('./', import.meta.url)),
    projects: [
      /* UNIT TESTS */
      {
        ...mergeConfig(viteConfig, {
          test: {
            globals: true,
            name: 'unit',
            environment: 'node',
            include: ['src/**/*.unit.{test,spec}.ts'],
            exclude: [...configDefaults.exclude, 'e2e/**'],
          },
        }),
      },
      /* BROWSER (DOM/COMPONENT) TESTS */
      {
        ...mergeConfig(viteConfig, {
          test: {
            globals: true,
            name: 'browser',
            include: ['src/**/*.browser.{test,spec}.ts'],
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
              headless: true,
            },
          },
        }),
      },
    ],
  },
})
