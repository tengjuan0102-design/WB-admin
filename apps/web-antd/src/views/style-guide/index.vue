<script lang="ts" setup>
import { ref } from 'vue';

import { createIconifyIcon, Plus, Search } from '@vben/icons';

import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Empty,
  Form,
  FormItem,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Textarea,
} from 'ant-design-vue';

defineOptions({ name: 'BasicComponents' });

const TrashIcon = createIconifyIcon('lucide:trash-2');

const modalOpen = ref(false);
const drawerOpen = ref(false);
const selectValue = ref<string>();
const radioValue = ref('启用');
const checked = ref(true);
const switchValue = ref(true);

const columns = [
  { dataIndex: 'name', key: 'name', title: '商户名称' },
  { dataIndex: 'id', key: 'id', title: '商户ID' },
  { dataIndex: 'status', key: 'status', title: '状态', width: 100 },
  { dataIndex: 'createdAt', key: 'createdAt', title: '创建时间', width: 180 },
  { key: 'action', title: '操作', width: 120 },
];

const dataSource = [
  {
    createdAt: '2026-08-18 10:30',
    id: 'M20260818001',
    key: '1',
    name: '上海旺宝示例商户',
    status: '启用',
  },
  {
    createdAt: '2026-08-17 16:20',
    id: 'M20260817002',
    key: '2',
    name: '杭州优联示例商户',
    status: '停用',
  },
];
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-104px)] w-full rounded-xl bg-background p-5">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="m-0 text-xl font-semibold text-foreground">基础组件</h1>
          <p class="mt-2 mb-0 text-sm text-muted-foreground">
            旺宝后台设计模板共用的基础控件及默认状态
          </p>
        </div>
        <Tag color="red">Wangbao UI</Tag>
      </div>

      <div class="guide-grid">
        <section class="guide-section">
          <h2 class="guide-title">按钮</h2>
          <Space wrap :size="12">
            <Button class="h-10" type="primary">
              <template #icon><Plus class="size-4" /></template>
              主要按钮
            </Button>
            <Button class="h-10">次要按钮</Button>
            <Button class="h-10" danger>
              <template #icon><TrashIcon class="size-4" /></template>
              危险操作
            </Button>
            <Button class="h-10" disabled>禁用按钮</Button>
            <Button type="link">文字操作</Button>
          </Space>
        </section>

        <section class="guide-section">
          <h2 class="guide-title">状态标签</h2>
          <Space wrap :size="12">
            <Tag color="success">启用</Tag>
            <Tag color="processing">处理中</Tag>
            <Tag color="warning">待审核</Tag>
            <Tag color="error">已驳回</Tag>
            <Tag>已停用</Tag>
          </Space>
        </section>

        <section class="guide-section guide-section-wide">
          <h2 class="guide-title">表单控件</h2>
          <div class="form-grid">
            <FormItem label="文本输入">
              <Input placeholder="请输入内容" />
            </FormItem>
            <FormItem label="选择器">
              <Select
                v-model:value="selectValue"
                class="w-full"
                :options="[
                  { label: '选项一', value: '1' },
                  { label: '选项二', value: '2' },
                ]"
                placeholder="请选择"
              />
            </FormItem>
            <FormItem label="日期选择">
              <DatePicker class="w-full" placeholder="请选择日期" />
            </FormItem>
            <FormItem label="搜索输入">
              <Input placeholder="输入关键词搜索">
                <template #prefix><Search class="size-4" /></template>
              </Input>
            </FormItem>
            <FormItem label="单选">
              <RadioGroup v-model:value="radioValue">
                <Radio value="启用">启用</Radio>
                <Radio value="停用">停用</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="开关与复选">
              <Space :size="20">
                <Switch v-model:checked="switchValue" />
                <Checkbox v-model:checked="checked">已阅读并同意</Checkbox>
              </Space>
            </FormItem>
          </div>
        </section>

        <section class="guide-section guide-section-wide">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="guide-title m-0">标准表格</h2>
            <Button class="h-10" type="primary">
              <template #icon><Plus class="size-4" /></template>
              新增商户
            </Button>
          </div>
          <Table
            :columns="columns"
            :data-source="dataSource"
            :pagination="false"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <Tag :color="record.status === '启用' ? 'success' : 'default'">
                  {{ record.status }}
                </Tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <Space :size="4">
                  <Button size="small" type="link">详情</Button>
                  <Button size="small" type="link">编辑</Button>
                </Space>
              </template>
            </template>
          </Table>
        </section>

        <section class="guide-section">
          <h2 class="guide-title">弹层</h2>
          <Space :size="12">
            <Button class="h-10" @click="modalOpen = true">打开弹窗</Button>
            <Button class="h-10" @click="drawerOpen = true">打开抽屉</Button>
          </Space>
        </section>

        <section class="guide-section">
          <h2 class="guide-title">空状态</h2>
          <Empty :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无数据" />
        </section>
      </div>
    </div>

    <Modal
      v-model:open="modalOpen"
      title="标准弹窗"
      ok-text="确认"
      cancel-text="取消"
    >
      <p class="m-0 text-sm text-muted-foreground">
        用于二次确认或信息量较少的操作场景。
      </p>
    </Modal>

    <Drawer v-model:open="drawerOpen" title="标准表单抽屉" width="600">
      <Form layout="vertical">
        <FormItem label="商户名称" required>
          <Input placeholder="请输入商户名称" />
        </FormItem>
        <FormItem label="备注">
          <Textarea :rows="4" placeholder="请输入备注" />
        </FormItem>
      </Form>
      <template #footer>
        <div class="flex justify-end gap-3 py-2">
          <Button @click="drawerOpen = false">取消</Button>
          <Button type="primary" @click="drawerOpen = false">确认</Button>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<style scoped>
.guide-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.guide-section {
  min-width: 0;
  padding: var(--wb-space-panel);
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.guide-section-wide {
  grid-column: 1 / -1;
}

.guide-title {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 24px;
}

.form-grid :deep(.ant-form-item) {
  margin-bottom: 20px;
}

:deep(.ant-table-thead > tr > th) {
  font-weight: 600;
  background: var(--wb-color-surface-subtle) !important;
}

@media (max-width: 1023px) {
  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
