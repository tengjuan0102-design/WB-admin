import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'MerchantCenterLegacy',
    path: '/merchant',
    redirect: '/merchant/management',
    meta: {
      hideInMenu: true,
      title: '商户管理',
    },
  },
  {
    name: 'MerchantManagementLegacy',
    path: '/merchant-management',
    redirect: '/merchant/management',
    meta: {
      hideInMenu: true,
      title: '商户管理',
    },
  },
];

export default routes;
