<script lang="ts" setup>
import type { Dayjs } from 'dayjs';

import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ImagePlus, Plus } from '@vben/icons';

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  FormItem,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  TimePicker,
  TreeSelect,
  Upload,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import StandardFormDrawer from '#/components/standard-form-drawer/index.vue';
import StandardFormDisplayField from '#/components/standard-form-drawer/standard-form-display-field.vue';
import StandardFormSection from '#/components/standard-form-drawer/standard-form-section.vue';
import StandardListPage from '#/components/standard-list-page/index.vue';
import StandardFilterItem from '#/components/standard-list-page/standard-filter-item.vue';

defineOptions({ name: 'MerchantManagement' });

const router = useRouter();

type MerchantStatus = 'disabled' | 'enabled';

interface MerchantRecord {
  contactName: string;
  contactPhone: string;
  createdAt: string;
  creatorName: string;
  creatorProvider: string;
  id: string;
  key: string;
  name: string;
  operatorName: string;
  storeCount: number;
  status: MerchantStatus;
}

const RangePicker = DatePicker.RangePicker;
const UploadDragger = Upload.Dragger;

const merchantKeyword = ref('');
const status = ref<'all' | MerchantStatus>('all');
const dateRange = ref<[Dayjs, Dayjs]>();
const providerIds = ref<any[]>([]);
const creatorIds = ref<string[]>([]);

const providerOptions = [
  {
    title: '华东大区',
    value: 'east',
    children: [
      { title: '上海旺宝服务商', value: 'shanghai' },
      { title: '杭州优联服务商', value: 'hangzhou' },
    ],
  },
  {
    title: '华南大区',
    value: 'south',
    children: [
      { title: '深圳智汇服务商', value: 'shenzhen' },
      { title: '广州云启服务商', value: 'guangzhou' },
    ],
  },
];

const creatorOptions = [
  { label: '上海旺宝服务商 / 张敏', value: 'zhangmin' },
  { label: '上海旺宝服务商 / 王晨', value: 'wangchen' },
  { label: '杭州优联服务商 / 李想', value: 'lixiang' },
  { label: '深圳智汇服务商 / 陈晓', value: 'chenxiao' },
];

const columns = [
  { key: 'merchant', title: '商户名称、ID', width: 210 },
  { dataIndex: 'createdAt', key: 'createdAt', title: '创建日期', width: 120 },
  {
    dataIndex: 'storeCount',
    key: 'storeCount',
    title: '门店数量',
    width: 100,
  },
  { dataIndex: 'status', key: 'status', title: '状态', width: 90 },
  { key: 'contact', title: '联系人姓名、手机号', width: 180 },
  { key: 'creator', title: '创建人', width: 210 },
  {
    fixed: 'right' as const,
    key: 'action',
    title: '操作',
    width: 120,
  },
];

const merchants = ref<MerchantRecord[]>([
  {
    contactName: '刘女士',
    contactPhone: '138 0013 8000',
    createdAt: '2026-07-28',
    creatorName: '张敏',
    creatorProvider: '上海旺宝服务商',
    id: 'M20260728001',
    key: '1',
    name: '旺记餐饮管理有限公司',
    operatorName: '刘敏',
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
    operatorName: '陈磊',
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
    operatorName: '周青',
    status: 'disabled',
    storeCount: 1,
  },
  {
    contactName: '林先生',
    contactPhone: '139 2208 5136',
    createdAt: '2026-07-12',
    creatorName: '陈晓',
    creatorProvider: '深圳智汇服务商',
    id: 'M20260712021',
    key: '4',
    name: '南风茶饮',
    operatorName: '林南',
    status: 'enabled',
    storeCount: 7,
  },
]);

const filteredMerchants = computed(() => {
  const keyword = merchantKeyword.value.trim();
  return merchants.value.filter((item) => {
    const matchesKeyword =
      !keyword || item.name.includes(keyword) || item.id === keyword;
    const matchesStatus =
      status.value === 'all' || item.status === status.value;
    return matchesKeyword && matchesStatus;
  });
});

const drawerOpen = ref(false);
const drawerMode = ref<'create' | 'edit' | 'view'>('create');
const editingKey = ref('');
const merchantForm = reactive({
  address: '',
  agreement: false,
  businessEnd: dayjs().hour(22).minute(0).second(0),
  businessStart: dayjs().hour(9).minute(0).second(0),
  fullDay: false,
  city: '',
  contactPhone: '',
  createdAt: '',
  creatorName: '',
  creatorProvider: '',
  district: '',
  industry: undefined as string | undefined,
  merchantStatus: 'enabled' as MerchantStatus,
  name: '',
  operatorName: '',
  province: '',
  storeName: '',
  storePhone: '',
});

