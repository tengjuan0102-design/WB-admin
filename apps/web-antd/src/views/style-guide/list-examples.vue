<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { createIconifyIcon, Plus } from '@vben/icons';

import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Tree,
  TreeSelect,
} from 'ant-design-vue';

import StandardFilterItem from '#/components/standard-list-page/standard-filter-item.vue';

defineOptions({ name: 'ListPageExamples' });

const route = useRoute();
const { RangePicker } = DatePicker;
const EditIcon = createIconifyIcon('lucide:pencil');

const typeByRouteName: Record<string, string> = {
  ListTableExample: 'table',
  ListTabsExample: 'tabs',
  ListTreeExample: 'tree',
};
const currentType = computed(
  () => typeByRouteName[String(route.name)] ?? 'table',
);
const currentName = computed(() => String(route.meta.title ?? '标准表格'));

const merchantColumns = [
  { key: 'merchant', title: '商户名称、ID', width: 210 },
  { dataIndex: 'createdAt', key: 'createdAt', title: '创建日期', width: 120 },
  { dataIndex: 'storeCount', key: 'storeCount', title: '门店数量', width: 100 },
  { dataIndex: 'status', key: 'status', title: '状态', width: 90 },
  { key: 'contact', title: '联系人姓名、手机号', width: 180 },
  { key: 'creator', title: '创建人', width: 210 },
  { fixed: 'right' as const, key: 'action', title: '操作', width: 120 },
];

const merchantRows = [
  {
    contactName: '刘女士',
    contactPhone: '138 0013 8000',
    createdAt: '2026-07-28',
    creatorName: '张敏',
    creatorProvider: '上海旺宝服务商',
    id: 'M20260728001',
    key: '1',
    name: '旺记餐饮管理有限公司',
    status: 'enabled',
    storeCount: 12,
  },
  {
    contactName: '陈先生',
    contactPhone: '186 8888 1024',
    createdAt: '2026-07-25',
    creatorName: '王晨',
    creatorProvider: '上海旺宝服务商',
    id: 'M20260725008',
    key: '2',
    name: '麦禾烘焙',
    status: 'enabled',
    storeCount: 4,
  },
  {
    contactName: '周女士',
    contactPhone: '135 1024 6678',
    createdAt: '2026-07-19',
    creatorName: '李想',
    creatorProvider: '杭州优联服务商',
    id: 'M20260719016',
    key: '3',
    name: '青川生活超市',
    status: 'disabled',
    storeCount: 1,
  },
];

const merchantSummary = [
  { label: '商户总数', note: '全部商户', value: '128' },
  { label: '启用商户', note: '占比 90.6%', value: '116' },
  { label: '门店总数', note: '覆盖 12 个城市', value: '463' },
  { label: '本月新增', note: '较上月 +12.5%', value: '18' },
  { label: '停用商户', note: '占比 9.4%', value: '12' },
];

