const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue');

const { defineConfig } = require('vite');
const { fileURLToPath, URL } = require('node:url');

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, 'src', 'renderer'),
  publicDir: 'public',
  server: {
    port: 8080,
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, 'build', 'renderer'),
    emptyOutDir: true,
  },
  plugins: [vuePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/renderer', import.meta.url)),
    },
  },
});

module.exports = config;
