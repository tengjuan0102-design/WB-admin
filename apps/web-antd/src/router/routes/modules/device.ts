import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'DeviceCenter',
    path: '/device',
    redirect: '/device/mine',
    meta: {
      icon: 'lucide:cpu',
      order: 2,
      title: '设备中心',
    },
    children: [
      {
        name: 'MyDevices',
        path: 'mine',
        component: () => import('#/views/device-center/placeholder.vue'),
        meta: {
          activePath: '/device/mine',
          title: '我的设备',
        },
      },
      {
        name: 'DeviceAllocation',
        path: 'allocation',
        component: () => import('#/views/device-center/placeholder.vue'),
        meta: {
          activePath: '/device/allocation',
          title: '设备调配',
        },
      },
      {
        name: 'DevicePurchase',
        path: 'purchase',
        component: () => import('#/views/device-center/placeholder.vue'),
        meta: {
          activePath: '/device/purchase',
          title: '设备采购',
        },
      },
      {
        name: 'ApprovalCenter',
        path: 'approval',
        component: () => import('#/views/device-center/placeholder.vue'),
        meta: {
          activePath: '/device/approval',
          title: '审批中心',
        },
      },
    ],
  },
];

export default routes;
