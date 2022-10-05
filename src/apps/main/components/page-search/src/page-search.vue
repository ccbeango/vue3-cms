<template>
  <BeanForm v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h1 class="header">高级检索</h1>
    </template>
    <template #footer>
      <div class="handle-btns">
        <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
        <el-button type="primary" :icon="Search" @click="queryBtnClick"
          >搜索</el-button
        >
      </div>
    </template>
  </BeanForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import BeanForm from '@/base-ui/form'
import type { IForm } from '@/base-ui/form'

const props = defineProps<{
  searchFormConfig: IForm
}>()

const emit = defineEmits<{
  (e: 'resetBtnClick'): void
  (e: 'queryBtnClick',  val: any): void
}>()

const formItems = props.searchFormConfig.formItems
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 点击重置
const handleResetClick = () => {
  // watch双向绑定 使用这种方法清除
  // for (const key in formOriginData) {
  //   console.log('重置', key)
  //   formData.value[key] = formOriginData[key]
  // }

  // 不使用双向绑定
  formData.value = formOriginData

  emit('resetBtnClick')
}

// 点击搜索
const queryBtnClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style lang="scss" scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
