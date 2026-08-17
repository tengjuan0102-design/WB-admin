import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'MerchantCenter',
    path: '/merchant',
    redirect: '/merchant/management',
    meta: {
      icon: 'lucide:store',
      order: 1,
      title: '商户中心',
    },
    children: [
      {
        name: 'MerchantManagement',
        path: 'management',
        component: () => import('#/views/merchant-management/index.vue'),
        meta: {
          activePath: '/merchant/management',
          title: '商户管理',
        },
      },
      {
        name: 'StoreManagement',
        path: 'stores',
        component: () => import('#/views/store-management/index.vue'),
        meta: {
          activePath: '/merchant/stores',
          title: '门店管理',
        },
      },
    ],
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
