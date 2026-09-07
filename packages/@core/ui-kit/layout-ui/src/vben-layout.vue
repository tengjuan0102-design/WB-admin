<script setup lang="ts">
import type { CSSProperties } from 'vue';

import type { VbenLayoutProps } from './vben-layout';

import { computed, ref, watch } from 'vue';

import {
  SCROLL_FIXED_CLASS,
  useLayoutFooterStyle,
  useLayoutHeaderStyle,
} from '@vben-core/composables';
import { IconifyIcon } from '@vben-core/icons';
import { VbenIconButton } from '@vben-core/shadcn-ui';
import {
  ELEMENT_ID_LAYOUT_SCROLL,
  ELEMENT_ID_MAIN_CONTENT,
} from '@vben-core/shared/constants';

import { useEventListener, useResizeObserver, useScroll } from '@vueuse/core';

import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSidebar,
  LayoutTabbar,
} from './components';
import { resolveHeaderHiddenOnScroll } from './header-scroll-state';
import { useLayout } from './hooks/use-layout';

interface Props extends VbenLayoutProps {}

defineOptions({
  name: 'VbenLayout',
});

const props = withDefaults(defineProps<Props>(), {
  breadcrumbEnable: false,
  breadcrumbHeight: 40,
  contentCompact: 'wide',
  contentCompactWidth: 1200,
  contentPadding: 0,
  contentPaddingBottom: 0,
  contentPaddingLeft: 0,
  contentPaddingRight: 0,
  contentPaddingTop: 0,
  footerEnable: false,
  footerFixed: true,
  footerHeight: 32,
  headerHeight: 50,
  headerHidden: false,
  headerMode: 'fixed',
  headerToggleSidebarButton: true,
  headerVisible: true,
  isMobile: false,
  layout: 'sidebar-nav',
  sidebarCollapsedButton: true,
  sidebarCollapseShowTitle: false,
  sidebarExtraCollapsedWidth: 60,
  sidebarFixedButton: true,
  sidebarGutterWidth: 0,
  sidebarHidden: false,
  sidebarMixedWidth: 80,
  sidebarTheme: 'dark',
  sidebarThemeSub: 'dark',
  sidebarWidth: 180,
  sideCollapseWidth: 60,
  tabbarEnable: true,
  tabbarHeight: 40,
  zIndex: 200,
});

const emit = defineEmits<{
  sideMouseLeave: [];
  toggleSidebar: [];
  'update:sidebarWidth': [value: number];
}>();
const sidebarDraggable = defineModel<boolean>('sidebarDraggable', {
  default: true,
});
const sidebarCollapse = defineModel<boolean>('sidebarCollapse', {
  default: false,
});
const sidebarExtraVisible = defineModel<boolean>('sidebarExtraVisible');
const sidebarExtraCollapse = defineModel<boolean>('sidebarExtraCollapse', {
  default: false,
});
const sidebarExpandOnHover = defineModel<boolean>('sidebarExpandOnHover', {
  default: false,
});
const sidebarEnable = defineModel<boolean>('sidebarEnable', { default: true });

const HEADER_TRIGGER_DISTANCE = 12;

// side是否处于hover状态展开菜单中
const sidebarExpandOnHovering = ref(false);
const headerIsHidden = ref(false);
const mainRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const contentScrollbarWidth = ref(0);
let lastMouseY: null | number = null;

useResizeObserver(contentRef, () => {
  const element = contentRef.value;
  contentScrollbarWidth.value = element
    ? Math.max(0, element.offsetWidth - element.clientWidth)
    : 0;
});

const {
  arrivedState,
  directions,
  y: scrollY,
} = useScroll(contentRef, {
  onScroll: handleLayoutScroll,
});

const { setLayoutHeaderHeight } = useLayoutHeaderStyle();
const { setLayoutFooterHeight } = useLayoutFooterStyle();

const {
  currentLayout,
  isFullContent,
  isHeaderMixedNav,
  isHeaderNav,
  isMixedNav,
  isSidebarMixedNav,
} = useLayout(props);

/**
 * 顶栏是否自动隐藏
 */
const isHeaderAutoActive = computed(
  () =>
    props.headerMode === 'auto' && !isMixedNav.value && !isFullContent.value,
);

const isHeaderOverlayModeActive = computed(
  () =>
    (props.headerMode === 'auto' || props.headerMode === 'auto-scroll') &&
    !isMixedNav.value &&
    !isFullContent.value,
);

