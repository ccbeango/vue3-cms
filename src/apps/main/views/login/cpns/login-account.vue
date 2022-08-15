<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { rules } from '../confg/account-config'
import localCache from '@/utils/cache'
import { useLoginStore } from '@/stores'

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate(valid => {
    if (valid) {
      console.log('真正执行登录逻辑')
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      const loginStore = useLoginStore()
      loginStore.accountLoginAction(account)
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="scss" scoped></style>
