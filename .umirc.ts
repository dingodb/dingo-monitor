import { defineConfig } from '@umijs/max';
import Routes from './config/route';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes: Routes,
  npmClient: 'pnpm',
  history: { type: "hash" },
  proxy: {
    '/fetchApi': {
      target: 'http://172.20.3.93:13001/',
      changeOrigin: true,
      pathRewrite: { '^/fetchApi': '/' },
    },
  },
});
