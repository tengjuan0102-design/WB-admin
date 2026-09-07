<script lang="ts" setup>
import type { SetupContext } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import type { MenuRecordRaw } from '@vben/types';

import { computed, onMounted, useSlots, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useRefresh } from '@vben/hooks';
import { $t, i18n } from '@vben/locales';
import {
  preferences,
  updatePreferences,
  usePreferences,
} from '@vben/preferences';
import { useAccessStore, useTabbarStore, useTimezoneStore } from '@vben/stores';
import { cloneDeep, mapTree } from '@vben/utils';

import { VbenAdminLayout } from '@vben-core/layout-ui';
import { VbenBackTop, VbenLogo } from '@vben-core/shadcn-ui';
import { ELEMENT_ID_LAYOUT_SCROLL } from '@vben-core/shared/constants';

import { Breadcrumb, CheckUpdates } from '../widgets';
import { LayoutContent, LayoutContentSpinner } from './content';
import { Copyright } from './copyright';
import { LayoutFooter } from './footer';
import { LayoutHeader } from './header';
import {
  LayoutExtraMenu,
  LayoutMenu,
  LayoutMixedMenu,
  useExtraMenu,
  useMixedMenu,
} from './menu';
import { LayoutTabbar } from './tabbar';
import { useLayoutScroll } from './use-layout-scroll';

defineOptions({ name: 'BasicLayout' });

withDefaults(defineProps<Props>(), {
  avatar: '',
  text: '',
});

const emit = defineEmits<{
  clearPreferencesAndLogout: [];
  clickLogo: [];
  logout: [];
}>();

interface Props {
  avatar?: string;
  text?: string;
}

const {
  isDark,
  isHeaderNav,
  isMixedNav,
  isMobile,
  isSideMode,
  isSideMixedNav,
  isHeaderMixedNav,
  isHeaderSidebarNav,
  layout,
  sidebarCollapsed,
  theme,
} = usePreferences();
const accessStore = useAccessStore();
const timezoneStore = useTimezoneStore();
const { refresh } = useRefresh();
const layoutScrollTarget = `#${ELEMENT_ID_LAYOUT_SCROLL}`;

useLayoutScroll();

const sidebarTheme = computed(() => {
  const dark = isDark.value || preferences.theme.semiDarkSidebar;
  return dark ? 'dark' : 'light';
});

const sidebarThemeSub = computed(() => {
  const dark = isDark.value || preferences.theme.semiDarkSidebarSub;
  return dark ? 'dark' : 'light';
});

const headerTheme = computed(() => {
  const dark = isDark.value || preferences.theme.semiDarkHeader;
  return dark ? 'dark' : 'light';
});

// 并列式导航使用独立固定列宽，不受单列侧边栏宽度偏好影响。
const effectiveSidebarWidth = computed(() =>
  isSideMixedNav.value ? 144 : preferences.sidebar.width,
);

const parallelRailWidth = computed(() =>
  isSideMixedNav.value && preferences.sidebar.extraCollapse ? 64 : 128,
);

const logoClass = computed(() => {
  const { collapsedShowTitle } = preferences.sidebar;
  const classes: string[] = ['wb-logo-left', 'ml-1'];

  if (collapsedShowTitle && sidebarCollapsed.value && !isMixedNav.value) {
    classes.push('mx-auto');
  }

  if (isSideMixedNav.value) {
    classes.push('flex-center');
  }

  return classes.join(' ');
});

const isMenuRounded = computed(() => {
  return preferences.navigation.styleType === 'rounded';
});

const logoCollapsed = computed(() => {
  if (isMobile.value && sidebarCollapsed.value) {
    return true;
  }
  if (
    isHeaderNav.value ||
    isHeaderMixedNav.value ||
    isMixedNav.value ||
    isHeaderSidebarNav.value ||
    // 旺宝双列菜单的 Logo 位于全宽顶栏，不跟随侧栏折叠。
    isSideMixedNav.value
  ) {
    return false;
  }
  return sidebarCollapsed.value || isSideMixedNav.value;
});