const activeListTab = ref('merchant');
const listTabs = [
  { key: 'merchant', label: '商户对账' },
  { key: 'store', label: '门店对账' },
];
const reconciliationSummary = [
  { label: '收款(元)', note: '36 笔', value: '12,680.00' },
  { label: '退款(元)', note: '2 笔', value: '128.00' },
  { label: '实收金额(元)', note: '已扣除退款', value: '12,552.00' },
  { label: '手续费(元)', note: '综合费率 0.38%', value: '47.70' },
  { label: '结算金额(元)', note: '预计次日到账', value: '12,504.30' },
];
const storeReconciliationSummary = [
  { label: '收款(元)', note: '29 笔', value: '9,860.00' },
  { label: '退款(元)', note: '1 笔', value: '68.00' },
  { label: '实收金额(元)', note: '已扣除退款', value: '9,792.00' },
  { label: '手续费(元)', note: '综合费率 0.38%', value: '37.21' },
  { label: '结算金额(元)', note: '预计次日到账', value: '9,754.79' },
];
const reconciliationColumns = [
  { dataIndex: 'method', key: 'method', title: '收款方式' },
  { dataIndex: 'payments', key: 'payments', title: '收款笔数' },
  { dataIndex: 'paymentAmount', key: 'paymentAmount', title: '收款金额' },
  { dataIndex: 'refunds', key: 'refunds', title: '退款笔数' },
  { dataIndex: 'refundAmount', key: 'refundAmount', title: '退款金额' },
  { dataIndex: 'receivedAmount', key: 'receivedAmount', title: '实收金额' },
  { dataIndex: 'fee', key: 'fee', title: '手续费' },
  { dataIndex: 'settlementAmount', key: 'settlementAmount', title: '结算金额' },
];
const reconciliationRows = [
  {
    fee: '28.30',
    key: 'wechat',
    method: '微信',
    paymentAmount: '7,450.00',
    payments: 21,
    receivedAmount: '7,386.00',
    refundAmount: '64.00',
    refunds: 1,
    settlementAmount: '7,357.70',
  },
  {
    fee: '19.40',
    key: 'alipay',
    method: '支付宝',
    paymentAmount: '5,230.00',
    payments: 15,
    receivedAmount: '5,166.00',
    refundAmount: '64.00',
    refunds: 1,
    settlementAmount: '5,146.60',
  },
];
const storeReconciliationRows = [
  {
    fee: '18.75',
    key: 'xuhui',
    method: '旺记徐汇总店',
    paymentAmount: '4,980.00',
    payments: 14,
    receivedAmount: '4,912.00',
    refundAmount: '68.00',
    refunds: 1,
    settlementAmount: '4,893.25',
  },
  {
    fee: '11.25',
    key: 'jingan',
    method: '静安旗舰店',
    paymentAmount: '2,960.00',
    payments: 9,
    receivedAmount: '2,960.00',
    refundAmount: '0.00',
    refunds: 0,
    settlementAmount: '2,948.75',
  },
  {
    fee: '7.21',
    key: 'pudong',
    method: '浦东体验店',
    paymentAmount: '1,920.00',
    payments: 6,
    receivedAmount: '1,920.00',
    refundAmount: '0.00',
    refunds: 0,
    settlementAmount: '1,912.79',
  },
];
const visibleReconciliationSummary = computed(() =>
  activeListTab.value === 'store'
    ? storeReconciliationSummary
    : reconciliationSummary,
);
const visibleReconciliationColumns = computed(() => [
  {
    ...reconciliationColumns[0],
    title: activeListTab.value === 'store' ? '门店名称' : '收款方式',
  },
  ...reconciliationColumns.slice(1),
]);
const visibleReconciliationRows = computed(() =>
  activeListTab.value === 'store'
    ? storeReconciliationRows
    : reconciliationRows,
);

const providerOptions = [
  {
    children: [
      { title: '上海旺宝服务商', value: 'shanghai' },
      { title: '杭州优联服务商', value: 'hangzhou' },
    ],
    title: '华东大区',
    value: 'east',
  },
];

const creatorOptions = [
  { label: '上海旺宝服务商 / 张敏', value: 'zhangmin' },
  { label: '上海旺宝服务商 / 王晨', value: 'wangchen' },
  { label: '杭州优联服务商 / 李想', value: 'lixiang' },
];

interface OrgNode {
  children?: OrgNode[];
  key: string;
  title: string;
}

const organizationTree = ref<OrgNode[]>([
  {
    key: 'company',
    title: '旺宝商业集团',
    children: [
      {
        key: 'hangzhou',
        title: '杭州市',
        children: [
          { key: 'hangzhou-binjiang', title: '滨江区' },
          {
            key: 'hangzhou-xihu',
            title: '西湖区',
            children: [
              { key: 'hangzhou-xihu-wensan', title: '文三商圈' },
              { key: 'hangzhou-xihu-huanglong', title: '黄龙商圈' },
            ],
          },
        ],
      },
      { key: 'yangzhou', title: '扬州市' },
      { key: 'suzhou', title: '苏州市' },
      { key: 'nanjing', title: '南京市' },
      { key: 'sanya', title: '三亚市' },
    ],
  },
]);
const selectedOrgKeys = ref<(number | string)[]>(['company']);
const expandedOrgKeys = ref<(number | string)[]>([
  'company',
  'hangzhou',
  'hangzhou-xihu',
]);
const selectedMerchantKeys = ref<(number | string)[]>([]);
const orgSearch = ref('');
const organizationQueryInput = ref('');
const merchantQueryInput = ref('');
const merchantQuery = ref('');
const orgDialogOpen = ref(false);
const orgDialogMode = ref<'add-child' | 'add-root' | 'rename'>('add-root');
const orgDialogName = ref('');
const orgDialogTarget = ref<OrgNode>();
let orgKeySeed = 0;

