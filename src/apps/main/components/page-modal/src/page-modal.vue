<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <BeanForm v-bind="modalConfig" v-model="formData"></BeanForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BeanForm from '@/base-ui/form'
import type { IForm } from '@/base-ui/form'
import { useSystemStore } from '@/stores'

const props = defineProps<{
  modalConfig: IForm
  defaultInfo: any
  pageName: string
}>()

const formData = ref<any>({})
watch(
  () => props.defaultInfo,
  newValue => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

const systemStore = useSystemStore()

const dialogVisible = ref(false)
const handleConfirmClick = () => {
  dialogVisible.value = false

  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    systemStore.editPageDataAction({
      pageName: props.pageName,
      id: props.defaultInfo.id,
      editData: { ...formData.value }
    })
  } else {
    // 新增
    systemStore.createPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value }
    })
  }
}

defineExpose({
  dialogVisible
})
</script>
