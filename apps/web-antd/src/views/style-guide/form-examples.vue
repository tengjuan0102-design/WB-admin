<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { createIconifyIcon } from '@vben/icons';

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  RadioGroup,
  Select,
  Switch,
  TimePicker,
  Upload,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import StandardFormDrawer from '#/components/standard-form-drawer/index.vue';
import StandardFormSection from '#/components/standard-form-drawer/standard-form-section.vue';

defineOptions({ name: 'FormPageExamples' });

const route = useRoute();
const drawerOpen = ref(false);
const currentStep = ref(0);
const UploadIcon = createIconifyIcon('lucide:image-plus');
const openingStart = ref(dayjs().hour(9).minute(0).second(0));
const openingEnd = ref(dayjs().hour(22).minute(0).second(0));
const typeByRouteName: Record<string, string> = {
  FormBasicExample: 'basic',
  FormDrawerExample: 'drawer',
  FormStepsExample: 'steps',
};
const currentType = computed(
  () => typeByRouteName[String(route.name)] ?? 'basic',
);
const currentName = computed(() => String(route.meta.title ?? '基础表单'));
const stepItems = ['填写商户信息', '填写门店信息', '确认并提交'];
const form = reactive({
  address: '',
  agreement: false,
  category: undefined,
  enabled: true,
  hours24: false,
  name: '',
  owner: '',
  ownerPhone: '',
  region: [],
  remark: '',
  storeName: '',
  storePhone: '',
  tags: [],
  type: 'direct',
});
const regionOptions = [
  {
    children: [{ label: '上海市', value: 'shanghai' }],
    label: '上海',
    value: 'sh',
  },
  {
    children: [{ label: '杭州市', value: 'hangzhou' }],
    label: '浙江',
    value: 'zj',
  },
];

watch(
  currentType,
  (type) => {
    if (type === 'drawer') drawerOpen.value = true;
  },
  { immediate: true },
);

function handleHours24Change(event: { target: { checked: boolean } }) {
  const checked = event.target.checked;
  openingStart.value = dayjs()
    .hour(checked ? 0 : 9)
    .minute(0)
    .second(0);
  openingEnd.value = dayjs()
    .hour(checked ? 23 : 22)
    .minute(checked ? 30 : 0)
    .second(0);
}

