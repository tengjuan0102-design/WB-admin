<script lang="ts" setup>
import type { MenuRecordRaw } from '@vben/types';

import type { MenuProps } from '@vben-core/menu-ui';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { Menu } from '@vben-core/menu-ui';

import { useNavigation } from './use-navigation';

interface Props extends MenuProps {
  collapse?: boolean;
  menus?: MenuRecordRaw[];
}

const props = withDefaults(defineProps<Props>(), {
  accordion: true,
  menus: () => [],
});

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

const route = useRoute();
const { navigation } = useNavigation();

async function handleSelect(key: string) {
  await navigation(key);
}
</script>

<template>
  <Menu
    :key="defaultOpeneds.join('|')"
    :accordion="accordion"
    :collapse="collapse"
    :default-active="route.meta?.activePath || route.path"
    :default-openeds="defaultOpeneds"
    :menus="menus"
    :rounded="rounded"
    :theme="theme"
    mode="vertical"
    @select="handleSelect"
  />
</template>