const industryOptions = [
  { label: '生鲜水果', value: 'fresh-fruit' },
  { label: '餐饮美食', value: 'food' },
  { label: '商超便利', value: 'retail' },
  { label: '休闲娱乐', value: 'entertainment' },
];

const regionOptions = [
  {
    label: '上海市',
    value: 'shanghai',
    children: [
      {
        label: '上海市',
        value: 'shanghai-city',
        children: [
          { label: '徐汇区', value: 'xuhui' },
          { label: '静安区', value: 'jingan' },
        ],
      },
    ],
  },
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [{ label: '西湖区', value: 'xihu' }],
      },
    ],
  },
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '深圳市',
        value: 'shenzhen',
        children: [{ label: '南山区', value: 'nanshan' }],
      },
    ],
  },
];

const selectedRegion = computed({
  get: () =>
    merchantForm.province && merchantForm.city && merchantForm.district
      ? [merchantForm.province, merchantForm.city, merchantForm.district]
      : [],
  set: (value: string[]) => {
    const [province = '', city = '', district = ''] = value ?? [];
    merchantForm.province = province;
    merchantForm.city = city;
    merchantForm.district = district;
  },
});

const drawerTitle = computed(() => {
  const titles = {
    create: '新增商户',
    edit: '编辑商户',
    view: '查看商户',
  };
  return titles[drawerMode.value];
});

function resetFilters() {
  merchantKeyword.value = '';
  status.value = 'all';
  dateRange.value = undefined;
  providerIds.value = [];
  creatorIds.value = [];
}

function handleDateChange(value: [Dayjs, Dayjs] | [string, string] | null) {
  if (value && dayjs(value[1]).diff(dayjs(value[0]), 'month', true) > 6) {
    message.warning('创建时间范围最多选择半年');
    dateRange.value = undefined;
  }
}

function openCreateDrawer() {
  drawerMode.value = 'create';
  editingKey.value = '';
  merchantForm.name = '';
  merchantForm.operatorName = '';
  merchantForm.contactPhone = '';
  merchantForm.createdAt = '';
  merchantForm.creatorName = '';
  merchantForm.creatorProvider = '';
  merchantForm.merchantStatus = 'enabled';
  merchantForm.storeName = '';
  merchantForm.industry = undefined;
  merchantForm.province = '';
  merchantForm.city = '';
  merchantForm.district = '';
  merchantForm.address = '';
  merchantForm.storePhone = '';
  merchantForm.businessStart = dayjs().hour(9).minute(0).second(0);
  merchantForm.businessEnd = dayjs().hour(22).minute(0).second(0);
  merchantForm.fullDay = false;
  merchantForm.agreement = false;
  drawerOpen.value = true;
}

function openMerchantDrawer(
  mode: 'edit' | 'view',
  record: MerchantRecord | Record<string, any>,
) {
  drawerMode.value = mode;
  editingKey.value = record.key;
  merchantForm.name = record.name;
  merchantForm.operatorName = record.operatorName;
  merchantForm.contactPhone = record.contactPhone.replaceAll(' ', '');
  merchantForm.createdAt = record.createdAt;
  merchantForm.creatorName = record.creatorName;
  merchantForm.creatorProvider = record.creatorProvider;
  merchantForm.merchantStatus = record.status;
  merchantForm.storeName = `${record.name}总店`;
  merchantForm.storePhone = record.contactPhone.replaceAll(' ', '');
  merchantForm.industry = 'food';
  merchantForm.province = 'shanghai';
  merchantForm.city = 'shanghai-city';
  merchantForm.district = 'xuhui';
  merchantForm.address = '上海市徐汇区宜山路 900 号';
  merchantForm.businessStart = dayjs().hour(9).minute(0).second(0);
  merchantForm.businessEnd = dayjs().hour(22).minute(0).second(0);
  merchantForm.fullDay = false;
  merchantForm.agreement = true;
  drawerOpen.value = true;
}

function saveMerchant() {
  if (
    !merchantForm.name.trim() ||
    !merchantForm.operatorName.trim() ||
    !/^1\d{10}$/.test(merchantForm.contactPhone)
  ) {
    message.warning('请完整填写必填信息，并输入正确的手机号');
    return;
  }
  if (
    drawerMode.value === 'create' &&
    (!merchantForm.industry ||
      !merchantForm.province ||
      !merchantForm.city ||
      !merchantForm.district ||
      !merchantForm.address.trim())
  ) {
    message.warning('请完整填写首家门店信息');
    return;
  }
  if (drawerMode.value === 'create' && !merchantForm.agreement) {
    message.warning('请先阅读并同意服务商代注册商户协议');
    return;
  }

  if (drawerMode.value === 'edit') {
    const record = merchants.value.find(
      (item) => item.key === editingKey.value,
    );
    if (record) {
      record.name = merchantForm.name;
      record.operatorName = merchantForm.operatorName;
      record.contactName = merchantForm.operatorName;
      record.contactPhone = merchantForm.contactPhone;
    }
    message.success('商户信息已更新');
  } else {
    const sequence = String(merchants.value.length + 1).padStart(3, '0');
    merchants.value.unshift({
      contactName: merchantForm.operatorName,
      contactPhone: merchantForm.contactPhone,
      createdAt: dayjs().format('YYYY-MM-DD'),
      creatorName: '张敏',
      creatorProvider: '上海旺宝服务商',
      id: `M${dayjs().format('YYYYMMDD')}${sequence}`,
      key: `${Date.now()}`,
      name: merchantForm.name,
      operatorName: merchantForm.operatorName,
      status: 'enabled',
      storeCount: 0,
    });
    message.success('商户已新增');
  }
  drawerOpen.value = false;
}

