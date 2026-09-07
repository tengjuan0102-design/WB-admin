<script lang="ts" setup>
defineOptions({ name: 'StyleConfiguration' });

const colors = [
  {
    label: '品牌主色',
    token: '--wb-color-primary',
    value: 'var(--wb-color-primary)',
  },
  {
    label: '主文字',
    token: '--wb-color-text-primary',
    value: 'var(--wb-color-text-primary)',
  },
  {
    label: '次文字',
    token: '--wb-color-text-secondary',
    value: 'var(--wb-color-text-secondary)',
  },
  {
    label: '弱文字',
    token: '--wb-color-text-muted',
    value: 'var(--wb-color-text-muted)',
  },
  {
    label: '浅层表面',
    token: '--wb-color-surface-subtle',
    value: 'var(--wb-color-surface-subtle)',
  },
  {
    label: '悬停背景',
    token: '--wb-color-nav-bg-hover',
    value: 'var(--wb-color-nav-bg-hover)',
  },
];

const radii = [
  { label: '组件圆角', token: '--radius', value: 'var(--radius)' },
  {
    label: '区块圆角',
    token: '--wb-radius-section',
    value: 'var(--wb-radius-section)',
  },
  {
    label: '页面圆角',
    token: '--wb-radius-page',
    value: 'var(--wb-radius-page)',
  },
];

const spaces = [
  {
    label: '页面横向留白',
    token: '--wb-space-page-x',
    width: 'var(--wb-space-page-x)',
  },
  {
    label: '页面顶部留白',
    token: '--wb-space-page-top',
    width: 'var(--wb-space-page-top)',
  },
  {
    label: '面板内边距',
    token: '--wb-space-panel',
    width: 'var(--wb-space-panel)',
  },
  {
    label: '内容间距',
    token: '--wb-space-content',
    width: 'var(--wb-space-content)',
  },
];
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-104px)] w-full rounded-xl bg-background p-5">
      <div class="mb-7">
        <h1 class="m-0 text-xl font-semibold text-foreground">样式配置</h1>
        <p class="mt-2 mb-0 text-sm text-muted-foreground">
          颜色、圆角和间距均由全局变量统一控制，替换主题配置即可让整套界面同步换肤。
        </p>
      </div>

      <div class="grid gap-5 xl:grid-cols-2">
        <section class="config-section xl:col-span-2">
          <h2 class="config-title">颜色</h2>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in colors" :key="item.token" class="token-card">
              <div
                class="h-16 rounded-lg border border-border"
                :style="{ background: item.value }"
              ></div>
              <div class="mt-3 text-sm font-medium text-foreground">
                {{ item.label }}
              </div>
              <code class="mt-1 block text-xs text-muted-foreground">{{
                item.token
              }}</code>
            </div>
          </div>
        </section>

        <section class="config-section">
          <h2 class="config-title">圆角</h2>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="item in radii" :key="item.token" class="text-center">
              <div
                class="mx-auto h-20 w-full max-w-28 border-2 border-primary/35 bg-primary/[0.06]"
                :style="{ borderRadius: item.value }"
              ></div>
              <div class="mt-3 text-sm text-foreground">{{ item.label }}</div>
              <code class="mt-1 block text-xs text-muted-foreground">{{
                item.token
              }}</code>
            </div>
          </div>
        </section>

        <section class="config-section">
          <h2 class="config-title">间距</h2>
          <div class="space-y-5">
            <div
              v-for="item in spaces"
              :key="item.token"
              class="flex items-center gap-4"
            >
              <div class="w-28 shrink-0 text-sm text-foreground">
                {{ item.label }}
              </div>
              <div class="flex min-w-0 flex-1 items-center gap-3">
                <span
                  class="block h-3 rounded-full bg-primary/25"
                  :style="{ width: item.width }"
                ></span>
                <code class="text-xs text-muted-foreground">{{
                  item.token
                }}</code>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        class="mt-5 rounded-xl border border-primary/10 bg-primary/[0.035] p-5"
      >
        <h2 class="m-0 text-base font-semibold text-foreground">换肤边界</h2>
        <p class="mt-2 mb-0 text-sm leading-6 text-foreground/80">
          页面与组件只引用语义变量，不直接写品牌色、灰阶、圆角或布局间距。后续项目只需覆盖全局主题变量，不需要逐页修改样式。
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.config-section {
  padding: var(--wb-space-panel);
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.config-title {
  margin: 0 0 20px;
  font-size: var(--wb-font-size-base);
  font-weight: var(--wb-font-weight-semibold);
  color: var(--wb-color-text-strong);
}

.token-card {
  padding: 12px;
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: var(--wb-radius-section);
}
</style>
