import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'AccountManagement',
    path: '/account',
    redirect: '/account/allocation',
    meta: {
      icon: 'lucide:users',
      order: 4,
      title: '账号管理',
    },
    children: [
      {
        name: 'AccountAllocation',
        path: 'allocation',
        component: () => import('#/views/account-management/placeholder.vue'),
        meta: {
          activePath: '/account/allocation',
          title: '账号分配',
        },
      },
      {
        name: 'RoleManagement',
        path: 'roles',
        component: () => import('#/views/account-management/placeholder.vue'),
        meta: {
          activePath: '/account/roles',
          title: '角色管理',
        },
      },
      {
        name: 'MyAccount',
        path: 'mine',
        component: () => import('#/views/account-management/placeholder.vue'),
        meta: {
          activePath: '/account/mine',
          title: '我的账号',
        },
      },
    ],
  },
];

export default routes;