const headerWrapperHeight = computed(() => {
  let height = 0;
  if (props.headerVisible && !props.headerHidden) {
    height += props.headerHeight;
  }
  if (props.tabbarEnable) {
    height += props.tabbarHeight;
  }
  return height;
});

const getSideCollapseWidth = computed(() => {
  const {
    sidebarCollapseShowTitle,
    sidebarExtraCollapsedWidth,
    sideCollapseWidth,
  } = props;

  return sidebarCollapseShowTitle || isSidebarMixedNav.value
    ? sidebarExtraCollapsedWidth
    : sideCollapseWidth;
});

/**
 * 动态获取侧边区域是否可见
 */
const sidebarEnableState = computed(() => {
  return !isHeaderNav.value && sidebarEnable.value;
});

/**
 * 侧边区域离顶部高度
 */
const sidebarMarginTop = computed(() => {
  const { headerHeight, isMobile } = props;
  return isMixedNav.value && !isMobile ? headerHeight : 0;
});

/**
 * 动态获取侧边宽度
 */
const getSidebarWidth = computed(() => {
  const { isMobile, sidebarHidden, sidebarMixedWidth, sidebarWidth } = props;
  let width = 0;

  if (sidebarHidden) {
    return width;
  }

  if (
    !sidebarEnableState.value ||
    (sidebarHidden &&
      !isSidebarMixedNav.value &&
      !isMixedNav.value &&
      !isHeaderMixedNav.value)
  ) {
    return width;
  }

  if (isSidebarMixedNav.value && !isMobile) {
    width = sidebarMixedWidth;
  } else if (sidebarCollapse.value) {
    width = isMobile ? 0 : getSideCollapseWidth.value;
  } else {
    width = sidebarWidth;
  }
  return width;
});

/**
 * 获取扩展区域宽度
 */
const sidebarExtraWidth = computed(() => {
  const { sidebarExtraCollapsedWidth, sidebarWidth } = props;

  // 并列导航的收起态隐藏整个右栏；hover 展示时仍使用完整面板宽度。
  if (isSidebarMixedNav.value) {
    return sidebarWidth;
  }
  return sidebarExtraCollapse.value ? sidebarExtraCollapsedWidth : sidebarWidth;
});

/**
 * 是否侧边栏模式，包含混合侧边
 */
const isSideMode = computed(
  () =>
    currentLayout.value === 'mixed-nav' ||
    currentLayout.value === 'sidebar-mixed-nav' ||
    currentLayout.value === 'sidebar-nav' ||
    currentLayout.value === 'header-mixed-nav' ||
    currentLayout.value === 'header-sidebar-nav',
);

/**
 * header fixed值
 */
const headerFixed = computed(() => {
  const { headerMode } = props;
  return (
    isMixedNav.value ||
    headerMode === 'fixed' ||
    headerMode === 'auto-scroll' ||
    headerMode === 'auto'
  );
});

const showSidebar = computed(() => {
  return isSideMode.value && sidebarEnable.value && !props.sidebarHidden;
});

/**
 * 遮罩可见性
 */
const maskVisible = computed(() => !sidebarCollapse.value && props.isMobile);

