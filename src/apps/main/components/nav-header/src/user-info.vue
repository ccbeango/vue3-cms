<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        >
        </el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLoginStore } from '@/stores'

const loginStore = useLoginStore()
console.log('loginStore', loginStore, loginStore.userInfo)
const name = computed(() => loginStore.userInfo!.name)
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
}
</style>
