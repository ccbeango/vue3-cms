import { ref } from 'vue'
import type PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export default function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}
    pageModalRef.value!.dialogVisible = true
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    pageModalRef.value!.dialogVisible = true
    editCb && editCb(item)
  }

  return { pageModalRef, defaultInfo, handleNewData, handleEditData }
}
