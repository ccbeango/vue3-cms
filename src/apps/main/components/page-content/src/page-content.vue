<template>
  <div class="page-content">
    <BeanTable
      :listData="dataList"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      :totalCount="totalCount"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            :icon="Edit"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            :icon="Delete"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
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
import { usePermission } from '@/hooks'

const props = defineProps<{
  contentTableConfig: ITable
  pageName: string
}>()
const systemStore = useSystemStore()

// 0.获取操作的权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

const pageInfo = ref({ currentPage: 0, pageSize: 10 })
watch(pageInfo, () => getPageData())

const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
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

// 获取其它动态插槽
const otherPropSlots: any = props.contentTableConfig.propList.filter(item => {
  const commonSlots = [undefined, 'createAt', 'updateAt', 'handler']
  if (commonSlots.includes(item.slotName)) return false
  return true
})

const emit = defineEmits<{
  (e: 'newBtnClick'): void
  (e: 'editBtnClick', val: any): void
}>()

// 新增
const handleNewClick = () => {
  emit('newBtnClick')
}
// 编辑
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
// 删除
const handleDeleteClick = (item: any) => {
  systemStore.deletePageDataAction({
    pageName: props.pageName,
    id: item.id
  })
}
</script>

<style lang="scss" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
