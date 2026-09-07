<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { Settings } from '@vben/icons';
import { preferences, updatePreferences } from '@vben/preferences';

import {
  Button,
  Drawer,
  RadioButton,
  RadioGroup,
  Switch,
} from 'ant-design-vue';

const open = ref(false);
const sidebarWidthOptions = new Set([184, 224, 264]);

const topNavigationEnabled = computed(
  () => preferences.navigation.topMenuEnable,
);

const sideNavigationEnabled = computed(() => preferences.sidebar.enable);

const darkSideNavigationEnabled = computed(
  () => preferences.theme.semiDarkSidebar,
);

const sideNavigationMode = computed(() =>
  preferences.sidebar.parallel || preferences.app.layout === 'sidebar-mixed-nav'
    ? 'parallel'
    : 'collapse',
);

function updateTopNavigation(checked: boolean | number | string) {
  const topEnabled = Boolean(checked);
  if (sideNavigationMode.value === 'parallel') {
    updatePreferences({ navigation: { topMenuEnable: topEnabled } });
    return;
  }
  updatePreferences({
    navigation: { topMenuEnable: topEnabled },
    app: {
      layout: sideNavigationEnabled.value
        ? topEnabled
          ? 'header-mixed-nav'
          : 'header-sidebar-nav'
        : 'header-nav',
    },
  });
}

function resolveSidebarLayout(sideEnabled: boolean, parallel: boolean) {
  if (!sideEnabled) {
    return 'header-nav' as const;
  }
  if (parallel) {
    return 'sidebar-mixed-nav' as const;
  }
  if (topNavigationEnabled.value) {
    return 'header-mixed-nav' as const;
  }
  return 'header-sidebar-nav' as const;
}

function updateSideNavigation(checked: boolean | number | string) {
  const sideEnabled = Boolean(checked);
  const parallel = sideNavigationMode.value === 'parallel';
  updatePreferences({
    app: {
      layout: resolveSidebarLayout(sideEnabled, parallel),
    },
    sidebar: { enable: sideEnabled },
  });
}

function updateSideNavigationMode(event: { target: { value?: string } }) {
  const parallel = event.target.value === 'parallel';
  updatePreferences({
    app: {
      layout: resolveSidebarLayout(sideNavigationEnabled.value, parallel),
    },
    sidebar: { parallel },
  });
}

function updateSidebarWidth(event: { target: { value?: number } }) {
  const width = event.target.value;
  if (width && sidebarWidthOptions.has(width)) {
    updatePreferences({ sidebar: { width } });
  }
}

function updateBreadcrumb(checked: boolean | number | string) {
  updatePreferences({ breadcrumb: { enable: Boolean(checked) } });
}

function updateTabbar(checked: boolean | number | string) {
  updatePreferences({ tabbar: { enable: Boolean(checked) } });
}

function updateDarkSideNavigation(checked: boolean | number | string) {
  const enabled = Boolean(checked);
  updatePreferences({
    theme: {
      semiDarkSidebar: enabled,
      semiDarkSidebarSub: false,
    },
  });
}

onMounted(() => {
  updatePreferences({
    sidebar: {
      draggable: false,
      width: sidebarWidthOptions.has(preferences.sidebar.width)
        ? preferences.sidebar.width
        : 184,
    },
  });
});
</script>

<template>
  <Button
    aria-label="旺宝偏好设置"
    class="mr-1 size-8 border-0 shadow-none"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    "
    type="text"
    @click="open = true"
  >
    <Settings class="size-4" />
  </Button>

  <Drawer
    v-model:open="open"
    :width="380"
    placement="right"
    title="旺宝偏好设置"
  >
    <div class="space-y-7">
      <section>
        <h3 class="mb-1 text-sm font-semibold text-foreground">导航区域</h3>
        <div class="divide-y divide-border/60">
          <div class="flex min-h-14 items-center justify-between">
            <div>
              <div class="text-sm text-foreground">顶部菜单</div>
              <div class="mt-1 text-xs text-muted-foreground">
                展示首页、管理中心等一级业务模块
              </div>
            </div>
            <Switch
              :checked="topNavigationEnabled"
              @change="updateTopNavigation"
            />
          </div>

          <div class="flex min-h-14 items-center justify-between">
            <div>
              <div class="text-sm text-foreground">左侧菜单</div>
              <div class="mt-1 text-xs text-muted-foreground">
                展示当前顶部模块下的二级、三级菜单
              </div>
            </div>
            <Switch
              :checked="sideNavigationEnabled"
              @change="updateSideNavigation"
            />
          </div>

          <div
            v-if="sideNavigationEnabled"
            class="flex min-h-14 items-center justify-between"
          >
            <div>
              <div class="text-sm text-foreground">深色侧边导航</div>
              <div class="mt-1 text-xs text-muted-foreground">
                仅导航使用深色背景，页面内容保持浅色
              </div>
            </div>
            <Switch
              :checked="darkSideNavigationEnabled"
              @change="updateDarkSideNavigation"
            />
          </div>

          <div v-if="sideNavigationEnabled" class="py-4">
            <div class="mb-3 text-sm text-foreground">侧边菜单形式</div>
            <RadioGroup
              :value="sideNavigationMode"
              button-style="solid"
              class="flex w-full"
              @change="updateSideNavigationMode"
            >
              <RadioButton class="flex-1 text-center" value="collapse">
                折叠式
              </RadioButton>
              <RadioButton class="flex-1 text-center" value="parallel">
                并列式
              </RadioButton>
            </RadioGroup>
            <div class="mt-2 text-xs leading-5 text-muted-foreground">
              折叠式在单列内展开；并列式用两列分别承载上下级菜单。
            </div>
          </div>
        </div>
        <p class="mt-2 mb-0 text-xs leading-5 text-muted-foreground">
          旺宝默认使用顶部一级菜单 + 左侧可折叠的两级菜单。
        </p>
      </section>

      <section>
        <h3 class="mb-1 text-sm font-semibold text-foreground">页面框架</h3>
        <div class="divide-y divide-border/60">
          <div
            v-if="sideNavigationEnabled && sideNavigationMode !== 'parallel'"
            class="py-4"
          >
            <div class="mb-3">
              <div>
                <div class="text-sm text-foreground">侧边栏宽度</div>
                <div class="mt-1 text-xs text-muted-foreground">
                  按菜单名称长度选择标准展开宽度
                </div>
              </div>
            </div>
            <RadioGroup
              :value="preferences.sidebar.width"
              button-style="solid"
              class="flex w-full"
              @change="updateSidebarWidth"
            >
              <RadioButton
                v-for="width in sidebarWidthOptions"
                :key="width"
                :value="width"
                class="flex-1 text-center"
              >
                {{ width }}
              </RadioButton>
            </RadioGroup>
          </div>

          <div class="flex min-h-14 items-center justify-between">
            <div>
              <div class="text-sm text-foreground">面包屑</div>
              <div class="mt-1 text-xs text-muted-foreground">
                展示当前页面的层级路径
              </div>
            </div>
            <Switch
              :checked="preferences.breadcrumb.enable"
              @change="updateBreadcrumb"
            />
          </div>

          <div class="flex min-h-14 items-center justify-between">
            <div>
              <div class="text-sm text-foreground">页签</div>
              <div class="mt-1 text-xs text-muted-foreground">
                保留已访问页面并快速切换
              </div>
            </div>
            <Switch
              :checked="preferences.tabbar.enable"
              @change="updateTabbar"
            />
          </div>
        </div>
      </section>
    </div>
  </Drawer>
</template>
