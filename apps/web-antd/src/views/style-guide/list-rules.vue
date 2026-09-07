<script lang="ts" setup>
defineOptions({ name: 'ListPageRules' });

const listTypes = [
  {
    key: 'table',
    name: '标准表格列表',
    tag: '默认母版',
    summary: '查询、操作、表格与分页组成完整的数据管理页面。',
    suitable: '商户、订单、账号等结构化数据',
    example: '/usage-rules/list/examples?type=table',
  },
  {
    key: 'tree',
    name: '树形 + 表格',
    tag: '层级数据',
    summary: '左侧选择组织或分类，右侧展示当前节点下的数据。',
    suitable: '部门、菜单、类目和地区',
    example: '/usage-rules/list/examples?type=tree',
  },
  {
    key: 'card',
    name: '卡片列表',
    tag: '视觉数据',
    summary: '突出图片、状态和快捷操作，弱化横向字段比较。',
    suitable: '商品、门店、内容和素材',
    example: '/usage-rules/list/examples?type=card',
  },
];

const structureRules = [
  ['查询区', '承载高频筛选条件，低频条件折叠，不重复展示表格已有信息。'],
  ['操作区', '左侧放新增和批量操作，右侧保留视图、刷新等辅助能力。'],
  ['数据区', '表格用于字段比较，卡片用于视觉识别；不要只因样式偏好互换。'],
  ['分页区', '与数据区保持整体关系，统一展示总数、页码和每页条数。'],
];

const advice = [
  {
    condition: '大多数管理数据',
    result: '使用标准表格',
    reason: '字段可比较、操作稳定，也是成本最低的默认方案。',
  },
  {
    condition: '先选分类再看数据',
    result: '使用树形 + 表格',
    reason: '层级是筛选条件，不要把树形关系硬塞进普通表格。',
  },
  {
    condition: '识别对象依赖图片',
    result: '使用卡片列表',
    reason: '当图片比字段比较更重要时，卡片才能真正提高效率。',
  },
];
</script>

