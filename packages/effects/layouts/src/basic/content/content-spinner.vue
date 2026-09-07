<script lang="ts" setup>
import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <Transition name="wb-loading-fade">
    <div
      v-if="spinning"
      class="wb-content-loading absolute inset-0 z-100 flex items-center justify-center overflow-hidden rounded-[inherit] bg-background/72 backdrop-blur-[1px]"
    >
      <span
        aria-label="页面加载中"
        class="wb-loading-ring size-7 rounded-full border-2 border-primary/20 border-t-primary"
      ></span>
    </div>
  </Transition>
</template>

<style scoped>
.wb-loading-ring {
  animation: wb-loading-spin 0.72s linear infinite;
}

.wb-loading-fade-enter-active,
.wb-loading-fade-leave-active {
  transition: opacity 0.15s ease;
}

.wb-loading-fade-enter-from,
.wb-loading-fade-leave-to {
  opacity: 0;
}

@keyframes wb-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
