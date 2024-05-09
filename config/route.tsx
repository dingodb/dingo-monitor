

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/*',
    redirect: '/home',
  },
  {
    name: '概况',
    path: '/overview',
    component: './General',
    showInMenu: true,
    level: 1,
  },
  {
    name: '集群信息',
    path: '/home',
    component: './Home',
    showInMenu: true,
    level: 2,
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
  {
    name: 'Top SQL',
    path: '/topSql',
    component: './TopSql',
    showInMenu: true,
    level: 1,
  },
  {
    name: 'SQL 语句分析',
    path: '/sqlAnalysis',
    component: './SqlAnalysis',
    showInMenu: true,
    level: 1,
  },
  {
    name: 'SQL 执行计划',
    path: '/sqlAnalysis/sqlDetail',
    component: './SqlDetail',
  },
  {
    name: '日志',
    path: '/log',
    component: './Logs',
    showInMenu: true,
    level: 1,
  },
  {
    name: '事件',
    path: '/event',
    component: './Events',
    showInMenu: true,
    level: 1,
  },
  {
    name: 'login',
    path: '/login',
    component: './Login',
    layout: false
  },
]

