<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import {
  Button,
  Drawer,
  Empty,
  Input,
  message,
  Modal,
  Popconfirm,
  Result,
  Skeleton,
} from 'ant-design-vue';

defineOptions({ name: 'InteractionExamples' });

const modalOpen = ref(false);
const drawerOpen = ref(false);
const state = ref<'empty' | 'error' | 'loading'>('empty');
const route = useRoute();
const showFeedback = computed(() => route.name !== 'InteractionStateExample');
const showStates = computed(() => route.name === 'InteractionStateExample');
const title = computed(() => String(route.meta.title ?? '通用交互'));
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-132px)] w-full rounded-xl bg-background p-5">
      <h1 class="m-0 text-xl font-semibold text-foreground">{{ title }}</h1>

      <section v-if="showFeedback" class="mt-7">
        <h2 class="m-0 text-base font-semibold text-foreground">反馈与浮层</h2>
        <div class="mt-4 flex flex-wrap gap-3">
          <Button type="primary" @click="modalOpen = true">打开弹窗</Button>
          <Button @click="drawerOpen = true">打开抽屉</Button>
          <Popconfirm
            title="确定删除这条数据吗？"
            ok-text="删除"
            cancel-text="取消"
            @confirm="message.success('已删除')"
          >
            <Button danger>删除确认</Button>
          </Popconfirm>
          <Button @click="message.success('操作成功')">成功提示</Button>
          <Button @click="message.error('操作失败，请重试')">错误提示</Button>
        </div>
      </section>

      <section v-if="showStates" class="mt-7">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 class="m-0 text-base font-semibold text-foreground">页面状态</h2>
          <div class="flex gap-2">
            <Button size="small" @click="state = 'empty'">空状态</Button><Button size="small" @click="state = 'loading'">加载中</Button><Button size="small" @click="state = 'error'">错误状态</Button>
          </div>
        </div>
        <div
          class="mt-4 min-h-72 rounded-xl bg-[var(--wb-color-surface-subtle)] p-6"
        >
          <Empty v-if="state === 'empty'" description="暂无数据" />
          <Skeleton
            v-else-if="state === 'loading'"
            active
            :paragraph="{ rows: 6 }"
          />
          <Result
            v-else
            status="error"
            title="加载失败"
            sub-title="数据加载失败，请稍后重试"
          >
            <template #extra>
              <Button type="primary">重新加载</Button>
            </template>
          </Result>
        </div>
      </section>

      <Modal
        v-model:open="modalOpen"
        cancel-text="取消"
        ok-text="确认"
        title="编辑商户信息"
        :width="520"
      >
        <div class="grid gap-5 py-2">
          <label
            class="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 text-sm text-foreground/80"
          >
            <span class="text-right"><span class="text-destructive">*</span> 商户名称</span>
            <Input default-value="旺记餐饮管理有限公司" />
          </label>
          <label
            class="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 text-sm text-foreground/80"
          >
            <span class="text-right"><span class="text-destructive">*</span> 经营者姓名</span>
            <Input default-value="刘敏" />
          </label>
          <label
            class="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 text-sm text-foreground/80"
          >
            <span class="text-right">联系电话</span>
            <Input default-value="138 0013 8000" />
          </label>
        </div>
      </Modal>
      <Drawer v-model:open="drawerOpen" title="查看详情" :width="560">
        <div class="text-sm leading-7 text-foreground/80">
          适合不离开当前列表即可查看或编辑的连续操作。
        </div>
      </Drawer>
    </div>
  </div>
</template>
