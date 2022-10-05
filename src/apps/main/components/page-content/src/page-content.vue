<template>
  <div class="page-content">
    <BeanTable
      :listData="dataList"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      :totalCount="totalCount"
    >
      <template #headerHandler>
        <el-button type="primary" size="medium">新建用户</el-button>
      </template>

      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button :icon="Edit" type="text">编辑</el-button>
          <el-button :icon="Delete" type="text">删除</el-button>
        </div>
      </template>
    </BeanTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSystemStore } from '@/stores'
import type { SystemPageListColumn, SystemPageCountColumn } from '@/stores'
import { Edit, Delete } from '@element-plus/icons-vue'
import BeanTable from '@/base-ui/table'
import type { ITable } from '@/base-ui/table'

const props = defineProps<{
  contentTableConfig: ITable
  pageName: string
}>()
const systemStore = useSystemStore()

const pageInfo = ref({ currentPage: 0, pageSize: 10 })
watch(pageInfo, () => getPageData())

const getPageData = (queryInfo: any = {}) => {
  systemStore.getPageListAction({
    pageName: props.pageName,
    queryInfo: {
      offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()

defineExpose({
  getPageData
})

const dataList = computed(
  () => systemStore[`${props.pageName}List` as SystemPageListColumn]
)
const totalCount = computed(
  () => systemStore[`${props.pageName}Count` as SystemPageCountColumn]
)
</script>

<style lang="scss" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
