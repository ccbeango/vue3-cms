<template>
  <div class="nav-header">
    <el-icon @click="handleCollapseClick" :size="30">
      <Fold v-if="!collapse" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import UserInfo from './user-info.vue'

const props = defineProps<{
  collapse: boolean
}>()

const emit = defineEmits<{
  (e: 'collapseChange', val: boolean): void
}>()

const handleCollapseClick = () => {
  emit('collapseChange', !props.collapse)
}
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    display: block;
    width: 30px;
    height: 30px;
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
