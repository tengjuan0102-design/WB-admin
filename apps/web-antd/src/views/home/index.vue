<script lang="ts" setup>
defineOptions({ name: 'Home' });
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div
      class="flex min-h-[calc(100vh-132px)] w-full flex-col items-center justify-center rounded-xl bg-background px-6 py-10 text-center"
    >
      <img
        alt="旺宝 AI 服务工作台插画"
        class="mb-2 w-full max-w-[420px] select-none"
        draggable="false"
        src="/images/wanbao-home-welcome.png"
      />
      <h1 class="text-xl font-semibold text-foreground">
        旺宝 AI 后台设计模板
      </h1>
      <p class="mt-2 text-sm text-muted-foreground">
        共享视觉规范、导航方案与常用页面结构，快速搭建后台产品初版框架
      </p>
    </div>
  </div>
</template>
