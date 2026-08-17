import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'SubordinateManagement',
    path: '/subordinate',
    redirect: '/subordinate/providers',
    meta: {
      icon: 'lucide:network',
      order: 3,
      title: '下级管理',
    },
    children: [
      {
        name: 'SubordinateProviders',
        path: 'providers',
        component: () => import('#/views/subordinate-management/index.vue'),
        meta: {
          activePath: '/subordinate/providers',
          title: '下级服务商',
        },
      },
    ],
  },
];

export default routes;
