import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '拓扑',
      path: '/coordinator',
      component: './Coordinator',
    },
    {
      name: 'regions',
      path: '/regionsList',
      component: './RegionsList',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/fetchApi': {
      target: 'http://172.20.3.93:13001/',
      changeOrigin: true,
      pathRewrite: { '^/fetchApi': '/' },
    },
  },
});