function handleOpeningTimeChange() {
  form.hours24 = false;
}
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
          打开表单
        </Button>
      </div>

      <Form
        v-if="currentType === 'basic'"
        class="basic-form w-full"
        :label-col="{ style: { width: '144px' } }"
      >
        <section>
          <h2 class="basic-form-title">商户信息</h2>
          <FormItem label="商户名称" required>
            <Input v-model:value="form.name" placeholder="请输入商户名称" />
          </FormItem>
          <FormItem label="经营者姓名" required>
            <Input v-model:value="form.owner" placeholder="请输入经营者姓名" />
          </FormItem>
          <FormItem label="经营者手机号" required>
            <Input
              v-model:value="form.ownerPhone"
              :maxlength="11"
              placeholder="请输入手机号"
            />
          </FormItem>
        </section>

        <section class="mt-7">
          <h2 class="basic-form-title">门店信息</h2>
          <FormItem label="门店名称" required>
            <Input
              v-model:value="form.storeName"
              placeholder="默认同商户名称"
            />
          </FormItem>
          <FormItem label="行业类型" required>
            <Select
              v-model:value="form.category"
              :options="[
                { label: '餐饮服务', value: 'food' },
                { label: '商超零售', value: 'retail' },
                { label: '生活服务', value: 'service' },
              ]"
              placeholder="请选择行业类型"
            />
          </FormItem>
          <FormItem label="所在地区" required>
            <Cascader
              v-model:value="form.region"
              class="w-full"
              :options="regionOptions"
              placeholder="请选择省 / 市 / 区"
            />
          </FormItem>
          <FormItem label="详细地址" required>
            <Input v-model:value="form.address" placeholder="请输入详细地址" />
          </FormItem>
          <FormItem label="门店电话">
            <Input
              v-model:value="form.storePhone"
              placeholder="默认同经营者手机号"
            />
          </FormItem>
          <FormItem label="营业时间">
            <div class="flex items-center gap-3">
              <TimePicker
                v-model:value="openingStart"
                class="min-w-0 flex-1"
                format="HH:mm"
                :minute-step="30"
                placeholder="开始时间"
                @change="handleOpeningTimeChange"
              />
              <span class="text-muted-foreground">至</span>
              <TimePicker
                v-model:value="openingEnd"
                class="min-w-0 flex-1"
                format="HH:mm"
                :minute-step="30"
                placeholder="结束时间"
                @change="handleOpeningTimeChange"
              />
              <Checkbox
                v-model:checked="form.hours24"
                class="shrink-0"
                @change="handleHours24Change"
              >
                24小时营业
              </Checkbox>
            </div>
          </FormItem>
          <div class="mb-5 max-w-[720px]">
            <div class="mb-3 flex items-center">
              <span
                class="w-36 shrink-0 pr-2 text-right text-sm text-foreground"
              >
                门店照片：
              </span>
              <span class="text-xs text-muted-foreground">
                选填，可上传门头照、店内环境等照片
              </span>
            </div>
            <div class="ml-36">
              <Upload
                list-type="picture-card"
                :before-upload="() => false"
                :show-upload-list="false"
              >
                <div
                  class="flex flex-col items-center gap-2 text-muted-foreground"
                >
                  <UploadIcon class="size-6" />
                  <span class="text-sm text-foreground">上传</span>
                </div>
              </Upload>
            </div>
          </div>
        </section>

        <section class="mt-7">
          <h2 class="basic-form-title">补充设置</h2>
          <FormItem label="经营模式">
            <RadioGroup
              v-model:value="form.type"
              :options="[
                { label: '直营', value: 'direct' },
                { label: '加盟', value: 'franchise' },
                { label: '联营', value: 'joint' },
              ]"
            />
          </FormItem>
          <FormItem label="开业日期">
            <DatePicker class="w-full" placeholder="请选择开业日期" />
          </FormItem>
          <FormItem label="人均消费">
            <InputNumber
              class="w-full"
              :min="0"
              placeholder="请输入人均消费金额（元）"
            />
          </FormItem>
          <FormItem label="门店标签">
            <Select
              v-model:value="form.tags"
              mode="multiple"
              :options="[
                { label: '品牌门店', value: 'brand' },
                { label: '商圈店', value: 'business' },
                { label: '社区店', value: 'community' },
              ]"
              placeholder="请选择门店标签"
            />
          </FormItem>
          <FormItem label="启用状态">
            <Switch v-model:checked="form.enabled" />
          </FormItem>
          <FormItem label="备注">
            <Input.TextArea
              v-model:value="form.remark"
              :maxlength="200"
              :rows="4"
              placeholder="请输入补充说明"
              show-count
            />
          </FormItem>
        </section>

        <div
          class="max-w-[720px] rounded-lg bg-[var(--wb-color-surface-subtle)] px-4 py-3"
        >
          <Checkbox v-model:checked="form.agreement">
            我已阅读并同意
            <a class="text-primary">《旺宝AI服务商代注册商户协议》</a>
          </Checkbox>
        </div>

        <div class="mt-6 ml-36 flex gap-3">
          <Button class="h-10">取消</Button>
          <Button class="h-10" type="primary">确认创建</Button>
        </div>
      </Form>

      <div v-else-if="currentType === 'steps'" class="w-full">
        <ol class="process-steps mb-10">
          <li
            v-for="(item, index) in stepItems"
            :key="item"
            class="process-step"
            :class="{
              'is-active': currentStep === index,
              'is-complete': currentStep > index,
            }"
          >
            <span class="process-step-index">{{ index + 1 }}</span>
            <span>{{ item }}</span>
          </li>
        </ol>

        <Form
          class="mx-auto w-full max-w-[720px]"
          :label-col="{ style: { width: '144px' } }"
        >
          <template v-if="currentStep === 0">
            <FormItem label="商户名称" required>
              <Input v-model:value="form.name" placeholder="请输入商户名称" />
            </FormItem>
            <FormItem label="经营者姓名" required>
              <Input
                v-model:value="form.owner"
                placeholder="请输入经营者姓名"
              />
            </FormItem>
            <FormItem label="经营者手机号" required>
              <Input
                v-model:value="form.ownerPhone"
                :maxlength="11"
                placeholder="请输入手机号"
              />
            </FormItem>
          </template>
          <template v-else-if="currentStep === 1">
            <FormItem label="门店名称" required>
              <Input
                v-model:value="form.storeName"
                placeholder="请输入门店名称"
              />
            </FormItem>
            <FormItem label="行业类型" required>
              <Select
                v-model:value="form.category"
                :options="[
                  { label: '餐饮服务', value: 'food' },
                  { label: '商超零售', value: 'retail' },
                ]"
                placeholder="请选择行业类型"
              />
            </FormItem>
            <FormItem label="所在地区" required>
              <Cascader
                v-model:value="form.region"
                class="w-full"
                :options="regionOptions"
                placeholder="请选择省 / 市 / 区"
              />
            </FormItem>
            <FormItem label="详细地址" required>
              <Input
                v-model:value="form.address"
                placeholder="请输入详细地址"
              />
            </FormItem>
          </template>
          <template v-else>
            <div
              class="rounded-lg bg-[var(--wb-color-surface-subtle)] p-5 text-sm leading-8 text-foreground/80"
            >
              <div>商户名称：{{ form.name || '暂未填写' }}</div>
              <div>经营者：{{ form.owner || '暂未填写' }}</div>
              <div>门店名称：{{ form.storeName || '暂未填写' }}</div>
              <div>
                所在地区：{{
                  form.region.length ? form.region.join(' / ') : '暂未填写'
                }}
              </div>
            </div>
          </template>

          <div class="mt-6 ml-36 flex gap-3">
            <Button v-if="currentStep > 0" @click="currentStep -= 1">
              上一步
            </Button>
            <Button
              v-if="currentStep < 2"
              type="primary"
              @click="currentStep += 1"
            >
              下一步
            </Button>
            <Button v-else type="primary">确认提交</Button>
          </div>
        </Form>
      </div>

      <div
        v-else
        class="rounded-xl bg-[var(--wb-color-surface-subtle)] p-8 text-center text-sm text-muted-foreground"
      >
        抽屉表单不会占用当前页面布局，可通过右上角按钮再次打开。
      </div>

      <StandardFormDrawer
        v-model:open="drawerOpen"
        confirm-text="确认创建"
        title="新增商户"
        :width="720"
        @confirm="drawerOpen = false"
      >
        <StandardFormSection first title="商户信息">
          <FormItem label="商户名称" required>
            <Input v-model:value="form.name" placeholder="请输入商户名称" />
          </FormItem>
          <FormItem label="经营者姓名" required>
            <Input v-model:value="form.owner" placeholder="请输入经营者姓名" />
          </FormItem>
          <FormItem label="经营者手机号" required>
            <Input
              v-model:value="form.ownerPhone"
              :maxlength="11"
              placeholder="请输入手机号"
            />
          </FormItem>
        </StandardFormSection>

        <StandardFormSection title="门店信息">
          <FormItem label="门店名称" required>
            <Input
              v-model:value="form.storeName"
              placeholder="默认同商户名称"
            />
          </FormItem>
          <FormItem label="行业类型" required>
            <Select
              v-model:value="form.category"
              class="w-full"
              :options="[
                { label: '餐饮服务', value: 'food' },
                { label: '商超零售', value: 'retail' },
                { label: '生活服务', value: 'service' },
              ]"
              placeholder="请选择行业类型"
            />
          </FormItem>
          <FormItem label="所在地区" required>
            <Cascader
              v-model:value="form.region"
              class="w-full"
              :options="regionOptions"
              placeholder="请选择省 / 市 / 区"
            />
          </FormItem>
          <FormItem label="详细地址" required>
            <Input v-model:value="form.address" placeholder="请输入详细地址" />
          </FormItem>
          <FormItem label="门店电话">
            <Input
              v-model:value="form.storePhone"
              placeholder="默认同经营者手机号"
            />
          </FormItem>
          <FormItem label="营业时间">
            <div class="flex items-center gap-3">
              <TimePicker
                v-model:value="openingStart"
                class="min-w-0 flex-1"
                format="HH:mm"
                :minute-step="30"
                placeholder="开始时间"
                @change="handleOpeningTimeChange"
              />
              <span class="text-muted-foreground">至</span>
              <TimePicker
                v-model:value="openingEnd"
                class="min-w-0 flex-1"
                format="HH:mm"
                :minute-step="30"
                placeholder="结束时间"
                @change="handleOpeningTimeChange"
              />
              <Checkbox
                v-model:checked="form.hours24"
                class="shrink-0"
                @change="handleHours24Change"
              >
                24小时营业
              </Checkbox>
            </div>
          </FormItem>
          <FormItem label="门店照片">
            <div class="mb-3 text-xs text-muted-foreground">
              选填，可上传门头照、店内环境等照片
            </div>
            <Upload
              list-type="picture-card"
              :before-upload="() => false"
              :show-upload-list="false"
            >
              <div
                class="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <UploadIcon class="size-6" />
                <span class="text-sm text-foreground">上传</span>
              </div>
            </Upload>
          </FormItem>
        </StandardFormSection>

        <StandardFormSection title="补充设置">
          <FormItem label="经营模式">
            <RadioGroup
              v-model:value="form.type"
              :options="[
                { label: '直营', value: 'direct' },
                { label: '加盟', value: 'franchise' },
                { label: '联营', value: 'joint' },
              ]"
            />
          </FormItem>
          <FormItem label="开业日期">
            <DatePicker class="w-full" placeholder="请选择开业日期" />
          </FormItem>
          <FormItem label="人均消费">
            <InputNumber
              class="w-full"
              :min="0"
              placeholder="请输入人均消费金额（元）"
            />
          </FormItem>
          <FormItem label="门店标签">
            <Select
              v-model:value="form.tags"
              class="w-full"
              mode="multiple"
              :options="[
                { label: '品牌门店', value: 'brand' },
                { label: '商圈店', value: 'business' },
                { label: '社区店', value: 'community' },
              ]"
              placeholder="请选择门店标签"
            />
          </FormItem>
          <FormItem label="启用状态">
            <Switch v-model:checked="form.enabled" />
          </FormItem>
          <FormItem label="备注">
            <Input.TextArea
              v-model:value="form.remark"
              :maxlength="200"
              :rows="4"
              placeholder="请输入补充说明"
              show-count
            />
          </FormItem>
          <FormItem :wrapper-col="{ offset: 5, span: 19 }">
            <div
              class="rounded-lg bg-[var(--wb-color-surface-subtle)] px-4 py-3"
            >
              <Checkbox v-model:checked="form.agreement">
                我已阅读并同意
                <a class="text-primary">《旺宝AI服务商代注册商户协议》</a>
              </Checkbox>
            </div>
          </FormItem>
        </StandardFormSection>
      </StandardFormDrawer>
    </div>
  </div>
