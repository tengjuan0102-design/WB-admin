<script lang="ts" setup>
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="flex min-w-0 items-center gap-3">
    <div class="w-[6em] shrink-0 text-right text-sm text-foreground">
      {{ label }}
    </div>
    <div class="min-w-0 flex-1">
      <slot></slot>
    </div>
  </div>
</template>
