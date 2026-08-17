<script lang="ts" setup>
import { Button, Drawer, Form } from 'ant-design-vue';

interface Props {
  cancelText?: string;
  confirmText?: string;
  mode?: 'create' | 'edit' | 'view';
  open: boolean;
  title: string;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  cancelText: '取消',
  confirmText: '保存',
  mode: 'create',
  width: 640,
});

const emit = defineEmits<{
  confirm: [];
  'update:open': [value: boolean];
}>();

function closeDrawer() {
  emit('update:open', false);
}
</script>

<template>
  <Drawer
    :destroy-on-close="true"
    :open="props.open"
    :title="props.title"
    :width="props.width"
    @update:open="emit('update:open', $event)"
  >
    <Form
      v-if="props.mode !== 'view'"
      :label-col="{ span: 5 }"
      label-align="right"
      :wrapper-col="{ span: 19 }"
    >
      <slot></slot>
    </Form>
    <div v-else>
      <slot name="view"></slot>
    </div>

    <template #footer>
      <div class="flex min-h-14 items-center justify-end gap-3">
        <slot v-if="props.mode === 'view'" name="view-actions"></slot>
        <Button @click="closeDrawer">
          {{ props.mode === 'view' ? '关闭' : props.cancelText }}
        </Button>
        <Button
          v-if="props.mode !== 'view'"
          type="primary"
          @click="emit('confirm')"
        >
          {{ props.confirmText }}
        </Button>
      </div>
    </template>
  </Drawer>
</template>