const showHeaderNav = computed(() => {
  return (
    preferences.navigation.topMenuEnable &&
    !isMobile.value &&
    (isHeaderNav.value ||
      isMixedNav.value ||
      isHeaderMixedNav.value ||
      isSideMixedNav.value)
  );
});

const logoTheme = computed(() => {
  const showLogoInHeader =
    !isSideMode.value ||
    isHeaderSidebarNav.value ||
    isHeaderMixedNav.value ||
    isMixedNav.value ||
    isMobile.value;
  return showLogoInHeader ? headerTheme.value : sidebarTheme.value;
});

/**
 * layout-sidebar扩展区域插槽extra-title的高度
 */
const sidebarExtraTitleHeight = computed<number | undefined>(() => {
  const showSideExtraTitle =
    preferences.logo.enable && preferences.logo.showText;
  return showSideExtraTitle ? undefined : 0;
});

const {
  handleMenuSelect,
  headerActive,
  headerMenus,
  sidebarActive,
  sidebarMenus,
  mixHeaderMenus,
  sidebarVisible,
} = useMixedMenu();

// 侧边多列菜单
const {
  extraActiveMenu,
  extraMenus,
  handleDefaultSelect,
  handleMenuMouseEnter,
  handleMixedMenuSelect,
  handleSideMouseLeave,
  sidebarExtraVisible,
} = useExtraMenu(mixHeaderMenus);

/**
 * 包装菜单，翻译菜单名称
 * @param menus 原始菜单数据
 * @param deep 是否深度包装。对于双列布局，只需要包装第一层，因为更深层的数据会在扩展菜单中重新包装
 */
function wrapperMenus(menus: MenuRecordRaw[], deep: boolean = true) {
  return deep
    ? mapTree(menus, (item) => {
        return { ...cloneDeep(item), name: $t(item.name) };
      })
    : menus.map((item) => {
        return { ...cloneDeep(item), name: $t(item.name) };
      });
}

function toggleSidebar() {
  updatePreferences({
    sidebar: {
      hidden: !preferences.sidebar.hidden,
    },
  });
}

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}

function handleLogout() {
  emit('logout');
}

function clickLogo() {
  emit('clickLogo');
}

function autoCollapseMenuByRouteMeta(route: RouteLocationNormalizedLoaded) {
  // 只在双列模式下生效
  if (
    ['header-mixed-nav', 'sidebar-mixed-nav'].includes(
      preferences.app.layout,
    ) &&
    route.meta &&
    route.meta.hideInMenu
  ) {
    sidebarExtraVisible.value = false;
  }
}

const route = useRoute();

onMounted(() => {
  autoCollapseMenuByRouteMeta(route);
  if (preferences.app.layout === 'sidebar-mixed-nav') {
    updatePreferences({ sidebar: { extraCollapse: false, hidden: false } });
  }
});

watch(
  () => preferences.app.layout,
  async (val) => {
    if (val === 'sidebar-mixed-nav') {
      updatePreferences({
        sidebar: {
          extraCollapse: false,
          hidden: false,
        },
      });
    }
  },
);

const tabbarStore = useTabbarStore();

function refreshAll() {
  tabbarStore.cachedTabs.clear();
  refresh();
}

// 语言更新后，刷新页面
// i18n.global.locale会在preference.app.locale变更之后才会更新，因此watchpreference.app.locale是不合适的，刷新页面时可能语言配置尚未完全加载完成
watch(i18n.global.locale, refreshAll, { flush: 'post' });

// 时区更新后，刷新页面
watch(() => timezoneStore.timezone, refreshAll, { flush: 'post' });

const slots: SetupContext['slots'] = useSlots();
const headerSlots = computed(() => {
  return Object.keys(slots).filter((key) => key.startsWith('header-'));
});
</script>

