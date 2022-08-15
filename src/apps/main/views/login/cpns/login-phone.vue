<template>
  <div class="login-phone">
    <el-form label-width="60px" :model="phone" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const phone = reactive({
  num: '',
  code: ''
})

const loginAction = () => {
  console.log('Phone LoginAction')
}

defineExpose({
  loginAction
})
</script>

<style lang="scss" scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
