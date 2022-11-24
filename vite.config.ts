import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [
    react(),
    Checker({
      typescript: true,
      overlay: false,
      eslint: {
        files: 'src',
        extensions: ['.ts', '.tsx']
      }
    })
  ]
});