function deleteMerchant(key: string) {
  merchants.value = merchants.value.filter((item) => item.key !== key);
  message.success('商户已删除');
}

function deleteMerchantFromDetail() {
  deleteMerchant(editingKey.value);
  drawerOpen.value = false;
}

function editMerchantFromDetail() {
  drawerMode.value = 'edit';
}

function openMerchantStores(record: MerchantRecord | Record<string, any>) {
  router.push({
    path: '/merchant/stores',
    query: { merchantId: record.id },
  });
}
</script>

<template>
  <StandardListPage list-title="商户列表" title="商户管理">
    <template #actions>
      <Button type="primary" class="h-10" @click="openCreateDrawer">
        <template #icon><Plus class="size-4" /></template>
        新增商户
      </Button>
    </template>

    <template #filters>
      <StandardFilterItem label="搜索商户">
        <Input
          v-model:value="merchantKeyword"
          allow-clear
          placeholder="请输入商户名称或完整ID"
        />
      </StandardFilterItem>

      <StandardFilterItem label="商户状态">
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

      <StandardFilterItem label="创建时间">
        <RangePicker
          v-model:value="dateRange"
          class="w-full"
          format="YYYY-MM-DD"
          :placeholder="['开始日期', '结束日期']"
          @change="handleDateChange"
        />
      </StandardFilterItem>

      <StandardFilterItem label="所属服务商">
        <TreeSelect
          v-model:value="providerIds"
          class="w-full"
          style="width: 100%"
          allow-clear
          max-tag-count="responsive"
          show-search
          placeholder="请选择所属服务商"
          :tree-data="providerOptions"
          tree-checkable
          tree-check-strictly
          tree-default-expand-all
          tree-node-filter-prop="title"
        />
      </StandardFilterItem>

      <StandardFilterItem label="创建人">
        <Select
          v-model:value="creatorIds"
          allow-clear
          class="w-full"
          mode="multiple"
          max-tag-count="responsive"
          :options="creatorOptions"
          placeholder="搜索并选择创建人"
          show-search
          :filter-option="
            (input: string, option: any) =>
              option.label.toLowerCase().includes(input.toLowerCase())
          "
        />
      </StandardFilterItem>
    </template>

    <template #filter-actions>
      <Button class="h-10" @click="resetFilters">重置</Button>
      <Button class="h-10" type="primary">查询</Button>
    </template>

    <template #table>
      <Table
        :columns="columns"
        :data-source="filteredMerchants"
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
            <div class="font-medium text-foreground">{{ record.name }}</div>
            <div class="mt-1 text-xs text-muted-foreground">
              {{ record.id }}
            </div>
          </template>

          <template v-else-if="column.key === 'status'">
            <Tag :color="record.status === 'enabled' ? 'success' : 'default'">
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
              <Button
                size="small"
                type="link"
                @click="openMerchantDrawer('view', record)"
              >
                详情
              </Button>
              <Button
                size="small"
                type="link"
                @click="openMerchantStores(record)"
              >
                门店
              </Button>
            </Space>
          </template>
        </template>
      </Table>
    </template>
  </StandardListPage>

  <StandardFormDrawer
    v-model:open="drawerOpen"
    :confirm-text="drawerMode === 'create' ? '确认新增' : '保存'"
    :mode="drawerMode"
    :title="drawerTitle"
    @confirm="saveMerchant"
  >
    <StandardFormSection first title="商户信息">
      <FormItem label="商户名称" required>
        <Input
          v-model:value="merchantForm.name"
          :disabled="drawerMode === 'view'"
          :maxlength="50"
          placeholder="请输入商户名称"
        />
      </FormItem>
      <FormItem label="经营者姓名" required>
        <Input
          v-model:value="merchantForm.operatorName"
          :disabled="drawerMode === 'view'"
          :maxlength="20"
          placeholder="请输入经营者姓名"
        />
      </FormItem>
      <FormItem label="经营者手机号" required>
        <Input
          v-model:value="merchantForm.contactPhone"
          :disabled="drawerMode === 'view'"
          :maxlength="11"
          placeholder="请输入手机号"
        />
      </FormItem>
    </StandardFormSection>

    <StandardFormSection v-if="drawerMode === 'create'" title="门店信息">
      <FormItem label="门店名称" required>
        <Input
          v-model:value="merchantForm.storeName"
          :placeholder="merchantForm.name || '默认同商户名称'"
        />
      </FormItem>
      <FormItem label="行业类型" required>
        <Select
          v-model:value="merchantForm.industry"
          :options="industryOptions"
          placeholder="请选择行业类型"
        />
      </FormItem>

      <FormItem label="所在地区" required>
        <Cascader
          v-model:value="selectedRegion"
          :options="regionOptions"
          placeholder="请选择省 / 市 / 区"
          show-search
        />
      </FormItem>

      <FormItem label="详细地址" required>
        <Input
          v-model:value="merchantForm.address"
          placeholder="请输入详细地址"
        />
      </FormItem>

      <FormItem label="门店电话">
        <Input
          v-model:value="merchantForm.storePhone"
          placeholder="默认同经营者手机号"
        />
      </FormItem>
      <FormItem label="营业时间">
        <div class="flex items-center gap-4">
          <div
            v-if="!merchantForm.fullDay"
            class="flex min-w-0 flex-1 items-center gap-2"
          >
            <TimePicker
              v-model:value="merchantForm.businessStart"
              class="flex-1"
              format="HH:mm"
              :minute-step="30"
              :show-now="false"
            />
            <span class="text-muted-foreground">至</span>
            <TimePicker
              v-model:value="merchantForm.businessEnd"
              class="flex-1"
              format="HH:mm"
              :minute-step="30"
              :show-now="false"
            />
          </div>
          <div
            v-else
            class="flex h-8 min-w-0 flex-1 items-center rounded-md bg-[#f5f6f8] px-3 text-sm"
          >
            全天营业
          </div>
          <Checkbox v-model:checked="merchantForm.fullDay">
            24小时营业
          </Checkbox>
        </div>
      </FormItem>

      <FormItem label="门店照片">
        <div class="mb-2 flex h-8 items-center text-xs text-muted-foreground">
          选填，可上传门头照、店内环境等照片
        </div>
        <UploadDragger
          :before-upload="() => false"
          multiple
          accept="image/*"
          class="merchant-photo-upload"
        >
          <div class="merchant-photo-content">
            <ImagePlus class="mb-2 size-6 text-muted-foreground" />
            <div class="text-sm text-muted-foreground">点击上传门店照片</div>
          </div>
        </UploadDragger>
      </FormItem>
    </StandardFormSection>

    <div
      v-if="drawerMode === 'create'"
      class="mt-8 rounded-md bg-[#f5f6f8] px-3 py-3"
    >
      <Checkbox v-model:checked="merchantForm.agreement">
        我已阅读并同意
        <span class="text-primary">《旺宝AI服务商代注册商户协议》</span>
      </Checkbox>
    </div>

    <template #view>
      <StandardFormSection first title="商户信息">
        <StandardFormDisplayField label="商户名称" :value="merchantForm.name" />
        <StandardFormDisplayField
          label="经营者姓名"
          :value="merchantForm.operatorName"
        />
        <StandardFormDisplayField
          label="经营者手机号"
          :value="merchantForm.contactPhone"
        />
      </StandardFormSection>

      <StandardFormSection title="归属和状态">
        <StandardFormDisplayField
          label="所属服务商"
          :value="merchantForm.creatorProvider"
        />
        <StandardFormDisplayField
          label="创建人"
          :value="merchantForm.creatorName"
        />
        <StandardFormDisplayField
          label="创建时间"
          :value="merchantForm.createdAt"
        />
        <StandardFormDisplayField
          label="商户状态"
          :value="merchantForm.merchantStatus === 'enabled' ? '启用' : '停用'"
        />
      </StandardFormSection>
    </template>

    <template #view-actions>
      <Popconfirm
        cancel-text="取消"
        ok-text="删除"
        title="确认删除该商户吗？"
        @confirm="deleteMerchantFromDetail"
      >
        <Button danger>删除</Button>
      </Popconfirm>
      <Button type="primary" @click="editMerchantFromDetail">编辑</Button>
    </template>
  </StandardFormDrawer>
</template>

<style scoped>
.merchant-photo-upload {
  display: block;
  width: 200px;
  height: 150px;
}

.merchant-photo-upload :deep(.ant-upload-drag) {
  height: 100%;
}

.merchant-photo-upload :deep(.ant-upload-btn) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
}

.merchant-photo-upload :deep(.ant-upload-drag-container) {
  display: block;
}

.merchant-photo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
