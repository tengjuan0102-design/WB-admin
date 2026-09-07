import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'ManagementCenter',
    path: '/management',
    redirect: '/merchant/management',
    meta: {
      icon: 'lucide:layout-grid',
      order: 1,
      title: '管理中心',
    },
    children: [
      {
        name: 'DeviceCenter',
        path: '/device',
        redirect: '/device/mine',
        meta: {
          hideInMenu: true,
          hideInTab: true,
          icon: 'lucide:cpu',
          title: '设备中心',
        },
        children: [
          {
            name: 'MyDevices',
            path: '/device/mine',
            component: () => import('#/views/device-center/placeholder.vue'),
            meta: { activePath: '/device/mine', title: '我的设备' },
          },
          {
            name: 'DeviceAllocation',
            path: '/device/allocation',
            component: () => import('#/views/device-center/placeholder.vue'),
            meta: { activePath: '/device/allocation', title: '设备调配' },
          },
          {
            name: 'DevicePurchase',
            path: '/device/purchase',
            component: () => import('#/views/device-center/placeholder.vue'),
            meta: { activePath: '/device/purchase', title: '设备采购' },
          },
          {
            name: 'ApprovalCenter',
            path: '/device/approval',
            component: () => import('#/views/device-center/placeholder.vue'),
            meta: { activePath: '/device/approval', title: '审批中心' },
          },
        ],
      },
      {
        name: 'SubordinateManagement',
        path: '/subordinate',
        redirect: '/subordinate/providers',
        meta: {
          hideInMenu: true,
          hideInTab: true,
          icon: 'lucide:network',
          title: '下级管理',
        },
        children: [
          {
            name: 'SubordinateProviders',
            path: '/subordinate/providers',
            component: () => import('#/views/subordinate-management/index.vue'),
            meta: {
              activePath: '/subordinate/providers',
              title: '下级服务商',
            },
          },
        ],
      },
      {
        name: 'MerchantManagement',
        path: '/merchant/management',
        component: () => import('#/views/merchant-management/index.vue'),
        meta: {
          icon: 'lucide:store',
          activePath: '/merchant/management',
          title: '商户管理',
        },
      },
      {
        name: 'StoreManagement',
        path: '/merchant/stores',
        component: () => import('#/views/store-management/index.vue'),
        meta: {
          activePath: '/merchant/management',
          breadcrumb: [
            { path: '/management', title: '管理中心' },
            { path: '/merchant/management', title: '商户管理' },
            { title: '门店列表' },
          ],
          hideInMenu: true,
          title: '门店列表',
        },
      },
      {
        name: 'AccountManagement',
        path: '/account',
        redirect: '/account/allocation',
        meta: {
          hideInMenu: true,
          icon: 'lucide:users',
          title: '账号管理',
        },
        children: [
          {
            name: 'AccountAllocation',
            path: '/account/allocation',
            component: () =>
              import('#/views/account-management/placeholder.vue'),
            meta: { activePath: '/account/allocation', title: '账号分配' },
          },
          {
            name: 'RoleManagement',
            path: '/account/roles',
            component: () =>
              import('#/views/account-management/placeholder.vue'),
            meta: { activePath: '/account/roles', title: '角色管理' },
          },
          {
            name: 'MyAccount',
            path: '/account/mine',
            component: () =>
              import('#/views/account-management/placeholder.vue'),
            meta: { activePath: '/account/mine', title: '我的账号' },
          },
        ],
      },
    ],
  },
];

export default routes;
