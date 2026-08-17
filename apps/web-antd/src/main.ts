import { initPreferences, updatePreferences } from '@vben/preferences';
import { unmountGlobalLoading } from '@vben/utils';

import { overridesPreferences, preferencesExtension } from './preferences';

/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initApplication() {
  // name用于指定项目唯一标识
  // 用于区分不同项目的偏好设置以及存储数据的key前缀以及其他一些需要隔离的数据
  const env = import.meta.env.PROD ? 'prod' : 'dev';
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const namespace = `${import.meta.env.VITE_APP_NAMESPACE}-${appVersion}-${env}`;

  // app偏好设置初始化
  await initPreferences({
    extension: preferencesExtension,
    namespace,
    overrides: overridesPreferences,
  });
  updatePreferences({
    app: {
      accessMode: 'frontend',
      authPageLayout: 'panel-center',
      defaultHomePath: '/home',
      preferencesButtonPosition: 'none',
    },
    breadcrumb: {
      enable: false,
    },
    header: {
      height: 64,
    },
    logo: {
      fit: 'contain',
      fullLogoHeight: 30,
      logoMode: 'full',
      showText: false,
      source: '/images/wanbao-logo.svg',
      sourceDark: '/images/wanbao-logo.svg',
    },
    sidebar: {
      fixedButton: false,
      width: 200,
    },
    theme: {
      colorPrimary: 'hsl(359 85% 60%)',
      mode: 'light',
    },
    tabbar: {
      enable: false,
    },
    widget: {
      fullscreen: false,
      globalSearch: false,
      languageToggle: false,
      lockScreen: false,
      logoutButtonPosition: 'user-dropdown',
      notification: false,
      refresh: false,
      themeToggle: false,
      timezone: false,
    },
  });

  // 启动应用并挂载
  // vue应用主要逻辑及视图
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(namespace);

  // 移除并销毁loading
  unmountGlobalLoading();
}

initApplication();
