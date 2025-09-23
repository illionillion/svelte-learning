import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'docs', // 出力先をdocsに
  },
  base: process.env.GITHUB_PAGES ? '/svelte-learning/' : './'
})
