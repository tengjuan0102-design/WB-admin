<script setup lang="ts">
import type { ToolbarType } from './types';

import { computed } from 'vue';

import { preferences, usePreferences } from '@vben/preferences';

import { Copyright } from '../basic/copyright';
import AuthenticationFormView from './form.vue';
import Toolbar from './toolbar.vue';

interface Props {
  appName?: string;
  logo?: string;
  logoDark?: string;
  pageTitle?: string;
  pageDescription?: string;
  sloganImage?: string;
  toolbar?: boolean;
  copyright?: boolean;
  toolbarList?: ToolbarType[];
  clickLogo?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  appName: '',
  copyright: true,
  logo: '',
  logoDark: '',
  pageDescription: '',
  pageTitle: '',
  sloganImage: '',
  toolbar: true,
  toolbarList: () => ['color', 'language', 'layout', 'theme'],
  clickLogo: () => {},
});

const { authPanelCenter, authPanelLeft, authPanelRight, isDark } =
  usePreferences();

/**
 * @zh_CN 根据主题选择合适的 logo 图标
 */
const logoSrc = computed(() => {
  // 如果是暗色主题且提供了 logoDark，则使用暗色主题的 logo
  if (isDark.value && props.logoDark) {
    return props.logoDark;
  }
  // 否则使用默认的 logo
  return props.logo;
});
</script>