const groupMerchantColumns = [
  { dataIndex: 'name', key: 'name', title: '商户名称' },
  { dataIndex: 'organization', key: 'organization', title: '所属组织' },
  { dataIndex: 'storeCount', key: 'storeCount', title: '门店数量', width: 120 },
  { dataIndex: 'status', key: 'status', title: '状态', width: 100 },
];
const groupMerchantRows = [
  {
    key: '1',
    name: '旺记餐饮管理有限公司',
    organization: '旺宝商业集团',
    status: '启用',
    storeCount: 12,
  },
  {
    key: '2',
    name: '麦禾烘焙',
    organization: '杭州市',
    status: '启用',
    storeCount: 4,
  },
  {
    key: '3',
    name: '青川生活超市',
    organization: '西湖区',
    status: '启用',
    storeCount: 1,
  },
  {
    key: '4',
    name: '云帆零售',
    organization: '扬州市',
    status: '停用',
    storeCount: 7,
  },
  {
    key: '5',
    name: '星海便利',
    organization: '苏州市',
    status: '启用',
    storeCount: 9,
  },
];

function changeMerchantSelection(keys: (number | string)[]) {
  selectedMerchantKeys.value = keys;
}

function findOrgNode(
  key: string,
  nodes = organizationTree.value,
  parent?: OrgNode,
): undefined | { node: OrgNode; parent?: OrgNode } {
  for (const node of nodes) {
    if (node.key === key) return { node, parent };
    const found = node.children && findOrgNode(key, node.children, node);
    if (found) return found;
  }
}

const selectedOrganization = computed(() => {
  const key = String(selectedOrgKeys.value[0] ?? 'company');
  return (
    findOrgNode(key)?.node ??
    organizationTree.value[0] ?? { key: 'company', title: '旺宝商业集团' }
  );
});

const filteredOrganizationTree = computed(() => {
  const keyword = orgSearch.value.trim().toLowerCase();
  if (!keyword) return organizationTree.value;
  const filterNodes = (nodes: OrgNode[]): OrgNode[] =>
    nodes.flatMap((node) => {
      const children = node.children ? filterNodes(node.children) : [];
      return node.title.toLowerCase().includes(keyword) || children.length > 0
        ? [{ ...node, children }]
        : [];
    });
  return filterNodes(organizationTree.value);
});

const filteredGroupMerchantRows = computed(() => {
  const keyword = merchantQuery.value.trim().toLowerCase();
  if (!keyword) return groupMerchantRows;
  return groupMerchantRows.filter((item) =>
    item.name.toLowerCase().includes(keyword),
  );
});

function applyTreeFilters() {
  orgSearch.value = organizationQueryInput.value;
  merchantQuery.value = merchantQueryInput.value;
}

function openOrgDialog(
  mode: 'add-child' | 'add-root' | 'rename',
  node?: OrgNode,
) {
  orgDialogMode.value = mode;
  orgDialogTarget.value = node;
  orgDialogName.value = mode === 'rename' ? (node?.title ?? '') : '';
  orgDialogOpen.value = true;
}

