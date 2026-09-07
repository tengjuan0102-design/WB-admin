import {
  appCopyrightPreferences,
  defineOverridesPreferences,
  definePreferencesExtension,
} from '@vben/preferences';

interface WebAntdPreferencesExtension {
  defaultTableSize: number;
  enableFormFullscreen: boolean;
  reportTitle: string;
  tenantMode: 'multi' | 'single';
}

/** 旺宝品牌层对 Vben 偏好设置的唯一覆盖入口。 */
export const overridesPreferences = defineOverridesPreferences({
  app: {
    accessMode: 'frontend',
    authPageLayout: 'panel-center',
    defaultHomePath: '/home',
    layout: 'header-mixed-nav',
    name: import.meta.env.VITE_APP_TITLE,
    preferencesButtonPosition: 'header',
  },
  breadcrumb: {
    enable: true,
    hideOnlyOne: true,
    showHome: false,
    showIcon: false,
    styleType: 'normal',
  },
  copyright: appCopyrightPreferences,
  header: { height: 64, mode: 'fixed' },
  logo: {
    fit: 'contain',
    fullLogoHeight: 30,
    logoMode: 'full',
    showText: false,
    source: '/images/wanbao-logo.svg',
    sourceDark: '/images/wanbao-logo.svg',
  },
  navigation: {
    topMenuEnable: true,
  },
  sidebar: {
    autoActivateChild: true,
    collapsedButton: true,
    draggable: false,
    fixedButton: false,
    mixedWidth: 128,
    parallel: false,
    width: 184,
  },
  tabbar: {
    enable: false,
    height: 44,
    showIcon: false,
    showMaximize: false,
    showMore: false,
    showRefresh: false,
    styleType: 'card',
  },
  transition: {
    enable: false,
    loading: true,
    name: 'fade',
    progress: false,
  },
  theme: {
    colorPrimary: 'hsl(359 85% 60%)',
    mode: 'light',
    semiDarkSidebar: true,
    semiDarkSidebarSub: false,
  },
  widget: {
    fullscreen: false,
    globalSearch: true,
    languageToggle: false,
    lockScreen: false,
    logoutButtonPosition: 'user-dropdown',
    notification: true,
    refresh: false,
    sidebarToggle: false,
    themeToggle: false,
    timezone: false,
  },
});

export const preferencesExtension =
  definePreferencesExtension<WebAntdPreferencesExtension>({
    tabLabel: 'preferences.antd.tabLabel',
    title: 'preferences.antd.title',
    fields: [
      {
        component: 'switch',
        defaultValue: true,
        key: 'enableFormFullscreen',
        label: 'preferences.antd.fields.enableFormFullscreen.label',
        tip: 'preferences.antd.fields.enableFormFullscreen.tip',
      },
      {
        component: 'select',
        defaultValue: 'single',
        key: 'tenantMode',
        label: 'preferences.antd.fields.tenantMode.label',
        options: [
          {
            label: 'preferences.antd.fields.tenantMode.options.single.label',
            value: 'single',
          },
          {
            label: 'preferences.antd.fields.tenantMode.options.multi.label',
            value: 'multi',
          },
        ],
      },
      {
        component: 'number',
        componentProps: { max: 200, min: 10, step: 10 },
        defaultValue: 20,
        key: 'defaultTableSize',
        label: 'preferences.antd.fields.defaultTableSize.label',
      },
      {
        component: 'input',
        defaultValue: '',
        key: 'reportTitle',
        label: 'preferences.antd.fields.reportTitle.label',
        placeholder: 'preferences.antd.fields.reportTitle.placeholder',
      },
    ],
  });
