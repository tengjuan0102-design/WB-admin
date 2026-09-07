<script lang="ts" setup>
interface Props {
  first?: boolean;
  title: string;
}

withDefaults(defineProps<Props>(), {
  first: false,
});
</script>

<template>
  <section :class="first ? '' : 'mt-8'">
    <div class="wb-form-section-title mb-5 px-3 py-2 text-base font-semibold">
      {{ title }}
    </div>
    <slot></slot>
  </section>
</template>

<style scoped>
.wb-form-section-title {
  background: var(--wb-color-surface-muted);
  border-radius: var(--radius);
}
</style>