function submitOrgDialog() {
  const name = orgDialogName.value.trim();
  if (!name) return;
  if (orgDialogMode.value === 'rename' && orgDialogTarget.value) {
    orgDialogTarget.value.title = name;
  } else {
    const node: OrgNode = {
      key: `org-${Date.now()}-${orgKeySeed++}`,
      title: name,
    };
    if (orgDialogMode.value === 'add-child' && orgDialogTarget.value) {
      orgDialogTarget.value.children ??= [];
      orgDialogTarget.value.children.push(node);
      expandedOrgKeys.value = [
        ...new Set([...expandedOrgKeys.value, orgDialogTarget.value.key]),
      ];
    } else {
      organizationTree.value.push(node);
    }
    selectedOrgKeys.value = [node.key];
  }
  organizationTree.value = [...organizationTree.value];
  orgDialogOpen.value = false;
}

function deleteOrganization(node: OrgNode) {
  Modal.confirm({
    content: '删除后，该组织下的所有下级组织也会一并移除。',
    okButtonProps: { danger: true },
    okText: '删除',
    title: `删除“${node.title}”？`,
    onOk: () => {
      const result = findOrgNode(node.key);
      const siblings = result?.parent?.children ?? organizationTree.value;
      const index = siblings.findIndex((item) => item.key === node.key);
      if (index !== -1) siblings.splice(index, 1);
      organizationTree.value = [...organizationTree.value];
      selectedOrgKeys.value = [
        result?.parent?.key ?? organizationTree.value[0]?.key ?? '',
      ];
    },
  });
}

