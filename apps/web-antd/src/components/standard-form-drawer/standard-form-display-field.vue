<script lang="ts" setup>
interface Props {
  label: string;
  value?: number | string;
}

withDefaults(defineProps<Props>(), {
  value: '',
});
</script>

<template>
  <div class="grid min-h-12 grid-cols-[20.833333%_79.166667%] items-start">
    <div class="py-3 pr-6 text-right text-sm leading-6 text-muted-foreground">
      {{ label }}
    </div>
    <div class="min-w-0 py-3 text-sm leading-6 text-foreground">
      <slot>{{ value || '-' }}</slot>
    </div>
  </div>
</template>