</template>

<style scoped>
.basic-form-title {
  padding: 8px 12px;
  margin: 0 0 20px;
  font-size: var(--wb-font-size-sm);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-text-strong);
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.basic-form :deep(.ant-form-item) {
  max-width: 720px;
  margin-bottom: 20px;
}

.basic-form :deep(.ant-form-item-control) {
  max-width: 560px;
}

.basic-form :deep(.ant-form-item-label) {
  padding-inline-end: 8px;
}

.basic-form :deep(.ant-form-item-label > label) {
  height: auto;
  white-space: normal;
}

.basic-form :deep(.ant-input-number) {
  width: 100%;
}

.process-steps {
  display: flex;
  width: 100%;
  overflow: hidden;
  list-style: none;
  background: var(--wb-color-surface-muted);
}

.process-step {
  position: relative;
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  min-width: 0;
  max-width: 320px;
  height: 56px;
  padding: 0 30px;
  font-size: var(--wb-font-size-base);
  color: var(--wb-color-text-muted);
  background: var(--wb-color-surface-muted);
}

.process-step::before,
.process-step::after {
  position: absolute;
  top: 50%;
  right: -10px;
  z-index: 1;
  width: 72px;
  height: 2px;
  content: '';
  background: hsl(var(--background));
  transform-origin: right center;
}

.process-step::before {
  transform: translateY(-50%) rotate(58deg);
}

.process-step::after {
  transform: translateY(-50%) rotate(-58deg);
}

.process-step-index {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  font-weight: var(--wb-font-weight-medium);
  color: var(--wb-color-text-muted);
  background: hsl(var(--foreground) / 8%);
  border-radius: 999px;
}

.process-step.is-active {
  font-weight: var(--wb-font-weight-medium);
  color: var(--wb-color-text-strong);
}

.process-step.is-active .process-step-index,
.process-step.is-complete .process-step-index {
  color: white;
  background: var(--wb-color-primary);
}

.process-step.is-complete {
  color: var(--wb-color-text-primary);
}
</style>