function deleteEditingOrganization() {
  if (!orgDialogTarget.value) return;
  const target = orgDialogTarget.value;
  orgDialogOpen.value = false;
  deleteOrganization(target);
}
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div
      class="flex h-[calc(100vh-132px)] min-h-[680px] w-full flex-col rounded-xl bg-background"
      :class="currentType === 'tabs' ? 'px-5 pb-5 pt-2' : 'p-5'"
    >
      <div
        v-if="currentType !== 'tabs'"
        class="mb-5 flex items-center justify-between gap-4"
      >
        <h1 class="m-0 text-xl font-semibold text-foreground">
          {{ currentName }}
        </h1>
        <Button v-if="currentType === 'table'" class="h-10" type="primary">
          <template #icon><Plus class="size-4" /></template>
          新增商户
        </Button>
      </div>

      <section
        :class="
          currentType === 'tree' ? 'flex min-h-0 flex-1 flex-col' : undefined
        "
      >
        <template v-if="currentType === 'table'">
          <div class="standard-filter-panel mb-6">
            <div class="standard-filter-grid">
              <StandardFilterItem label="搜索商户">
                <Input allow-clear placeholder="请输入商户名称或完整ID" />
              </StandardFilterItem>
              <StandardFilterItem label="商户状态">
                <Select
                  class="w-full"
                  default-value="all"
                  :options="[
                    { label: '全部状态', value: 'all' },
                    { label: '启用', value: 'enabled' },
                    { label: '停用', value: 'disabled' },
                  ]"
                />
              </StandardFilterItem>
              <StandardFilterItem label="创建时间">
                <RangePicker
                  class="w-full"
                  format="YYYY-MM-DD"
                  :placeholder="['开始日期', '结束日期']"
                />
              </StandardFilterItem>
              <StandardFilterItem label="所属服务商">
                <TreeSelect
                  allow-clear
                  class="w-full"
                  max-tag-count="responsive"
                  placeholder="请选择所属服务商"
                  show-search
                  :tree-data="providerOptions"
                  tree-check-strictly
                  tree-checkable
                  tree-default-expand-all
                  tree-node-filter-prop="title"
                />
              </StandardFilterItem>
              <StandardFilterItem label="创建人">
                <Select
                  allow-clear
                  class="w-full"
                  max-tag-count="responsive"
                  mode="multiple"
                  :options="creatorOptions"
                  placeholder="搜索并选择创建人"
                  show-search
                />
              </StandardFilterItem>
            </div>
            <div class="mt-5 flex justify-end gap-3">
              <Button class="h-10">重置</Button>
              <Button class="h-10" type="primary">查询</Button>
            </div>
          </div>
          <section class="summary-panel mb-6">
            <p class="m-0 text-xs leading-5 text-muted-foreground">
              汇总数据随当前筛选条件同步更新，统计范围包含当前服务商及其下级组织。
            </p>
            <div class="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              <div
                v-for="(item, index) in merchantSummary"
                :key="item.label"
                class="summary-item"
                :class="{ 'xl:border-l': index > 0 }"
              >
                <div class="text-sm text-muted-foreground">
                  {{ item.label }}
                </div>
                <div class="mt-2 text-2xl font-semibold text-foreground">
                  {{ item.value }}
                </div>
                <div class="mt-1 text-xs text-muted-foreground">
                  {{ item.note }}
                </div>
              </div>
            </div>
          </section>
          <div class="mb-4 text-base font-semibold text-foreground">
            商户列表
          </div>
          <div class="standard-list-table">
            <Table
              :columns="merchantColumns"
              :data-source="merchantRows"
              :pagination="{
                current: 1,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total: number) => `共 ${total} 条`,
              }"
              :scroll="{ x: 1180 }"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'merchant'">
                  <div class="font-medium text-foreground">
                    {{ record.name }}
                  </div>
                  <div class="mt-1 text-xs text-muted-foreground">
                    {{ record.id }}
                  </div>
                </template>
                <template v-else-if="column.key === 'status'">
                  <Tag
                    :color="record.status === 'enabled' ? 'success' : 'default'"
                  >
                    {{ record.status === 'enabled' ? '启用' : '停用' }}
                  </Tag>
                </template>
                <template v-else-if="column.key === 'contact'">
                  <div>{{ record.contactName }}</div>
                  <div class="mt-1 text-xs text-muted-foreground">
                    {{ record.contactPhone }}
                  </div>
                </template>
                <template v-else-if="column.key === 'creator'">
                  <div>{{ record.creatorProvider }}</div>
                  <div class="mt-1 text-xs text-muted-foreground">
                    {{ record.creatorName }}
                  </div>
                </template>
                <template v-else-if="column.key === 'action'">
                  <Space :size="4">
                    <Button size="small" type="link">详情</Button>
                    <Button size="small" type="link">编辑</Button>
                  </Space>
                </template>
              </template>
            </Table>
          </div>
        </template>

        <template v-else-if="currentType === 'tabs'">
          <Tabs v-model:active-key="activeListTab" class="list-tabs">
            <Tabs.TabPane
              v-for="item in listTabs"
              :key="item.key"
              :tab="item.label"
            />
          </Tabs>

          <div class="standard-filter-panel mb-6">
            <div class="standard-filter-grid">
              <StandardFilterItem label="付款时间">
                <RangePicker
                  class="w-full"
                  format="YYYY-MM-DD"
                  :placeholder="['开始日期', '结束日期']"
                />
              </StandardFilterItem>
              <StandardFilterItem
                :label="activeListTab === 'store' ? '门店名称' : '收款方式'"
              >
                <Select
                  allow-clear
                  class="w-full"
                  :placeholder="
                    activeListTab === 'store' ? '请选择门店' : '请选择收款方式'
                  "
                  :options="
                    activeListTab === 'store'
                      ? [
                          { label: '旺记徐汇总店', value: 'xuhui' },
                          { label: '静安旗舰店', value: 'jingan' },
                          { label: '浦东体验店', value: 'pudong' },
                        ]
                      : [
                          { label: '微信', value: 'wechat' },
                          { label: '支付宝', value: 'alipay' },
                          { label: '银行卡', value: 'bank' },
                        ]
                  "
                />
              </StandardFilterItem>
            </div>
            <div class="mt-5 flex justify-end gap-3">
              <Button class="h-10">重置</Button>
              <Button class="h-10" type="primary">查询</Button>
            </div>
          </div>

          <section class="summary-panel mb-6">
            <p class="m-0 text-xs leading-5 text-muted-foreground">
              汇总数据随当前标签页和筛选条件同步更新，仅统计成功状态下的交易数据。
            </p>
            <div class="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              <div
                v-for="item in visibleReconciliationSummary"
                :key="item.label"
                class="summary-item"
              >
                <div class="text-sm text-muted-foreground">
                  {{ item.label }}
                </div>
                <div class="mt-2 text-2xl font-semibold text-foreground">
                  {{ item.value }}
                </div>
                <div class="mt-1 text-xs text-muted-foreground">
                  {{ item.note }}
                </div>
              </div>
            </div>
          </section>

          <div class="mb-4 text-base font-semibold text-foreground">
            {{ activeListTab === 'store' ? '门店汇总' : '各收款方式汇总' }}
          </div>
          <div class="standard-list-table">
            <Table
              :columns="visibleReconciliationColumns"
              :data-source="visibleReconciliationRows"
              :pagination="false"
              :scroll="{ x: 1080 }"
            />
          </div>
        </template>

        <template v-else-if="currentType === 'tree'">
          <div
            class="grid gap-4 rounded-lg bg-[var(--wb-color-surface-subtle)] px-5 py-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <StandardFilterItem label="组织名称">
              <Input
                v-model:value="organizationQueryInput"
                allow-clear
                placeholder="请输入组织名称"
                @blur="applyTreeFilters"
                @press-enter="applyTreeFilters"
              />
            </StandardFilterItem>
            <StandardFilterItem label="商户名称">
              <Input
                v-model:value="merchantQueryInput"
                allow-clear
                placeholder="请输入商户名称"
                @blur="applyTreeFilters"
                @press-enter="applyTreeFilters"
              />
            </StandardFilterItem>
          </div>
          <div
            class="-mx-5 -mb-5 grid min-h-[560px] flex-1 md:grid-cols-[300px_minmax(0,1fr)]"
          >
            <aside class="border-b border-border p-5 md:border-r md:border-b-0">
              <div class="mb-4 flex items-center justify-between gap-2">
                <div class="font-medium text-foreground">组织架构</div>
              </div>
              <div class="pt-4">
                <Tree
                  v-model:expanded-keys="expandedOrgKeys"
                  v-model:selected-keys="selectedOrgKeys"
                  block-node
                  class="organization-tree bg-transparent"
                  :tree-data="filteredOrganizationTree"
                >
                  <template #title="{ key, title }">
                    <div
                      class="group flex min-w-0 flex-1 items-center justify-between gap-1 p-1"
                    >
                      <span class="truncate">{{ title }}</span>
                      <span
                        class="flex shrink-0 items-center opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Button
                          aria-label="编辑组织"
                          class="organization-tree-action"
                          size="small"
                          title="编辑"
                          type="text"
                          @click.stop="
                            openOrgDialog(
                              'rename',
                              findOrgNode(String(key))?.node,
                            )
                          "
                        >
                          <EditIcon class="size-3.5" />
                        </Button>
                        <Button
                          aria-label="添加下级组织"
                          class="organization-tree-action"
                          size="small"
                          title="添加下级"
                          type="text"
                          @click.stop="
                            openOrgDialog(
                              'add-child',
                              findOrgNode(String(key))?.node,
                            )
                          "
                        >
                          <Plus class="size-3.5" />
                        </Button>
                      </span>
                    </div>
                  </template>
                </Tree>
              </div>
            </aside>
            <div class="min-w-0 p-5">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div class="font-medium text-foreground">
                    {{ selectedOrganization.title }}
                  </div>
                  <div class="mt-1 text-xs text-muted-foreground">
                    当前组织及下级组织的商户
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm text-muted-foreground">
                    已选：<strong class="font-medium text-primary">{{
                      selectedMerchantKeys.length
                    }}</strong>
                    个
                  </span>
                  <Button
                    type="primary"
                    :disabled="selectedMerchantKeys.length === 0"
                  >
                    调整组织
                  </Button>
                </div>
              </div>
              <div class="standard-list-table mt-4">
                <Table
                  :columns="groupMerchantColumns"
                  :data-source="filteredGroupMerchantRows"
                  :pagination="false"
                  :row-selection="{
                    selectedRowKeys: selectedMerchantKeys,
                    onChange: changeMerchantSelection,
                  }"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'name'">
                      <span class="font-medium text-foreground">{{
                        record.name
                      }}</span>
                    </template>
                    <template v-else-if="column.key === 'status'">
                      <Tag
                        :color="
                          record.status === '启用' ? 'success' : 'default'
                        "
                      >
                        {{ record.status }}
                      </Tag>
                    </template>
                  </template>
                </Table>
              </div>
            </div>
          </div>
        </template>
      </section>
    </div>

    <Modal
      v-model:open="orgDialogOpen"
      wrap-class-name="organization-dialog"
      :title="
        orgDialogMode === 'rename'
          ? '重命名组织'
          : orgDialogMode === 'add-child'
            ? '新增下级组织'
            : '新增组织'
      "
      ok-text="确认"
      cancel-text="取消"
      @ok="submitOrgDialog"
    >
      <Input
        v-model:value="orgDialogName"
        placeholder="请输入组织名称"
        @press-enter="submitOrgDialog"
      />
      <template #footer>
        <div class="flex items-center justify-between">
          <Button
            v-if="orgDialogMode === 'rename'"
            class="organization-delete-action"
            danger
            type="text"
            @click="deleteEditingOrganization"
          >
            删除组织
          </Button>
          <span v-else></span>
          <div class="flex gap-2">
            <Button @click="orgDialogOpen = false">取消</Button>
            <Button type="primary" @click="submitOrgDialog">确认</Button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
