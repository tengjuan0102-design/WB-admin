<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({ name: 'DeviceCenterPlaceholder' });

const route = useRoute();
const pageTitle = computed(() => String(route.meta.title || '设备中心'));
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-104px)] w-full rounded-xl bg-background p-5">
      <h1 class="m-0 text-xl font-semibold text-foreground">
        {{ pageTitle }}
      </h1>
      <div
        class="flex min-h-[360px] items-center justify-center text-sm text-muted-foreground"
      >
        暂无功能
      </div>
    </div>
  </div>
</template>
