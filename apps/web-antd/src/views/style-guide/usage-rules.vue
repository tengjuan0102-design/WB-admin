<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import { updatePreferences } from '@vben/preferences';

defineOptions({ name: 'UsageRules' });

const route = useRoute();

const navigationTypes = [
  {
    key: 'folded',
    name: '折叠侧栏',
    summary: '一级与子级纵向嵌套，内容空间最充足。',
    suitable: '两层以内、中小型后台',
  },
  {
    key: 'parallel',
    name: '并列侧栏',
    summary: '一级和后续层级分栏展示，导航上下文更清楚。',
    suitable: '模块多、二三级入口需长期可见',
  },
  {
    key: 'top-folded',
    name: '顶部 + 折叠侧栏',
    summary: '顶部切换大模块，侧栏承载模块内菜单。',
    suitable: '跨模块切换频繁、模块内部较简单',
  },
  {
    key: 'top-parallel',
    name: '顶部 + 并列侧栏',
    summary: '顶部、一级侧栏和子级侧栏共同承载复杂层级。',
    suitable: '大型宽屏平台、菜单达到三级以上',
  },
];

const typeByRouteName: Record<string, string> = {
  NavigationFolded: 'folded',
  NavigationParallel: 'parallel',
  NavigationTopFolded: 'top-folded',
  NavigationTopParallel: 'top-parallel',
};
const currentType = computed(
  () => typeByRouteName[String(route.name)] ?? 'folded',
);
const currentNavigation = computed(
  () =>
    navigationTypes.find((item) => item.key === currentType.value) ??
    navigationTypes[0] ?? {
      key: 'folded',
      name: '折叠侧栏',
      summary: '一级与子级纵向嵌套，内容空间最充足。',
      suitable: '两层以内、中小型后台',
    },
);

watch(
  currentType,
  (type) => {
    const parallel = type.endsWith('parallel');
    const topMenuEnable = type.startsWith('top-');
    updatePreferences({
      app: {
        layout: parallel
          ? 'sidebar-mixed-nav'
          : topMenuEnable
            ? 'header-mixed-nav'
            : 'header-sidebar-nav',
      },
      navigation: { topMenuEnable },
      sidebar: { enable: true, parallel },
    });
  },
  { immediate: true },
);

const selectionAdvice = [
  {
    choice: '默认优先',
    name: '折叠侧栏',
    reason: '结构简单、占用空间少，能覆盖大多数中小型后台。',
  },
  {
    choice: '层级较多',
    name: '并列侧栏',
    reason: '二三级入口持续可见，用户不容易丢失当前位置。',
  },
  {
    choice: '跨大模块',
    name: '增加顶部菜单',
    reason: '只有一级模块切换非常频繁时才使用，避免重复导航。',
  },
];
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-132px)] w-full rounded-xl bg-background p-5">
      <h1 class="m-0 text-xl font-semibold text-foreground">
        {{ currentNavigation.name }}
      </h1>
      <p class="mt-2 mb-0 text-sm text-muted-foreground">
        {{ currentNavigation.summary }}
      </p>

      <section class="mt-7">
        <h2 class="m-0 text-base font-semibold text-foreground">常用排布</h2>
        <div class="mt-4 grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
          <article
            :key="currentNavigation.key"
            class="overflow-hidden rounded-xl border border-border bg-background"
          >
            <div class="h-36 bg-muted/40 p-3">
              <div
                class="flex h-full overflow-hidden rounded-lg border border-border bg-background shadow-sm"
                :class="
                  currentNavigation.key.startsWith('top-') ? 'flex-col' : ''
                "
              >
                <div
                  v-if="currentNavigation.key.startsWith('top-')"
                  class="flex h-7 shrink-0 items-center gap-2 border-b border-border px-2"
                >
                  <span class="size-2 rounded-sm bg-primary"></span>
                  <span class="h-1.5 w-8 rounded bg-foreground/20"></span>
                  <span class="h-1.5 w-7 rounded bg-foreground/10"></span>
                  <span class="h-1.5 w-7 rounded bg-foreground/10"></span>
                </div>
                <div class="flex min-h-0 flex-1">
                  <div class="w-12 shrink-0 border-r border-border p-2">
                    <div class="h-4 rounded bg-primary/15"></div>
                    <div class="mt-2 h-2 rounded bg-foreground/10"></div>
                    <div class="mt-2 h-2 rounded bg-foreground/10"></div>
                    <div class="mt-2 h-2 rounded bg-foreground/10"></div>
                  </div>
                  <div
                    v-if="
                      currentNavigation.key === 'parallel' ||
                      currentNavigation.key === 'top-parallel'
                    "
                    class="w-14 shrink-0 border-r border-border p-2"
                  >
                    <div class="h-2 rounded bg-primary/30"></div>
                    <div class="mt-2 h-2 rounded bg-foreground/10"></div>
                    <div class="mt-2 h-2 rounded bg-foreground/10"></div>
                    <div class="mt-3 h-2 rounded bg-foreground/20"></div>
                    <div class="mt-2 h-2 rounded bg-foreground/10"></div>
                  </div>
                  <div class="flex-1 p-3">
                    <div class="h-3 w-16 rounded bg-foreground/15"></div>
                    <div class="mt-3 h-10 rounded-md bg-muted/70"></div>
                    <div class="mt-2 h-5 rounded-md bg-muted/50"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4">
              <div class="flex items-center justify-between gap-3">
                <h3 class="m-0 text-sm font-semibold text-foreground">
                  {{ currentNavigation.name }}
                </h3>
                <span class="shrink-0 text-xs text-muted-foreground">
                  {{ currentNavigation.suitable }}
                </span>
              </div>
              <p class="mt-2 mb-0 text-sm leading-6 text-foreground/80">
                {{ currentNavigation.summary }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section class="mt-8 rounded-xl bg-primary/[0.045] p-5">
        <div class="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 class="m-0 text-base font-semibold text-foreground">
              使用建议
            </h2>
            <p class="mt-1 mb-0 text-sm text-muted-foreground">
              先判断系统规模和层级深度，再决定是否增加导航维度。
            </p>
          </div>
          <span class="text-xs font-medium text-primary">
            一个项目只保持一种主排布
          </span>
        </div>

        <div class="mt-4 grid gap-3 lg:grid-cols-3">
          <div
            v-for="(item, index) in selectionAdvice"
            :key="item.choice"
            class="rounded-lg border border-primary/10 bg-background/90 p-4"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
              >
                {{ index + 1 }}
              </span>
              <div>
                <div class="text-xs text-muted-foreground">
                  {{ item.choice }}
                </div>
                <div class="mt-0.5 text-sm font-semibold text-foreground">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-sm leading-6 text-foreground/80">
              {{ item.reason }}
            </p>
          </div>
        </div>

        <div class="mt-4 text-sm leading-6 text-foreground/80">
          <span class="font-medium text-foreground">避免：</span>
          不要为了显得丰富而同时开启顶部菜单和并列侧栏；只有导航层级确实复杂时，才增加一个维度。
        </div>
      </section>
    </div>
  </div>
</template>
