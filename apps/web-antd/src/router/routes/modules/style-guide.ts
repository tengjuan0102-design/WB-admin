import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'StyleGuide',
    path: '/style-guide',
    component: () => import('#/views/style-guide/index.vue'),
    meta: {
      icon: 'lucide:palette',
      order: 99,
      title: '视觉基准',
    },
  },
];

export default routes;
