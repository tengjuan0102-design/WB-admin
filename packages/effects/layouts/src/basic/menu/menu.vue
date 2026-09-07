<script lang="ts" setup>
import type { MenuRecordRaw } from '@vben/types';

import type { MenuProps } from '@vben-core/menu-ui';

import { computed } from 'vue';

import { Menu } from '@vben-core/menu-ui';

interface Props extends MenuProps {
  menus?: MenuRecordRaw[];
}

const props = withDefaults(defineProps<Props>(), {
  accordion: true,
  menus: () => [],
});

const emit = defineEmits<{
  open: [string, string[]];
  select: [string, string?];
}>();

const defaultOpeneds = computed(() => {
  const paths: string[] = [];
  const collect = (items: MenuRecordRaw[]) => {
    for (const item of items) {
      if (item.children?.length) {
        paths.push(item.path);
        collect(item.children);
      }
    }
  };
  collect(props.menus);
  return paths;
});

function handleMenuSelect(key: string) {
  emit('select', key, props.mode);
}

function handleMenuOpen(key: string, path: string[]) {
  emit('open', key, path);
}
</script>

<template>
  <Menu
    :key="defaultOpeneds.join('|')"
    :accordion="accordion"
    :collapse="collapse"
    :collapse-show-title="collapseShowTitle"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :menus="menus"
    :mode="mode"
    :rounded="rounded"
    scroll-to-active
    :theme="theme"
    @open="handleMenuOpen"
    @select="handleMenuSelect"
  />
</template>