<template>
  <div class="wb-page-shell min-h-full bg-background-deep p-4">
    <div class="min-h-[calc(100vh-132px)] w-full rounded-xl bg-background p-5">
      <h1 class="m-0 text-xl font-semibold text-foreground">列表页示例</h1>
      <p class="mt-2 mb-0 text-sm text-muted-foreground">
        先确定数据的浏览方式，再选择列表形态；标准表格作为默认母版。
      </p>

      <section class="mt-7">
        <div class="flex flex-wrap items-end justify-between gap-2">
          <h2 class="m-0 text-base font-semibold text-foreground">常用形态</h2>
          <span class="text-xs text-muted-foreground">
            简单列表、主从列表和可编辑列表从核心形态中派生
          </span>
        </div>

        <div class="mt-4 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          <article
            v-for="item in listTypes"
            :key="item.key"
            class="overflow-hidden rounded-xl border border-border bg-background"
          >
            <div class="h-40 bg-muted/40 p-3">
              <div
                class="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background p-2.5 shadow-sm"
              >
                <div class="flex items-center gap-2">
                  <span class="h-3 flex-1 rounded bg-foreground/[0.07]"></span>
                  <span class="h-3 flex-1 rounded bg-foreground/[0.07]"></span>
                  <span class="h-3 w-8 rounded bg-primary/70"></span>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <span class="h-2 w-14 rounded bg-foreground/15"></span>
                  <span class="h-3 w-8 rounded bg-primary/15"></span>
                </div>

                <div v-if="item.key === 'table'" class="mt-2 flex-1">
                  <div class="grid grid-cols-4 gap-px rounded bg-border p-px">
                    <span
                      v-for="index in 16"
                      :key="index"
                      class="h-4 bg-background"
                      :class="index <= 4 ? 'bg-muted' : ''"
                    ></span>
                  </div>
                  <div
                    class="mt-2 ml-auto h-2 w-16 rounded bg-foreground/10"
                  ></div>
                </div>

                <div
                  v-else-if="item.key === 'tree'"
                  class="mt-2 flex min-h-0 flex-1 gap-2"
                >
                  <div class="w-1/3 rounded bg-muted/70 p-2">
                    <div class="h-2 rounded bg-primary/25"></div>
                    <div class="mt-2 h-2 rounded bg-foreground/10"></div>
                    <div class="mt-2 ml-2 h-2 rounded bg-foreground/10"></div>
                    <div class="mt-2 ml-2 h-2 rounded bg-foreground/10"></div>
                  </div>
                  <div
                    class="grid flex-1 grid-cols-3 gap-px rounded bg-border p-px"
                  >
                    <span
                      v-for="index in 12"
                      :key="index"
                      class="h-4 bg-background"
                      :class="index <= 3 ? 'bg-muted' : ''"
                    ></span>
                  </div>
                </div>

                <div
                  v-else-if="item.key === 'card'"
                  class="mt-2 grid flex-1 grid-cols-3 gap-2"
                >
                  <div
                    v-for="index in 6"
                    :key="index"
                    class="rounded border border-border p-1.5"
                  >
                    <div class="h-5 rounded bg-primary/[0.08]"></div>
                    <div
                      class="mt-1.5 h-1.5 w-3/4 rounded bg-foreground/15"
                    ></div>
                    <div class="mt-1 h-1.5 rounded bg-foreground/[0.07]"></div>
                  </div>
                </div>

                <div
                  v-else
                  class="mt-2 flex-1 rounded border border-border p-2"
                >
                  <div
                    v-for="index in 4"
                    :key="index"
                    class="flex items-center gap-2 border-b border-border py-1.5 last:border-0"
                  >
                    <span
                      class="size-2.5 rounded-full border"
                      :class="
                        index === 2
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      "
                    ></span>
                    <span class="h-2 flex-1 rounded bg-foreground/10"></span>
                    <span class="h-2 w-8 rounded bg-foreground/[0.06]"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4">
              <div class="flex items-center justify-between gap-3">
                <h3 class="m-0 text-sm font-semibold text-foreground">
                  {{ item.name }}
                </h3>
                <span class="shrink-0 text-xs font-medium text-primary">
                  {{ item.tag }}
                </span>
              </div>
              <p class="mt-2 mb-0 text-sm leading-6 text-foreground/80">
                {{ item.summary }}
              </p>
              <p class="mt-1 mb-0 text-xs text-muted-foreground">
                {{ item.suitable }}
              </p>
              <RouterLink
                :to="item.example"
                class="mt-3 inline-flex text-sm font-medium text-primary hover:opacity-80"
              >
                查看示例 →
              </RouterLink>
            </div>
          </article>
        </div>
      </section>

      <section
        class="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)]"
      >
        <div>
          <h2 class="m-0 text-base font-semibold text-foreground">
            标准列表骨架
          </h2>
          <div class="mt-4 overflow-hidden rounded-xl border border-border">
            <div
              v-for="([name, text], index) in structureRules"
              :key="name"
              class="grid grid-cols-[88px_minmax(0,1fr)] gap-4 px-4 py-3 text-sm"
              :class="index ? 'border-t border-border' : ''"
            >
              <div class="font-medium text-foreground">{{ name }}</div>
              <div class="leading-6 text-foreground/80">{{ text }}</div>
            </div>
          </div>
        </div>

        <div class="rounded-xl bg-primary/[0.045] p-5">
          <div class="flex items-center justify-between gap-3">
            <h2 class="m-0 text-base font-semibold text-foreground">
              使用建议
            </h2>
            <span class="text-xs font-medium text-primary">先用默认方案</span>
          </div>
          <div class="mt-3 space-y-2">
            <div
              v-for="item in advice"
              :key="item.condition"
              class="rounded-lg border border-primary/10 bg-background/90 px-4 py-3"
            >
              <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span class="text-muted-foreground">{{ item.condition }}</span>
                <span class="text-foreground/40">→</span>
                <span class="font-medium text-foreground">{{
                  item.result
                }}</span>
              </div>
              <p class="mt-1 mb-0 text-xs leading-5 text-foreground/70">
                {{ item.reason }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        class="mt-6 rounded-xl border border-border px-5 py-4 text-sm leading-6 text-foreground/80"
      >
        <span class="font-medium text-foreground">派生规则：</span>
        条件很少时收起查询区形成简单列表；从主体进入关联数据时沿用标准表格并补充上下文；只有连续维护少量简单字段时才开启行内编辑。
      </section>
    </div>
  </div>
</template>
