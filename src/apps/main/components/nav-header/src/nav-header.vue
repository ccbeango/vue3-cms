<template>
  <div class="nav-header">
    <el-icon @click="handleCollapseClick" :size="30">
      <Fold v-if="!collapse" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <BeanBreadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router';
import { useLoginStore } from '@/stores';
import BeanBreadcrumb from '@/base-ui/breadcrumb'
import UserInfo from './user-info.vue'
import { pathMapBreadcrumbs } from '@/utils/mapMenus'

const props = defineProps<{
  collapse: boolean
}>()

const emit = defineEmits<{
  (e: 'collapseChange', val: boolean): void
}>()

const handleCollapseClick = () => {
  emit('collapseChange', !props.collapse)
}

// 面包屑数据
const loginStore = useLoginStore()
const breadcrumbs = computed(() => {
  const userMenus = loginStore.userMenus
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})


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
