import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), viteSingleFile()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  css: { transformer: 'lightningcss' },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    cssMinify: 'lightningcss',
    modulePreload: { polyfill: false },
  },
})
