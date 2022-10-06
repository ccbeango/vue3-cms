<template>
  <div class="user">
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '上架' : '下架' }}</el-button
        >
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="scss"></style>
