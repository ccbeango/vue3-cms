import { useLoginStore } from '@/stores'

export default function usePermission(pageName: string, hanldeName: string) {
  const loginStore = useLoginStore()

  const verifyPermission = `system:${pageName}:${hanldeName}`

  return !!~loginStore.btnPermissions.findIndex(
    item => verifyPermission === item
  )
}