const mainStyle = computed(() => {
  let width = '100%';
  let sidebarAndExtraWidth = 'unset';
  if (
    headerFixed.value &&
    currentLayout.value !== 'header-nav' &&
    !isMixedNav.value &&
    showSidebar.value &&
    !props.isMobile
  ) {
    // fixed模式下生效
    const isSideNavEffective =
      (isSidebarMixedNav.value || isHeaderMixedNav.value) &&
      sidebarExpandOnHover.value &&
      sidebarExtraVisible.value;

    if (isSideNavEffective) {
      const sideCollapseWidth = props.sidebarMixedWidth;
      const sideWidth = sidebarExtraCollapse.value
        ? props.sidebarExtraCollapsedWidth
        : props.sidebarWidth;

      // 100% - 侧边菜单混合宽度 - 菜单宽度
      sidebarAndExtraWidth = `${sideCollapseWidth + sideWidth}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    } else {
      let sidebarWidth = getSidebarWidth.value;
      if (sidebarExpandOnHovering.value && !sidebarExpandOnHover.value) {
        sidebarWidth =
          isSidebarMixedNav.value || isHeaderMixedNav.value
            ? props.sidebarMixedWidth
            : getSideCollapseWidth.value;
      }
      sidebarAndExtraWidth = `${sidebarWidth}px`;
      width = `calc(100% - ${sidebarAndExtraWidth})`;
    }
  }
  return {
    sidebarAndExtraWidth,
    width,
  };
});

// 导航占据第一列，页签自然填满主内容的剩余宽度。
const tabbarGridStyle = computed((): CSSProperties => {
  let navigationWidth = 0;

  // 旺宝双列菜单需要同时避让一级栏与已展开的二级栏。
  if (isSidebarMixedNav.value && sidebarEnable.value && !props.sidebarHidden) {
    navigationWidth =
      getSidebarWidth.value +
      (sidebarExtraVisible.value && !sidebarExtraCollapse.value
        ? sidebarExtraWidth.value
        : 0) +
      props.sidebarGutterWidth;
  } else if (!isMixedNav.value || props.sidebarHidden) {
    navigationWidth = 0;
  } else if (sidebarEnable.value) {
    const onHoveringWidth = sidebarExpandOnHover.value
      ? props.sidebarWidth
      : getSideCollapseWidth.value;

    navigationWidth = sidebarCollapse.value
      ? getSideCollapseWidth.value
      : onHoveringWidth;
  }

  return {
    gridTemplateColumns: `${navigationWidth}px minmax(0, 1fr)`,
  };
});

const tabbarContentStyle = computed(
  (): CSSProperties => ({
    paddingLeft:
      'calc(var(--wb-space-page-x, 24px) + var(--wb-radius-page, 12px))',
    paddingRight: `calc(var(--wb-space-page-x, 24px) + ${contentScrollbarWidth.value}px)`,
  }),
);

const breadcrumbStyle = computed(
  (): CSSProperties => ({
    height: `${props.breadcrumbHeight}px`,
  }),
);

const layoutScrollStyle = computed((): CSSProperties => {
  const fixed = headerFixed.value;

  if (!fixed) {
    return {
      marginTop: 0,
      paddingTop: 0,
    };
  }

  if (isHeaderOverlayModeActive.value) {
    return {
      marginTop: 0,
      paddingTop: isFullContent.value ? 0 : `${headerWrapperHeight.value}px`,
    };
  }

  return {
    marginTop:
      fixed &&
      !isFullContent.value &&
      !headerIsHidden.value &&
      (!isHeaderAutoActive.value || scrollY.value < headerWrapperHeight.value)
        ? `${headerWrapperHeight.value}px`
        : 0,
    paddingTop: 0,
  };
});

const contentStyle = computed((): CSSProperties => {
  const { footerEnable, footerFixed, footerHeight } = props;
  return {
    paddingBottom: `${footerEnable && footerFixed ? footerHeight : 0}px`,
  };
});

const headerZIndex = computed(() => {
  const { zIndex } = props;
  const offset = isMixedNav.value ? 1 : 0;
  return zIndex + offset;
});

const headerWrapperStyle = computed((): CSSProperties => {
  const fixed = headerFixed.value;
  const hidden = headerIsHidden.value || isFullContent.value;

  return {
    height: isFullContent.value ? '0' : `${headerWrapperHeight.value}px`,
    left: isMixedNav.value ? 0 : mainStyle.value.sidebarAndExtraWidth,
    position: fixed ? 'fixed' : 'static',
    top: 0,
    transform: fixed
      ? `translate3d(0, ${hidden ? '-100%' : '0'}, 0)`
      : undefined,
    transitionDuration: fixed ? undefined : '0ms',
    width: mainStyle.value.width,
    willChange: fixed ? 'transform' : undefined,
    'z-index': headerZIndex.value,
  };
});

/**
 * 侧边栏z-index
 */
const sidebarZIndex = computed(() => {
  const { isMobile, zIndex } = props;
  let offset = isMobile || isSideMode.value ? 1 : -1;

  if (isMixedNav.value) {
    offset += 1;
  }

  return zIndex + offset;
});

const footerWidth = computed(() => {
  if (!props.footerFixed) {
    return '100%';
  }

  return mainStyle.value.width;
});

const maskStyle = computed((): CSSProperties => {
  return { zIndex: props.zIndex };
});

/**
 * 侧边栏 Logo 区域是否显示
 */
const sidebarHeaderHeight = computed(() => {
  if (isMixedNav.value || !props.sidebarLogoVisible) {
    return 0;
  }

  return props.headerHeight;
});

const showHeaderToggleButton = computed(() => {
  return (
    props.isMobile ||
    (props.headerToggleSidebarButton &&
      isSideMode.value &&
      !isSidebarMixedNav.value &&
      (!isMixedNav.value || isHeaderMixedNav.value) &&
      !props.isMobile)
  );
});

const showHeaderLogo = computed(() => {
  return !isSideMode.value || isMixedNav.value || props.isMobile;
});

watch(
  () => props.isMobile,
  (val) => {
    if (val) {
      sidebarCollapse.value = true;
    }
  },
  {
    immediate: true,
  },
);

watch(
  [() => headerWrapperHeight.value, () => isFullContent.value],
  ([height]) => {
    setLayoutHeaderHeight(isFullContent.value ? 0 : height);
  },
  {
    immediate: true,
  },
);

watch(
  () => props.footerHeight,
  (height: number) => {
    setLayoutFooterHeight(height);
  },
  {
    immediate: true,
  },
);

watch(
  [() => props.headerMode, () => isMixedNav.value, () => isFullContent.value],
  () => {
    headerIsHidden.value = false;
  },
);

useEventListener(mainRef, 'mousemove', handleHeaderMouseMove, {
  passive: true,
});
useEventListener(mainRef, 'wheel', handleLayoutWheel, {
  passive: true,
});

function handleLayoutWheel(event: WheelEvent) {
  lastMouseY = event.clientY;
}

function handleHeaderMouseMove(event: MouseEvent) {
  lastMouseY = event.clientY;

  if (!isHeaderAutoActive.value) {
    return;
  }

  updateHeaderVisibilityFromMouse(lastMouseY);
}

function updateHeaderVisibilityFromMouse(mouseY: null | number) {
  if (arrivedState.top || scrollY.value < headerWrapperHeight.value) {
    headerIsHidden.value = false;
    return;
  }

  if (mouseY === null) {
    return;
  }

  const isInTriggerZone = mouseY <= HEADER_TRIGGER_DISTANCE;
  const isInHeaderZone =
    !headerIsHidden.value && mouseY <= headerWrapperHeight.value;

  headerIsHidden.value = !(isInTriggerZone || isInHeaderZone);
}

function handleLayoutScroll() {
  if (isHeaderAutoActive.value) {
    updateHeaderVisibilityFromMouse(lastMouseY);
    return;
  }

  if (
    props.headerMode !== 'auto-scroll' ||
    isMixedNav.value ||
    isFullContent.value
  ) {
    return;
  }
  resolveHeaderVisibilityOnScroll();
}

function resolveHeaderVisibilityOnScroll() {
  headerIsHidden.value = resolveHeaderHiddenOnScroll({
    arrivedTop: arrivedState.top,
    currentHidden: headerIsHidden.value,
    directionDown: directions.bottom,
    directionUp: directions.top,
    headerHeight: headerWrapperHeight.value,
    scrollTop: scrollY.value,
  });
}

function handleClickMask() {
  sidebarCollapse.value = true;
}

function handleHeaderToggle() {
  if (props.isMobile) {
    sidebarCollapse.value = false;
  } else {
    emit('toggleSidebar');
  }
}

const idMainContent = ELEMENT_ID_MAIN_CONTENT;
const idLayoutScroll = ELEMENT_ID_LAYOUT_SCROLL;
const idLayoutStaticHeader = `${ELEMENT_ID_LAYOUT_SCROLL}__static_header`;
const layoutStaticHeaderTarget = `#${idLayoutStaticHeader}`;
</script>

<template>
  <div
    class="relative flex h-full min-h-0 w-full overflow-hidden bg-background-deep"
  >
    <LayoutSidebar
      v-if="sidebarEnableState"
      v-model:draggable="sidebarDraggable"
      v-model:collapse="sidebarCollapse"
      v-model:expand-on-hover="sidebarExpandOnHover"
      v-model:expand-on-hovering="sidebarExpandOnHovering"
      v-model:extra-collapse="sidebarExtraCollapse"
      v-model:extra-visible="sidebarExtraVisible"
      :show-collapse-button="sidebarCollapsedButton"
      :show-fixed-button="sidebarFixedButton"
      :collapse-width="getSideCollapseWidth"
      :dom-visible="!isMobile"
      :extra-width="sidebarExtraWidth"
      :fixed-extra="sidebarExpandOnHover || isSidebarMixedNav"
      :gutter-width="sidebarGutterWidth"
      :header-height="sidebarHeaderHeight"
      :extra-title-height="isSidebarMixedNav ? sidebarExtraTitleHeight : 0"
      :is-sidebar-mixed="isSidebarMixedNav"
      :margin-top="sidebarMarginTop"
      :mixed-width="sidebarMixedWidth"
      :show="showSidebar"
      :theme="sidebarTheme"
      :theme-sub="sidebarThemeSub"
      :width="getSidebarWidth"
      :z-index="sidebarZIndex"
      @leave="() => emit('sideMouseLeave')"
      @update:width="(val) => emit('update:sidebarWidth', val)"
    >
      <template v-if="isSideMode && !isMixedNav && sidebarLogoVisible" #logo>
        <slot name="logo"></slot>
      </template>

      <template v-if="isSidebarMixedNav">
        <slot name="mixed-menu"></slot>
      </template>
      <template v-else>
        <slot name="menu"></slot>
      </template>

      <template #extra>
        <slot name="side-extra"></slot>
      </template>
      <template #extra-title>
        <slot name="side-extra-title"></slot>
      </template>
    </LayoutSidebar>

    <div
      ref="mainRef"
      class="relative flex min-h-0 flex-1 flex-col overflow-hidden transition-all duration-300 ease-in"
    >
      <Teleport defer :disabled="headerFixed" :to="layoutStaticHeaderTarget">
        <div
          :class="SCROLL_FIXED_CLASS"
          :style="headerWrapperStyle"
          class="shrink-0 overflow-hidden transition-[transform,left,width] duration-200"
        >
          <LayoutHeader
            v-if="headerVisible"
            :full-width="!isSideMode"
            :height="headerHeight"
            :is-mobile="isMobile"
            :show="!isFullContent && !headerHidden"
            :sidebar-width="sidebarWidth"
            :theme="headerTheme"
            :width="mainStyle.width"
            :z-index="headerZIndex"
            :logo-visible="sidebarLogoVisible"
          >
            <template v-if="showHeaderLogo" #logo>
              <slot name="logo"></slot>
            </template>

            <template #toggle-button>
              <VbenIconButton
                v-if="showHeaderToggleButton"
                class="my-0 mr-1 rounded-md"
                @click="handleHeaderToggle"
              >
                <IconifyIcon v-if="showSidebar" icon="ep:fold" />
                <IconifyIcon v-else icon="ep:expand" />
              </VbenIconButton>
            </template>
            <slot name="header"></slot>
          </LayoutHeader>

          <div v-if="tabbarEnable" :style="tabbarGridStyle" class="grid w-full">
            <div
              :style="tabbarContentStyle"
              class="col-start-2 min-w-0 bg-background-deep"
            >
              <LayoutTabbar :height="tabbarHeight">
                <slot name="tabbar"></slot>
              </LayoutTabbar>
            </div>
          </div>
        </div>
      </Teleport>

      <div
        :id="idLayoutScroll"
        ref="contentRef"
        :class="{ 'wb-has-tabbar': tabbarEnable }"
        :style="layoutScrollStyle"
        class="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto"
      >
        <div :id="idLayoutStaticHeader" class="contents"></div>

        <div
          v-if="breadcrumbEnable"
          :style="breadcrumbStyle"
          class="vben-breadcrumb-row relative mx-4 mt-4 flex shrink-0 items-center rounded-t-xl bg-background px-5 after:absolute after:right-5 after:bottom-0 after:left-5 after:h-px after:bg-border/50"
        >
          <slot name="breadcrumb"></slot>
        </div>

        <LayoutContent
          :id="idMainContent"
          :content-compact="contentCompact"
          :content-compact-width="contentCompactWidth"
          :padding="contentPadding"
          :padding-bottom="contentPaddingBottom"
          :padding-left="contentPaddingLeft"
          :padding-right="contentPaddingRight"
          :padding-top="contentPaddingTop"
          :style="contentStyle"
        >
          <slot name="content"></slot>

          <template #overlay>
            <slot name="content-overlay"></slot>
          </template>
        </LayoutContent>

        <LayoutFooter
          v-if="footerEnable"
          :fixed="footerFixed"
          :height="footerHeight"
          :show="!isFullContent"
          :width="footerWidth"
          :z-index="zIndex"
        >
          <slot name="footer"></slot>
        </LayoutFooter>
      </div>
    </div>
    <slot name="extra"></slot>
    <div
      v-if="maskVisible"
      :style="maskStyle"
      class="fixed top-0 left-0 size-full bg-overlay transition-[background-color] duration-200"
      @click="handleClickMask"
    ></div>
  </div>
</template>
