import type { ComputedRef } from 'vue';

import type { MenuRecordRaw } from '@vben/types';

import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { preferences } from '@vben/preferences';
import { useAccessStore } from '@vben/stores';
import { findRootMenuByPath } from '@vben/utils';

import { useNavigation } from './use-navigation';

function useExtraMenu(useRootMenus?: ComputedRef<MenuRecordRaw[]>) {
  const accessStore = useAccessStore();
  const { navigation, willOpenedByWindow } = useNavigation();

  const menus = computed(() => useRootMenus?.value ?? accessStore.accessMenus);

  const extraRootMenus = ref<MenuRecordRaw[]>([]);
  const route = useRoute();
  const extraMenus = ref<MenuRecordRaw[]>([]);
  const sidebarExtraVisible = ref<boolean>(false);
  const extraActiveMenu = ref('');
  const parentLevel = computed(() =>
    preferences.app.layout === 'sidebar-mixed-nav' &&
    !preferences.navigation.topMenuEnable
      ? 0
      : ['header-mixed-nav', 'sidebar-mixed-nav'].includes(
            preferences.app.layout,
          )
        ? 1
        : 0,
  );
  const isParallelMenu = computed(
    () => preferences.app.layout === 'sidebar-mixed-nav',
  );

  /**
   * 选择混合菜单事件
   * @param menu
   */
  const handleMixedMenuSelect = async (menu: MenuRecordRaw) => {
    const _extraMenus = menu?.children ?? [];
    const hasChildren = _extraMenus.length > 0;

    if (!willOpenedByWindow(menu.path)) {
      extraMenus.value = _extraMenus ?? [];
      extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;
      sidebarExtraVisible.value = hasChildren;
    }

    if (!hasChildren) {
      await navigation(menu.path);
    } else if (preferences.sidebar.autoActivateChild) {
      await navigation(menu.path);
    }
  };

  /**
   * 选择默认菜单事件
   * @param menu
   * @param rootMenu
   */
  const handleDefaultSelect = async (
    menu: MenuRecordRaw,
    rootMenu?: MenuRecordRaw,
  ) => {
    extraMenus.value = rootMenu?.children ?? extraRootMenus.value ?? [];
    extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;

    if (preferences.sidebar.expandOnHover || isParallelMenu.value) {
      sidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  };

  /**
   * 侧边菜单鼠标移出事件
   */
  const handleSideMouseLeave = () => {
    if (isParallelMenu.value && preferences.sidebar.extraCollapse) {
      sidebarExtraVisible.value = false;
      return;
    }
    if (preferences.sidebar.expandOnHover || isParallelMenu.value) {
      return;
    }

    const { findMenu, rootMenu, rootMenuPath } = findRootMenuByPath(
      menus.value,
      route.path,
    );
    extraActiveMenu.value = rootMenuPath ?? findMenu?.path ?? '';
    extraMenus.value = rootMenu?.children ?? [];
  };

  const handleMenuMouseEnter = (menu: MenuRecordRaw) => {
    if (
      (isParallelMenu.value && preferences.sidebar.extraCollapse) ||
      !preferences.sidebar.expandOnHover
    ) {
      const { findMenu } = findRootMenuByPath(menus.value, menu.path);
      extraMenus.value = findMenu?.children ?? [];
      extraActiveMenu.value = menu.parents?.[parentLevel.value] ?? menu.path;
      sidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  };

  function calcExtraMenus(path: string) {
    const currentPath = route.meta?.activePath || path;
    const { findMenu, rootMenu, rootMenuPath } = findRootMenuByPath(
      menus.value,
      currentPath,
      parentLevel.value,
    );
    extraRootMenus.value = rootMenu?.children ?? [];
    extraActiveMenu.value = rootMenuPath ?? findMenu?.path ?? '';
    extraMenus.value = rootMenu?.children ?? [];
    if (preferences.sidebar.expandOnHover || isParallelMenu.value) {
      sidebarExtraVisible.value = extraMenus.value.length > 0;
    }
  }

  watch(
    () => [
      route.path,
      preferences.app.layout,
      preferences.navigation.topMenuEnable,
    ],
    () => {
      calcExtraMenus(route.path || '');
    },
    { immediate: true },
  );

  return {
    extraActiveMenu,
    extraMenus,
    handleDefaultSelect,
    handleMenuMouseEnter,
    handleMixedMenuSelect,
    handleSideMouseLeave,
    sidebarExtraVisible,
  };
}

export { useExtraMenu };
