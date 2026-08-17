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

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    accessMode: 'frontend',
    authPageLayout: 'panel-center',
    defaultHomePath: '/home',
    name: import.meta.env.VITE_APP_TITLE,
    preferencesButtonPosition: 'none',
  },
  breadcrumb: {
    enable: false,
  },
  copyright: appCopyrightPreferences,
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
        componentProps: {
          max: 200,
          min: 10,
          step: 10,
        },
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
