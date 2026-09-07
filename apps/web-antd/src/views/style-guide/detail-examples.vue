<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import {
  Button,
  DatePicker,
  Descriptions,
  DescriptionsItem,
  Input,
  Popconfirm,
  Select,
  Table,
  Tag,
} from 'ant-design-vue';

import StandardFormDrawer from '#/components/standard-form-drawer/index.vue';
import StandardFormDisplayField from '#/components/standard-form-drawer/standard-form-display-field.vue';
import StandardFormSection from '#/components/standard-form-drawer/standard-form-section.vue';
import StandardFilterItem from '#/components/standard-list-page/standard-filter-item.vue';

defineOptions({ name: 'DetailPageExamples' });

const route = useRoute();
const { RangePicker } = DatePicker;
const typeByRouteName: Record<string, string> = {
  DetailBasicExample: 'basic',
  DetailDrawerExample: 'drawer',
  DetailRelatedExample: 'related',
};
const currentType = computed(
  () => typeByRouteName[String(route.name)] ?? 'basic',
);
const currentName = computed(() => String(route.meta.title ?? '基础详情'));
const drawerOpen = ref(false);

watch(
  currentType,
  (type) => {
    drawerOpen.value = type === 'drawer';
  },
  { immediate: true },
);
const transactionColumns = [
  { dataIndex: 'customer', key: 'customer', title: '顾客姓名', width: 110 },
  { dataIndex: 'phone', key: 'phone', title: '手机号', width: 140 },
  { dataIndex: 'paid', key: 'paid', title: '实收金额(元)', width: 130 },
  { dataIndex: 'refund', key: 'refund', title: '退款金额(元)', width: 130 },
  { dataIndex: 'createdAt', key: 'createdAt', title: '下单时间', width: 170 },
  { dataIndex: 'status', key: 'status', title: '交易状态', width: 110 },
  { dataIndex: 'orderNo', key: 'orderNo', title: '付呗单号', width: 190 },
  { dataIndex: 'payment', key: 'payment', title: '支付方式', width: 110 },
  {
    dataIndex: 'printStatus',
    key: 'printStatus',
    title: '打印状态',
    width: 100,
  },
];
const transactions = [
  {
    createdAt: '2026-07-20 11:31:55',
    customer: '子辛',
    key: '1',
    orderNo: '20260720113150005194',
    paid: '0.10',
    payment: '微信',
    phone: '131 6596 7289',
    printStatus: '未打印',
    refund: '0.10',
    status: '全额退款',
  },
  {
    createdAt: '2026-07-18 19:26:08',
    customer: '陈女士',
    key: '2',
    orderNo: '20260718192608008327',
    paid: '68.00',
    payment: '支付宝',
    phone: '186 8888 1024',
    printStatus: '已打印',
    refund: '0.00',
    status: '支付成功',
  },
];
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-132px)] w-full rounded-xl bg-background p-5">
      <div class="mb-6 flex items-center justify-between gap-4">
        <h1 class="m-0 text-xl font-semibold text-foreground">
          {{ currentName }}
        </h1>
        <Button
          v-if="currentType === 'drawer'"
          type="primary"
          @click="drawerOpen = true"
        >
          打开详情
        </Button>
        <div v-else class="flex gap-2">
          <Button>返回</Button><Button type="primary">编辑</Button>
        </div>
      </div>

      <div
        v-if="currentType !== 'drawer'"
        class="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-[var(--wb-color-surface-subtle)] p-5"
      >
        <div class="min-w-0 flex-1">
          <div class="font-semibold text-foreground">
            {{
              currentType === 'related' ? 'SPA ¥ 0.10' : '旺记餐饮管理有限公司'
            }}
          </div>
          <div class="mt-1 text-sm text-muted-foreground">
            {{
              currentType === 'related'
                ? '收款方案 P20260720001'
                : 'M20260728001'
            }}
          </div>
        </div>
        <Tag :color="currentType === 'related' ? 'warning' : 'success'">
          {{ currentType === 'related' ? '收款中' : '启用' }}
        </Tag>
      </div>

      <div v-if="currentType === 'basic'" class="detail-groups">
        <section>
          <h2 class="detail-section-title">商户信息</h2>
          <Descriptions :column="2">
            <DescriptionsItem label="商户名称">
              旺记餐饮管理有限公司
            </DescriptionsItem>
            <DescriptionsItem label="经营者姓名">刘敏</DescriptionsItem>
            <DescriptionsItem label="经营者手机号">
              138 0013 8000
            </DescriptionsItem>
            <DescriptionsItem label="创建时间">
              2026-07-28 10:30
            </DescriptionsItem>
          </Descriptions>
        </section>

        <section class="mt-7">
          <h2 class="detail-section-title">门店信息</h2>
          <Descriptions :column="2">
            <DescriptionsItem label="门店名称">旺记徐汇总店</DescriptionsItem>
            <DescriptionsItem label="行业类型">餐饮服务</DescriptionsItem>
            <DescriptionsItem label="所在地区">
              上海市 / 上海市 / 徐汇区
            </DescriptionsItem>
            <DescriptionsItem label="门店电话">
              138 0013 8000
            </DescriptionsItem>
            <DescriptionsItem label="详细地址" :span="2">
              宜山路 900 号科技产业园 A 座 1 层
            </DescriptionsItem>
            <DescriptionsItem label="营业时间"> 09:00–22:00 </DescriptionsItem>
            <DescriptionsItem label="24小时营业">否</DescriptionsItem>
            <DescriptionsItem label="门店照片" :span="2">
              <div class="flex gap-3">
                <div
                  v-for="item in 3"
                  :key="item"
                  class="flex size-20 items-center justify-center rounded-lg border border-border bg-[var(--wb-color-surface-subtle)] text-xs text-muted-foreground"
                >
                  门店照片 {{ item }}
                </div>
              </div>
            </DescriptionsItem>
          </Descriptions>
        </section>

        <section class="mt-7">
          <h2 class="detail-section-title">补充设置</h2>
          <Descriptions :column="2">
            <DescriptionsItem label="经营模式">直营</DescriptionsItem>
            <DescriptionsItem label="开业日期">2026-07-28</DescriptionsItem>
            <DescriptionsItem label="人均消费">¥ 68.00</DescriptionsItem>
            <DescriptionsItem label="启用状态">
              <Tag color="success">启用</Tag>
            </DescriptionsItem>
            <DescriptionsItem label="门店标签" :span="2">
              <div class="flex gap-2">
                <Tag>品牌门店</Tag>
                <Tag>商圈店</Tag>
              </div>
            </DescriptionsItem>
            <DescriptionsItem label="备注" :span="2">
              工作日午间客流较多，节假日营业时间以门店公告为准。
            </DescriptionsItem>
          </Descriptions>
        </section>
      </div>

      <template v-else-if="currentType === 'related'">
        <section class="related-overview mb-6 grid gap-6 lg:grid-cols-2">
          <Descriptions :column="1">
            <DescriptionsItem label="所属门店">旺记徐汇总店</DescriptionsItem>
            <DescriptionsItem label="发起人">银行分账手动</DescriptionsItem>
            <DescriptionsItem label="创建时间">
              2026-07-20 11:31:27
            </DescriptionsItem>
            <DescriptionsItem label="截止时间">长期有效</DescriptionsItem>
            <DescriptionsItem label="收款类型">线上收款</DescriptionsItem>
            <DescriptionsItem label="收款笔数限制">不限制</DescriptionsItem>
            <DescriptionsItem label="收款说明">—</DescriptionsItem>
          </Descriptions>
          <div
            class="grid grid-cols-2 content-start gap-x-12 gap-y-8 lg:border-l lg:border-border lg:pl-12"
          >
            <div>
              <div class="text-sm text-muted-foreground">实收笔数</div>
              <div class="mt-2 text-3xl font-semibold text-foreground">36</div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground">退款笔数</div>
              <div class="mt-2 text-3xl font-semibold text-foreground">2</div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground">实收金额(元)</div>
              <div class="mt-2 text-3xl font-semibold text-foreground">
                12,552.00
              </div>
            </div>
            <div>
              <div class="text-sm text-muted-foreground">退款金额(元)</div>
              <div class="mt-2 text-3xl font-semibold text-foreground">
                128.00
              </div>
            </div>
          </div>
        </section>

        <section class="related-filter-panel mb-5">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StandardFilterItem label="下单时间">
              <RangePicker
                class="w-full"
                :placeholder="['开始日期', '结束日期']"
              />
            </StandardFilterItem>
            <StandardFilterItem label="交易状态">
              <Select
                class="w-full"
                default-value="all"
                :options="[
                  { label: '全部交易状态', value: 'all' },
                  { label: '支付成功', value: 'paid' },
                  { label: '全额退款', value: 'refunded' },
                ]"
              />
            </StandardFilterItem>
            <StandardFilterItem label="顾客信息">
              <Input allow-clear placeholder="请输入顾客姓名或手机号" />
            </StandardFilterItem>
            <StandardFilterItem label="打印状态">
              <Select
                class="w-full"
                default-value="all"
                :options="[
                  { label: '全部打印状态', value: 'all' },
                  { label: '已打印', value: 'printed' },
                  { label: '未打印', value: 'unprinted' },
                ]"
              />
            </StandardFilterItem>
          </div>
          <div class="mt-4 flex justify-end gap-3">
            <Button>重置</Button>
            <Button type="primary">查询</Button>
          </div>
        </section>

        <div class="mb-4 flex items-center justify-between gap-4">
          <h2 class="m-0 text-base font-semibold text-foreground">关联交易</h2>
          <Button>导出数据</Button>
        </div>
        <div class="standard-detail-table">
          <Table
            :columns="transactionColumns"
            :data-source="transactions"
            :pagination="{
              current: 1,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total: number) => `共 ${total} 条`,
            }"
            :scroll="{ x: 1190 }"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <Tag
                  :color="record.status === '支付成功' ? 'success' : 'default'"
                >
                  {{ record.status }}
                </Tag>
              </template>
            </template>
          </Table>
        </div>
      </template>

      <div
        v-else
        class="rounded-xl bg-[var(--wb-color-surface-subtle)] p-8 text-center text-sm text-muted-foreground"
      >
        抽屉详情不会打断当前页面，可通过右上角按钮再次打开。
      </div>
    </div>

    <StandardFormDrawer
      v-model:open="drawerOpen"
      mode="view"
      title="商户详情"
      :width="640"
    >
      <template #view>
        <StandardFormSection first title="商户信息">
          <StandardFormDisplayField
            label="商户名称"
            value="旺记餐饮管理有限公司"
          />
          <StandardFormDisplayField label="经营者姓名" value="刘敏" />
          <StandardFormDisplayField
            label="经营者手机号"
            value="138 0013 8000"
          />
        </StandardFormSection>

        <StandardFormSection title="归属和状态">
          <StandardFormDisplayField label="所属服务商" value="上海旺宝服务商" />
          <StandardFormDisplayField label="创建人" value="张敏" />
          <StandardFormDisplayField label="创建时间" value="2026-07-28 10:30" />
          <StandardFormDisplayField label="商户状态" value="启用" />
        </StandardFormSection>
      </template>

      <template #view-actions>
        <Popconfirm
          cancel-text="取消"
          ok-text="删除"
          title="确认删除该商户吗？"
        >
          <Button danger>删除</Button>
        </Popconfirm>
        <Button type="primary">编辑</Button>
      </template>
    </StandardFormDrawer>
  </div>
</template>

<style scoped>
.detail-section-title {
  padding: 8px 12px;
  margin: 0 0 20px;
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-text-strong);
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.detail-groups :deep(.ant-descriptions-item-label) {
  display: inline-flex;
  justify-content: flex-end;
  width: 144px;
  padding-inline-end: 8px;
  color: var(--wb-color-text-muted);
  text-align: right;
}

.detail-groups :deep(.ant-descriptions-item-content) {
  color: var(--wb-color-text-primary);
}

.detail-groups :deep(.ant-descriptions-row > td) {
  padding-bottom: 18px;
}

.related-overview {
  padding: 20px 24px;
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.related-overview :deep(.ant-descriptions-item-label) {
  display: inline-flex;
  justify-content: flex-end;
  width: 120px;
  padding-inline-end: 8px;
  color: var(--wb-color-text-muted);
}

.related-filter-panel {
  padding: var(--wb-space-panel);
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.standard-detail-table :deep(.ant-table-thead > tr > th) {
  font-weight: 600;
  background: var(--wb-color-surface-subtle) !important;
}
</style>