:global(.organization-dialog .ant-modal-content) {
  padding: 24px;
}

:global(.organization-dialog .ant-modal-body) {
  padding: 20px 0 24px;
}

:global(.organization-dialog .ant-modal-footer) {
  margin-top: 0;
}

:global(.organization-dialog .organization-delete-action) {
  justify-content: flex-start;
  width: auto;
  min-width: 0;
  height: auto;
  padding: 0;
  background: transparent !important;
  box-shadow: none !important;
}

:global(.organization-dialog .organization-delete-action:hover),
:global(.organization-dialog .organization-delete-action:focus),
:global(.organization-dialog .organization-delete-action:active) {
  color: hsl(var(--primary)) !important;
  background: transparent !important;
}

.list-tabs :deep(.ant-tabs-tab) {
  font-size: 18px;
}

.standard-filter-panel {
  padding: var(--wb-space-panel);
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.standard-filter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.summary-panel {
  padding: var(--wb-space-panel);
  background: var(--wb-color-surface-subtle);
  border: 1px solid hsl(var(--border));
  border-radius: var(--wb-radius-section);
}

.summary-item {
  min-width: 0;
  padding: 8px 20px;
  border-color: hsl(var(--border));
}

@media (min-width: 1024px) {
  .standard-filter-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1536px) {
  .standard-filter-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.standard-list-table :deep(.ant-table-thead > tr > th) {
  font-weight: 600;
  background: var(--wb-color-surface-subtle) !important;
}

.standard-list-table :deep(.ant-table-tbody > tr:hover > td) {
  background: var(--wb-color-row-hover) !important;
}

.organization-tree :deep(.ant-tree-node-content-wrapper) {
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 34px;
  padding: 5px 8px;
  border-radius: 8px;
}

.organization-tree :deep(.ant-tree-treenode) {
  align-items: center;
  width: 100%;
  min-height: 36px;
  padding: 1px 0;
}

.organization-tree :deep(.ant-tree-switcher) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  min-height: 36px;
}

.organization-tree :deep(.ant-tree-indent-unit) {
  width: 18px;
}

.organization-tree :deep(.ant-tree-title) {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
}

.organization-tree :deep(.organization-tree-action) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  min-width: 24px;
  height: 24px;
  padding: 0;
  line-height: 1;
  vertical-align: middle;
  color: hsl(var(--primary));
  border-radius: 6px;
}

.organization-tree :deep(.organization-tree-action .anticon),
.organization-tree :deep(.organization-tree-action svg) {
  display: block;
  margin: 0;
}

.organization-tree
  :deep(.ant-tree-node-content-wrapper.ant-tree-node-selected) {
  color: hsl(var(--primary));
  background: hsl(var(--primary) / 10%);
}
</style>
