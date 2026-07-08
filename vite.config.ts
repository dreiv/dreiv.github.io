import { defineConfig } from 'vite-plus';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  staged: { '*': 'vp check --fix' },
  fmt: { singleQuote: true },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [tailwindcss(), viteSingleFile()] as never,
  test: {
    browser: {
      enabled: true,
      provider: playwright() as never,
      instances: [{ browser: 'chromium', headless: true }],
    },
    include: ['src/**/*.spec.ts'],
  },
});
