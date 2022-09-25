<template>
  <div class="bean-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
              />
              <el-select
                v-if="item.type === 'select'"
                style="width: 100%"
                :placeholder="item.placeholder"
                :v-bind="item.otherOptions"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  >{{ option.label }}</el-option
                >
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'datepicker'"
                style="width: 100%"
                v-bind="item.otherOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { IFormItem } from '../types'

withDefaults(
  defineProps<{
    labelWidth: string
    formItems: IFormItem[]
    itemStyle?: { [key: string]: any }
    colLayout?: {
      span?: number
      xl?: number
      lg?: number
      md?: number
      sm?: number
      xs?: number
    }
  }>(),
  {
    labelWidth: '100px',
    itemStyle: () => ({ padding: '10px 40px' }),
    colLayout: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
)
</script>

<style scoped></style>
