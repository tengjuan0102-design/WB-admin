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
    <div class="mb-5 rounded-md bg-[#f5f6f8] px-3 py-2 text-base font-semibold">
      {{ title }}
    </div>
    <slot></slot>
  </section>
</template>
