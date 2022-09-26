<template>
  <div class="bean-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.name"
        :to="{ path: '/' }"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import type { IBreadcrumb } from '../types'

withDefaults(
  defineProps<{
    breadcrumbs: IBreadcrumb[]
  }>(),
  {
    breadcrumbs: () => []
  }
)
</script>

<style scoped></style>
