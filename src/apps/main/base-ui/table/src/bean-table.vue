<template>
  <div class="bean-table">
    <el-table :data="listData" style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  listData: any[]
  propList: any[]
}>()
</script>

<style scoped lang="scss"></style>