<template>
  <div
    :class="[isDark ? 'dark' : '']"
    class="flex min-h-full flex-1 overflow-x-hidden select-none"
  >
    <template v-if="toolbar">
      <slot name="toolbar">
        <Toolbar :toolbar-list="toolbarList" />
      </slot>
    </template>
    <!-- 左侧认证面板 -->
    <div
      v-if="authPanelLeft"
      class="relative flex-center min-h-full w-full bg-background lg:w-3/5 lg:shrink-0 dark:bg-background-deep"
    >
      <AuthenticationFormView
        class="w-full rounded-3xl shadow-float shadow-primary/5 md:w-[544px] md:bg-background"
        data-side="left"
      />
      <div
        v-if="copyright"
        class="absolute right-0 bottom-3 left-0 flex justify-center text-center text-xs text-muted-foreground"
      >
        <slot name="copyright">
          <Copyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </div>
    </div>

    <slot name="logo">
      <!-- 头部 Logo 和应用名称 -->
      <div
        v-if="logoSrc || appName"
        class="absolute top-0 left-0 z-10 flex flex-1"
        @click="clickLogo"
      >
        <div
          class="mt-4 ml-4 flex flex-1 items-center text-foreground sm:top-6 sm:left-6 lg:text-foreground"
        >
          <img
            v-if="logoSrc"
            :key="logoSrc"
            :alt="appName"
            :src="logoSrc"
            class="mr-2"
            width="42"
          />
          <p v-if="appName" class="m-0 text-xl font-medium">
            {{ appName }}
          </p>
        </div>
      </div>
    </slot>

    <!-- 系统介绍 -->
    <div v-if="!authPanelCenter" class="relative hidden w-0 flex-1 lg:block">
      <div class="auth-visual-panel absolute inset-0 size-full">
        <div
          :key="authPanelLeft ? 'left' : authPanelRight ? 'right' : 'center'"
          class="mr-20 flex-col-center h-full"
          :class="{
            'enter-x': authPanelLeft,
            '-enter-x': authPanelRight,
          }"
        >
          <template v-if="sloganImage">
            <img
              :alt="appName"
              :src="sloganImage"
              class="h-48 w-auto max-w-[34%] animate-float object-contain"
            />
          </template>
          <div v-else aria-label="品牌几何动画" class="geometry-placeholder">
            <span class="geometry-orbit"></span>
            <span class="geometry-square"></span>
            <span class="geometry-circle"></span>
            <span class="geometry-dot geometry-dot-one"></span>
            <span class="geometry-dot geometry-dot-two"></span>
          </div>
          <div class="text-1xl mt-4 font-sans text-foreground lg:text-2xl">
            {{ pageTitle }}
          </div>
          <div class="mt-2 dark:text-muted-foreground">
            {{ pageDescription }}
          </div>
        </div>
      </div>
    </div>

    <!-- 中心认证面板 -->
    <div v-if="authPanelCenter" class="relative flex-center w-full">
      <div class="login-background absolute top-0 left-0 size-full"></div>
      <AuthenticationFormView
        class="w-full rounded-3xl shadow-float shadow-primary/5 md:w-[544px] md:bg-background"
        data-side="bottom"
      />
      <div
        v-if="copyright"
        class="absolute right-0 bottom-3 left-0 flex justify-center text-center text-xs text-muted-foreground"
      >
        <slot name="copyright">
          <Copyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </div>
    </div>

    <!-- 右侧认证面板 -->
    <div
      v-if="authPanelRight"
      class="relative flex-center min-h-full w-full bg-background lg:w-3/5 lg:shrink-0 dark:bg-background-deep"
    >
      <AuthenticationFormView
        class="w-full rounded-3xl shadow-float shadow-primary/5 md:w-[544px] md:bg-background"
        data-side="right"
      />
      <div
        v-if="copyright"
        class="absolute right-0 bottom-3 left-0 flex justify-center text-center text-xs text-muted-foreground"
      >
        <slot name="copyright">
          <Copyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-visual-panel {
  background:
    radial-gradient(
      circle at 78% 18%,
      hsl(var(--primary) / 12%),
      transparent 36%
    ),
    radial-gradient(
      circle at 16% 84%,
      hsl(var(--primary) / 6%),
      transparent 34%
    ),
    linear-gradient(145deg, #fff 0%, #fff8f8 54%, #f8fafc 100%);
}

.dark .auth-visual-panel {
  background:
    radial-gradient(
      circle at 72% 24%,
      hsl(var(--primary) / 20%),
      transparent 34%
    ),
    hsl(var(--muted) / 24%);
}

.geometry-placeholder {
  position: relative;
  width: 280px;
  height: 196px;
  isolation: isolate;
}

.geometry-placeholder::before,
.geometry-placeholder::after {
  position: absolute;
  z-index: -1;
  content: '';
  border-radius: 50%;
  filter: blur(2px);
}

.geometry-placeholder::before {
  top: 10px;
  left: 34px;
  width: 112px;
  height: 112px;
  background: hsl(var(--primary) / 16%);
}

.geometry-placeholder::after {
  right: 24px;
  bottom: 6px;
  width: 92px;
  height: 92px;
  background: hsl(var(--background) / 76%);
}

.geometry-orbit,
.geometry-square,
.geometry-circle,
.geometry-dot {
  position: absolute;
  display: block;
}

.geometry-orbit {
  top: 38px;
  left: 48px;
  width: 184px;
  height: 120px;
  background: hsl(var(--background) / 62%);
  border: 1px solid hsl(var(--background) / 86%);
  border-radius: 24px;
  box-shadow:
    inset 0 1px 0 hsl(var(--background) / 90%),
    0 20px 50px hsl(var(--primary) / 12%);
  backdrop-filter: blur(18px) saturate(135%);
  animation: geometry-float 4.8s ease-in-out infinite;
}

.geometry-orbit::before,
.geometry-orbit::after {
  position: absolute;
  content: '';
  border-radius: 999px;
}

.geometry-orbit::before {
  top: 24px;
  left: 24px;
  width: 72px;
  height: 10px;
  background: hsl(var(--primary) / 18%);
  box-shadow:
    0 24px 0 hsl(var(--foreground) / 8%),
    0 48px 0 hsl(var(--foreground) / 8%);
}

.geometry-orbit::after {
  right: 24px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  background: hsl(var(--primary) / 12%);
  border: 10px solid hsl(var(--primary));
}

.geometry-square {
  bottom: 12px;
  left: 12px;
  width: 82px;
  height: 68px;
  background: hsl(var(--background) / 58%);
  border: 1px solid hsl(var(--background) / 84%);
  border-radius: 18px;
  box-shadow:
    inset 0 1px 0 hsl(var(--background) / 92%),
    0 14px 32px hsl(var(--foreground) / 9%);
  backdrop-filter: blur(16px) saturate(130%);
  animation: geometry-drift 5.4s ease-in-out infinite;
}

.geometry-circle {
  top: 8px;
  right: 10px;
  width: 68px;
  height: 68px;
  background: hsl(var(--primary) / 78%);
  border: 10px solid hsl(var(--background) / 64%);
  border-radius: 24px;
  box-shadow:
    inset 0 1px 0 hsl(var(--background) / 42%),
    0 14px 36px hsl(var(--primary) / 20%);
  backdrop-filter: blur(14px) saturate(140%);
  animation: geometry-drift 4.6s ease-in-out infinite reverse;
}

.geometry-dot {
  height: 8px;
  background: hsl(var(--primary) / 45%);
  border-radius: 999px;
}

.geometry-dot-one {
  top: 26px;
  left: 20px;
  width: 42px;
}

.geometry-dot-two {
  right: 22px;
  bottom: 18px;
  width: 56px;
}

@keyframes geometry-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes geometry-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(5px, -7px);
  }
}

.login-background {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    hsl(var(--primary) / 30%) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}

.dark {
  .login-background {
    background: linear-gradient(
      154deg,
      #07070915 30%,
      hsl(var(--primary) / 20%) 48%,
      #07070915 64%
    );
    filter: blur(100px);
  }
}
</style>
