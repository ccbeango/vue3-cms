<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </PageContent>
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfigComputed"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></PageModal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { useSystemStore } from '@/stores'
import { usePageSearch, usePageModal } from '@/hooks'
import { computed } from 'vue'

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()

const newCallback = () => {
  console.log('新增')
  const passwordItem = modalConfig.formItems.find(
    item => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
const editCallback = () => {
  console.log('编辑')
  const passwordItem = modalConfig.formItems.find(
    item => item.field === 'password'
  )
  passwordItem!.isHidden = true
}

const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
  usePageModal(newCallback, editCallback)

// 动态添加部门列表和角色列表
const systemStore = useSystemStore()
const modalConfigComputed = computed(() => {
  const departmentItem = modalConfig.formItems.find(
    item => item.field === 'departmentId'
  )
  departmentItem!.options = systemStore.entireDepartment.map(item => ({
    label: item.name,
    value: item.id
  }))

  const roleItem = modalConfig.formItems.find(
    item => item.field === 'roleId'
  )
  roleItem!.options = systemStore.entireRole.map(item => ({
    label: item.name,
    value: item.id
  }))

  return modalConfig
})
</script>

<style scoped lang="scss"></style>
