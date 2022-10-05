<template>
  <div class="bean-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" style="width: 100%">
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITablePropItem } from '../types'

const props = withDefaults(
  defineProps<{
    title?: string
    showIndexColumn?: boolean
    showSelectColumn?: boolean
    listData: any[]
    totalCount: number
    propList: ITablePropItem[]
    page: { currentPage: number; pageSize: number }
  }>(),
  {
    title: '',
    showIndexColumn: false,
    showSelectColumn: false
  }
)

const emit = defineEmits<{
  (e: 'update:page', val: { currentPage: number; pageSize: number }): void
}>()

const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}
const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  .el-pagination {
    justify-content: flex-end;
  }
}
</style>