<template>
  <VbenAdminLayout
    v-model:sidebar-extra-visible="sidebarExtraVisible"
    :content-compact="preferences.app.contentCompact"
    :content-compact-width="preferences.app.contentCompactWidth"
    :content-padding="preferences.app.contentPadding"
    :content-padding-bottom="preferences.app.contentPaddingBottom"
    :content-padding-left="preferences.app.contentPaddingLeft"
    :content-padding-right="preferences.app.contentPaddingRight"
    :content-padding-top="preferences.app.contentPaddingTop"
    :breadcrumb-enable="preferences.breadcrumb.enable"
    :breadcrumb-height="40"
    :footer-enable="preferences.footer.enable"
    :footer-fixed="preferences.footer.fixed"
    :footer-height="preferences.footer.height"
    :header-height="preferences.header.height"
    :header-hidden="false"
    header-mode="fixed"
    :header-theme="headerTheme"
    :header-toggle-sidebar-button="false"
    :header-visible="true"
    :is-mobile="preferences.app.isMobile"
    :layout="layout"
    :sidebar-draggable="preferences.sidebar.draggable"
    :sidebar-collapse="preferences.sidebar.collapsed"
    :sidebar-collapse-show-title="preferences.sidebar.collapsedShowTitle"
    :sidebar-enable="sidebarVisible"
    :sidebar-collapsed-button="preferences.sidebar.collapsedButton"
    :sidebar-fixed-button="false"
    :sidebar-gutter-width="isSideMixedNav ? 16 : 0"
    :sidebar-expand-on-hover="preferences.sidebar.expandOnHover"
    :sidebar-extra-collapse="preferences.sidebar.extraCollapse"
    :sidebar-extra-collapsed-width="preferences.sidebar.extraCollapsedWidth"
    :sidebar-extra-title-height="sidebarExtraTitleHeight"
    :sidebar-hidden="preferences.sidebar.hidden"
    :sidebar-mixed-width="parallelRailWidth"
    :sidebar-theme="sidebarTheme"
    :sidebar-theme-sub="sidebarThemeSub"
    :sidebar-width="effectiveSidebarWidth"
    :side-collapse-width="preferences.sidebar.collapseWidth"
    :sidebar-logo-visible="preferences.logo.enable"
    :tabbar-enable="preferences.tabbar.enable"
    :tabbar-height="52"
    :z-index="preferences.app.zIndex"
    @side-mouse-leave="handleSideMouseLeave"
    @toggle-sidebar="toggleSidebar"
    @update:sidebar-collapse="
      (value: boolean) => updatePreferences({ sidebar: { collapsed: value } })
    "
    @update:sidebar-enable="
      (value: boolean) => updatePreferences({ sidebar: { enable: value } })
    "
    @update:sidebar-expand-on-hover="
      (value: boolean) =>
        updatePreferences({ sidebar: { expandOnHover: value } })
    "
    @update:sidebar-extra-collapse="
      (value: boolean) => {
        updatePreferences({ sidebar: { extraCollapse: value } });
        sidebarExtraVisible = value ? false : extraMenus.length > 0;
      }
    "
    @update:sidebar-width="
      (value: number) => updatePreferences({ sidebar: { width: value } })
    "
  >
    <!-- logo -->
    <template #logo>
      <VbenLogo
        v-if="preferences.logo.enable"
        :fit="preferences.logo.fit"
        :class="logoClass"
        :collapsed="logoCollapsed"
        :src="
          logoCollapsed
            ? '/images/wanbao-logo-icon.svg'
            : preferences.logo.source
        "
        :src-dark="preferences.logo.sourceDark"
        :text="preferences.app.name"
        :show-text="preferences.logo.showText"
        :logo-mode="preferences.logo.logoMode"
        :full-logo-height="preferences.logo.fullLogoHeight"
        :theme="logoTheme"
        @click="clickLogo"
      >
        <template v-if="$slots['logo-text']" #text>
          <slot name="logo-text"></slot>
        </template>
      </VbenLogo>
    </template>
    <template #breadcrumb>
      <Breadcrumb
        :hide-when-only-one="true"
        :show-home="false"
        :show-icon="preferences.breadcrumb.showIcon"
        :type="preferences.breadcrumb.styleType"
      />
    </template>
    <!-- 头部区域 -->
    <template #header>
      <LayoutHeader
        :avatar="avatar"
        :theme="theme"
        :text="text"
        @clear-preferences-and-logout="clearPreferencesAndLogout"
        @logout="handleLogout"
      >
        <template v-if="showHeaderNav" #menu>
          <LayoutMenu
            :default-active="headerActive"
            :menus="wrapperMenus(headerMenus)"
            :rounded="isMenuRounded"
            :theme="headerTheme"
            class="wb-header-primary-menu w-full"
            mode="horizontal"
            @select="handleMenuSelect"
          />
        </template>
        <template #user-dropdown>
          <slot name="user-dropdown"></slot>
        </template>
        <template #notification>
          <slot name="notification"></slot>
        </template>
        <template v-if="$slots.preferences" #preferences>
          <slot name="preferences"></slot>
        </template>
        <template v-for="item in headerSlots" #[item]>
          <slot :name="item"></slot>
        </template>
      </LayoutHeader>
    </template>
    <!-- 侧边菜单区域 -->
    <template #menu>
      <LayoutMenu
        :key="sidebarMenus.map((item) => item.path).join('|')"
        :accordion="false"
        :collapse="preferences.sidebar.collapsed"
        :collapse-show-title="preferences.sidebar.collapsedShowTitle"
        :default-active="sidebarActive"
        :menus="wrapperMenus(sidebarMenus)"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
        mode="vertical"
        @select="handleMenuSelect"
      />
    </template>
    <template #mixed-menu>
      <LayoutMixedMenu
        :active-path="extraActiveMenu"
        :collapse="isSideMixedNav && preferences.sidebar.extraCollapse"
        :menus="wrapperMenus(mixHeaderMenus, false)"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
        @default-select="handleDefaultSelect"
        @enter="handleMenuMouseEnter"
        @select="handleMixedMenuSelect"
      />
    </template>
    <!-- 侧边额外区域 -->
    <template #side-extra>
      <LayoutExtraMenu
        :accordion="false"
        :class="{
          'wb-parallel-secondary-root':
            isSideMixedNav && !preferences.navigation.topMenuEnable,
        }"
        :collapse="isSideMixedNav ? false : preferences.sidebar.extraCollapse"
        :menus="wrapperMenus(extraMenus)"
        :rounded="isMenuRounded"
        :theme="sidebarThemeSub"
      />
    </template>
    <template #side-extra-title>
      <VbenLogo
        v-if="preferences.logo.enable"
        :fit="preferences.logo.fit"
        :show-text="preferences.logo.showText"
        :text="preferences.app.name"
        :theme="sidebarThemeSub"
      >
        <template v-if="$slots['logo-text']" #text>
          <slot name="logo-text"></slot>
        </template>
      </VbenLogo>
    </template>

    <template #tabbar>
      <LayoutTabbar
        v-if="preferences.tabbar.enable"
        :show-icon="false"
        :theme="theme"
      />
    </template>

    <!-- 主体内容 -->
    <template #content>
      <LayoutContent />
    </template>

    <template v-if="preferences.transition.loading" #content-overlay>
      <LayoutContentSpinner />
    </template>

    <!-- 页脚 -->
    <template v-if="preferences.footer.enable" #footer>
      <LayoutFooter>
        <Copyright
          v-if="preferences.copyright.enable"
          v-bind="preferences.copyright"
        />
      </LayoutFooter>
    </template>

    <template #extra>
      <slot name="extra"></slot>
      <CheckUpdates
        v-if="preferences.app.enableCheckUpdates"
        :check-updates-interval="preferences.app.checkUpdatesInterval"
      />

      <Transition v-if="preferences.widget.lockScreen" name="slide-up">
        <slot v-if="accessStore.isLockScreen" name="lock-screen"></slot>
      </Transition>

      <VbenBackTop :target="layoutScrollTarget" />
    </template>
  </VbenAdminLayout>
</template>
