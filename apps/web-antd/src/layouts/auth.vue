<script lang="ts" setup>
import type { AuthPageLayoutType } from '@vben/types';

import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { AuthPageLayout } from '@vben/layouts';
import { updatePreferences } from '@vben/preferences';

const route = useRoute();
const layouts = new Set(['panel-center', 'panel-left', 'panel-right']);

watch(
  () => route.query.layout,
  (layout) => {
    const value = String(layout ?? '');
    if (layouts.has(value)) {
      updatePreferences({
        app: { authPageLayout: value as AuthPageLayoutType },
      });
    }
  },
  { immediate: true },
);
</script>

<template>
  <AuthPageLayout
    page-description="连接商户、门店与设备，让经营管理更简单高效"
    page-title="旺宝 AI，让门店生意更好做"
    :toolbar-list="['language', 'layout', 'theme']"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
