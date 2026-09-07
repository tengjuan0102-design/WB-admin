import type { RouteRecordRaw } from 'vue-router';

type TemplateRoute = [name: string, slug: string, title: string];

function exampleRoutes(
  basePath: string,
  component: () => Promise<unknown>,
  items: TemplateRoute[],
) {
  return items.map(([name, slug, title]) => ({
    name,
    path: `${basePath}/${slug}`,
    component,
    meta: { activePath: `${basePath}/${slug}`, title },
  }));
}

const routes: RouteRecordRaw[] = [
  {
    name: 'InteractionVisual',
    path: '/interaction-visual',
    redirect: '/style-guide',
    meta: { icon: 'lucide:palette', order: 99, title: '交互视觉' },
    children: [
      {
        name: 'VisualBaseline',
        path: '/style-guide',
        redirect: '/style-guide/style',
        meta: { icon: 'lucide:swatch-book', title: '设计规范' },
        children: [
          {
            name: 'StyleConfiguration',
            path: '/style-guide/style',
            component: () =>
              import('#/views/style-guide/style-configuration.vue'),
            meta: { activePath: '/style-guide/style', title: '样式配置' },
          },
          {
            name: 'BasicComponents',
            path: '/style-guide/components',
            component: () => import('#/views/style-guide/index.vue'),
            meta: { activePath: '/style-guide/components', title: '基础组件' },
          },
          {
            name: 'InteractionFeedbackExample',
            path: '/templates/interaction/feedback',
            component: () =>
              import('#/views/style-guide/interaction-examples.vue'),
            meta: {
              activePath: '/templates/interaction/feedback',
              title: '反馈与浮层',
            },
          },
          {
            name: 'InteractionStateExample',
            path: '/templates/interaction/states',
            component: () =>
              import('#/views/style-guide/interaction-examples.vue'),
            meta: {
              activePath: '/templates/interaction/states',
              title: '页面状态',
            },
          },
        ],
      },
      {
        name: 'NavigationTemplates',
        path: '/templates/navigation',
        redirect: '/templates/navigation/folded',
        meta: { icon: 'lucide:panel-left', title: '导航模板' },
        children: exampleRoutes(
          '/templates/navigation',
          () => import('#/views/style-guide/usage-rules.vue'),
          [
            ['NavigationFolded', 'folded', '折叠侧栏'],
            ['NavigationParallel', 'parallel', '并列侧栏'],
            ['NavigationTopFolded', 'top-folded', '顶部 + 折叠侧栏'],
            ['NavigationTopParallel', 'top-parallel', '顶部 + 并列侧栏'],
          ],
        ),
      },
      {
        name: 'ListTemplates',
        path: '/templates/list',
        redirect: '/templates/list/table',
        meta: { icon: 'lucide:table-2', title: '列表模板' },
        children: exampleRoutes(
          '/templates/list',
          () => import('#/views/style-guide/list-examples.vue'),
          [
            ['ListTableExample', 'table', '标准表格'],
            ['ListTabsExample', 'tabs', 'Tab 列表'],
            ['ListTreeExample', 'tree', '树形 + 表格'],
          ],
        ),
      },
      {
        name: 'FormTemplates',
        path: '/templates/form',
        redirect: '/templates/form/basic',
        meta: { icon: 'lucide:clipboard-pen-line', title: '表单模板' },
        children: exampleRoutes(
          '/templates/form',
          () => import('#/views/style-guide/form-examples.vue'),
          [
            ['FormBasicExample', 'basic', '基础表单'],
            ['FormStepsExample', 'steps', '步骤表单'],
            ['FormDrawerExample', 'drawer', '抽屉表单'],
          ],
        ),
      },
      {
        name: 'DetailTemplates',
        path: '/templates/detail',
        redirect: '/templates/detail/basic',
        meta: { icon: 'lucide:file-text', title: '详情模板' },
        children: exampleRoutes(
          '/templates/detail',
          () => import('#/views/style-guide/detail-examples.vue'),
          [
            ['DetailBasicExample', 'basic', '基础详情'],
            ['DetailRelatedExample', 'related', '详情 + 关联列表'],
            ['DetailDrawerExample', 'drawer', '抽屉详情'],
          ],
        ),
      },
    ],
  },
  {
    name: 'LoginTemplateAliases',
    path: '/templates/login',
    redirect: '/auth/login',
    meta: { hideInMenu: true, hideInTab: true, title: '登录页布局' },
    children: [
      {
        name: 'LoginLeftExample',
        path: '/templates/login/left',
        redirect: '/auth/login?layout=panel-left',
        meta: { hideInMenu: true, hideInTab: true, title: '左侧表单' },
      },
      {
        name: 'LoginCenterExample',
        path: '/templates/login/center',
        redirect: '/auth/login?layout=panel-center',
        meta: { hideInMenu: true, hideInTab: true, title: '居中卡片' },
      },
      {
        name: 'LoginRightExample',
        path: '/templates/login/right',
        redirect: '/auth/login?layout=panel-right',
        meta: { hideInMenu: true, hideInTab: true, title: '右侧表单' },
      },
    ],
  },
  {
    name: 'LegacySectionedDetailExample',
    path: '/templates/detail/sectioned',
    redirect: '/templates/detail/basic',
    meta: { hideInMenu: true, hideInTab: true, title: '分组详情' },
  },
  {
    name: 'LegacySectionedFormExample',
    path: '/templates/form/sectioned',
    redirect: '/templates/form/steps',
    meta: { hideInMenu: true, hideInTab: true, title: '分组表单' },
  },
  {
    name: 'LegacyCardListExample',
    path: '/templates/list/card',
    redirect: '/templates/list/table',
    meta: { hideInMenu: true, hideInTab: true, title: '卡片列表示例' },
  },
  {
    name: 'LegacyUsageRules',
    path: '/usage-rules',
    redirect: '/templates/navigation/folded',
    meta: { hideInMenu: true, hideInTab: true, title: '使用规则' },
    children: [
      { path: 'navigation', redirect: '/templates/navigation/folded' },
      { path: 'list', redirect: '/templates/list/table' },
      {
        path: 'list/examples',
        redirect: (to) =>
          `/templates/list/${
            String(to.query.type ?? 'table') === 'tree' ? 'tree' : 'table'
          }`,
      },
      {
        path: 'form',
        redirect: (to) => `/templates/form/${String(to.query.type ?? 'basic')}`,
      },
      {
        path: 'detail',
        redirect: (to) =>
          `/templates/detail/${String(to.query.type ?? 'basic')}`,
      },
      { path: 'common', redirect: '/templates/interaction/feedback' },
      { path: 'login', redirect: '/templates/login/left' },
    ],
  },
];

export default routes;
