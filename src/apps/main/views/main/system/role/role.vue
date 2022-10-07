<template>
  <div class="role">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="entireMenu"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/stores'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import type { ElTree } from 'element-plus'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch, usePageModal } from '@/hooks'

import { menuMapLeafKeys } from '@/utils/mapMenus'

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  console.log('编辑', leafKeys)
  nextTick(() => {
    console.log(elTreeRef.value)
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}

const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
  usePageModal(undefined, editCallback)

const systemStore = useSystemStore()

const { entireMenu } = storeToRefs(systemStore)
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  console.log('修改的', menuList)
  otherInfo.value = { menuList }
}
</script>

<style scoped lang="scss">
.menu-tree {
  margin-left: 25px;
}
</style>
