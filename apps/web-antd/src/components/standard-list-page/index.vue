<script lang="ts" setup>
defineProps<{
  filterTitle?: string;
  listTitle: string;
  title: string;
}>();
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-104px)] w-full rounded-xl bg-background p-5">
      <div class="mb-5 flex items-center justify-between">
        <h1 class="m-0 text-xl font-semibold text-foreground">
          {{ title }}
        </h1>
        <div v-if="$slots.actions">
          <slot name="actions"></slot>
        </div>
      </div>

      <section v-if="$slots.filters" class="standard-filter-panel mb-6">
        <div
          v-if="filterTitle"
          class="mb-4 text-base font-semibold text-foreground"
        >
          {{ filterTitle }}
        </div>
        <div class="standard-filter-grid">
          <slot name="filters"></slot>
        </div>
        <div
          v-if="$slots['filter-actions']"
          class="mt-5 flex justify-end gap-3"
        >
          <slot name="filter-actions"></slot>
        </div>
      </section>

      <section>
        <div class="mb-4 text-base font-semibold text-foreground">
          {{ listTitle }}
        </div>
        <div class="standard-list-table">
          <slot name="table"></slot>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.standard-filter-panel {
  padding: var(--wb-space-panel);
  background: var(--wb-color-surface-subtle);
  border-radius: var(--wb-radius-section);
}

.standard-filter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

@media (min-width: 1024px) {
  .standard-filter-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1536px) {
  .standard-filter-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.standard-list-table :deep(.ant-table-thead > tr > th) {
  font-weight: 600;
  background: var(--wb-color-surface-subtle) !important;
}

.standard-list-table :deep(.ant-table-tbody > tr:hover > td) {
  background: var(--wb-color-row-hover) !important;
}
</style>
