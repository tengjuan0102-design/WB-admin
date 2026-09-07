<script lang="ts" setup>
import type { BreadcrumbStyleType } from '@vben/types';

import type { IBreadcrumb } from '@vben-core/shadcn-ui';

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { $t } from '@vben/locales';

import { VbenBreadcrumbView } from '@vben-core/shadcn-ui';

interface Props {
  hideWhenOnlyOne?: boolean;
  showHome?: boolean;
  showIcon?: boolean;
  type?: BreadcrumbStyleType;
}

const props = withDefaults(defineProps<Props>(), {
  showHome: false,
  showIcon: false,
  type: 'normal',
});

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed((): IBreadcrumb[] => {
  const customBreadcrumbs = route.meta.breadcrumb;
  const matched = route.matched;

  const resultBreadcrumb: IBreadcrumb[] = Array.isArray(customBreadcrumbs)
    ? customBreadcrumbs.map(({ icon, path, title }) => ({
        icon,
        path,
        title: $t(title),
      }))
    : [];

  if (!Array.isArray(customBreadcrumbs)) {
    for (const match of matched) {
      const { meta, path } = match;
      const { hideChildrenInMenu, hideInBreadcrumb, icon, name, title } =
        meta || {};
      if (hideInBreadcrumb || hideChildrenInMenu || !path) {
        continue;
      }

      const breadcrumbTitle = title ? $t((title || name) as string) : '';
      if (!breadcrumbTitle.trim()) {
        continue;
      }

      resultBreadcrumb.push({
        icon,
        path: path || route.path,
        title: breadcrumbTitle,
      });
    }
  }
  if (props.showHome) {
    resultBreadcrumb.unshift({
      icon: 'mdi:home-outline',
      isHome: true,
      path: '/',
    });
  }
  if (props.hideWhenOnlyOne && resultBreadcrumb.length === 1) {
    return [];
  }

  return resultBreadcrumb;
});

function handleSelect(path: string) {
  router.push(path);
}
</script>
<template>
  <VbenBreadcrumbView
    v-if="breadcrumbs.length > 0"
    :breadcrumbs="breadcrumbs"
    :show-icon="showIcon"
    :style-type="type"
    @select="handleSelect"
  />
</template>
