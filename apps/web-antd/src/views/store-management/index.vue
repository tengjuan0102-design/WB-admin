<script lang="ts" setup>
import type { Dayjs } from 'dayjs';

import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { Plus, RotateCw, Search } from '@vben/icons';

import {
  Button,
  DatePicker,
  Input,
  message,
  Select,
  Space,
  Table,
  Tag,
} from 'ant-design-vue';

import StandardListPage from '#/components/standard-list-page/index.vue';
import StandardFilterItem from '#/components/standard-list-page/standard-filter-item.vue';

defineOptions({ name: 'StoreManagement' });

const route = useRoute();
const RangePicker = DatePicker.RangePicker;

const storeName = ref('');
const status = ref<'all' | 'disabled' | 'enabled'>('all');
const merchantIds = ref<string[]>([]);
const dateRange = ref<[Dayjs, Dayjs]>();

const merchantOptions = [
  { label: '旺记餐饮管理有限公司', value: 'M20260728001' },
  { label: '麦禾烘焙', value: 'M20260725008' },
  { label: '青川生活超市', value: 'M20260719016' },
  { label: '南风茶饮', value: 'M20260712021' },
];

const currentMerchantName = computed(() => {
  if (merchantIds.value.length !== 1) return '';
  return merchantOptions.find((item) => item.value === merchantIds.value[0])
    ?.label;
});

const columns = [
  { key: 'store', title: '门店名称、ID', width: 210 },
  { dataIndex: 'merchantName', key: 'merchantName', title: '所属商户' },
  { dataIndex: 'address', key: 'address', title: '门店地址', width: 260 },
  { key: 'contact', title: '联系人、手机号', width: 180 },
  { dataIndex: 'status', key: 'status', title: '状态', width: 90 },
  { dataIndex: 'createdAt', key: 'createdAt', title: '创建日期', width: 120 },
  { fixed: 'right' as const, key: 'action', title: '操作', width: 120 },
];

const stores = ref([
  {
    address: '上海市徐汇区虹桥路128号',
    contactName: '刘女士',
    contactPhone: '138 0013 8000',
    createdAt: '2026-07-28',
    id: 'S20260728001',
    key: '1',
    merchantId: 'M20260728001',
    merchantName: '旺记餐饮管理有限公司',
    name: '旺记餐饮·徐汇店',
    status: 'enabled',
  },
  {
    address: '上海市静安区南京西路688号',
    contactName: '陈先生',
    contactPhone: '186 8888 1024',
    createdAt: '2026-07-25',
    id: 'S20260725008',
    key: '2',
    merchantId: 'M20260725008',
    merchantName: '麦禾烘焙',
    name: '麦禾烘焙·静安店',
    status: 'enabled',
  },
  {
    address: '杭州市西湖区文三路48号',
    contactName: '周女士',
    contactPhone: '135 1024 6678',
    createdAt: '2026-07-19',
    id: 'S20260719016',
    key: '3',
    merchantId: 'M20260719016',
    merchantName: '青川生活超市',
    name: '青川生活超市·文三店',
    status: 'disabled',
  },
]);

const filteredStores = computed(() =>
  stores.value.filter((item) => {
    const matchesName =
      !storeName.value || item.name.includes(storeName.value.trim());
    const matchesStatus =
      status.value === 'all' || item.status === status.value;
    const matchesMerchant =
      merchantIds.value.length === 0 ||
      merchantIds.value.includes(item.merchantId);
    return matchesName && matchesStatus && matchesMerchant;
  }),
);

watch(
  () => route.query.merchantId,
  (merchantId) => {
    merchantIds.value =
      typeof merchantId === 'string' && merchantId ? [merchantId] : [];
  },
  { immediate: true },
);

function resetFilters() {
  storeName.value = '';
  status.value = 'all';
  merchantIds.value = [];
  dateRange.value = undefined;
}
</script>

<template>
  <StandardListPage
    list-title="门店列表"
    :title="
      currentMerchantName ? `${currentMerchantName} · 门店列表` : '门店列表'
    "
  >
    <template #actions>
      <Button
        class="h-10"
        type="primary"
        @click="message.info('新增门店功能待完善')"
      >
        <template #icon><Plus class="size-4" /></template>
        新增门店
      </Button>
    </template>

    <template #filters>
      <StandardFilterItem label="门店名称">
        <Input
          v-model:value="storeName"
          allow-clear
          placeholder="请输入门店名称"
        />
      </StandardFilterItem>

      <StandardFilterItem label="门店状态">
        <Select
          v-model:value="status"
          class="w-full"
          :options="[
            { label: '全部状态', value: 'all' },
            { label: '启用', value: 'enabled' },
            { label: '停用', value: 'disabled' },
          ]"
        />
      </StandardFilterItem>

      <StandardFilterItem label="所属商户">
        <Select
          v-model:value="merchantIds"
          class="w-full"
          mode="multiple"
          :options="merchantOptions"
          placeholder="请选择所属商户"
        />
      </StandardFilterItem>

      <StandardFilterItem label="创建时间">
        <RangePicker
          v-model:value="dateRange"
          class="w-full"
          :placeholder="['开始日期', '结束日期']"
        />
      </StandardFilterItem>
    </template>

    <template #filter-actions>
      <Button class="h-10" @click="resetFilters">
        <template #icon><RotateCw class="size-4" /></template>
        重置
      </Button>
      <Button class="h-10" type="primary">
        <template #icon><Search class="size-4" /></template>
        查询
      </Button>
    </template>

    <template #table>
      <Table
        :columns="columns"
        :data-source="filteredStores"
        :pagination="{
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total: number) => `共 ${total} 条`,
        }"
        :scroll="{ x: 1180 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'store'">
            <div class="font-medium text-foreground">{{ record.name }}</div>
            <div class="mt-1 text-xs text-muted-foreground">
              {{ record.id }}
            </div>
          </template>

          <template v-else-if="column.key === 'contact'">
            <div>{{ record.contactName }}</div>
            <div class="mt-1 text-xs text-muted-foreground">
              {{ record.contactPhone }}
            </div>
          </template>

          <template v-else-if="column.key === 'status'">
            <Tag :color="record.status === 'enabled' ? 'success' : 'default'">
              {{ record.status === 'enabled' ? '启用' : '停用' }}
            </Tag>
          </template>

          <template v-else-if="column.key === 'action'">
            <Space :size="4">
              <Button
                size="small"
                type="link"
                @click="message.info('查看功能待完善')"
              >
                查看
              </Button>
              <Button
                size="small"
                type="link"
                @click="message.info('编辑功能待完善')"
              >
                编辑
              </Button>
            </Space>
          </template>
        </template>
      </Table>
    </template>
  </StandardListPage>
</template>
