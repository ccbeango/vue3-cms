<template>
  <div class="bean-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <!-- @input="handle" -->
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- watch实现双向绑定写法  -->
              <!-- <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                v-model="formData[item.field]"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
              /> -->
              <el-input
                v-if="item.type === 'input' || item.type === 'password'"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
              />
              <el-select
                v-if="item.type === 'select'"
                style="width: 100%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
                :placeholder="item.placeholder"
                :v-bind="item.otherOptions"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-select>
              <el-date-picker
                v-else-if="item.type === 'datepicker'"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
                style="width: 100%"
                v-bind="item.otherOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IFormItem } from '../types'

const props = withDefaults(
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
    modelValue: { [key: string]: any }
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

const emit = defineEmits(['update:modelValue'])

// 不使用双向绑定
const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

// 方法1： 并没有触发set 未实现双向绑定，其实是直接修改了对象的值
// const formData = computed({
//   get() {
//     console.log('zheshi什么', props.modelValue)
//     return props.modelValue
//   },
//   set(value) {
//     console.log('这触发了吗', value)
//     emit('update:modelValue', value)
//   }
// })

// 方法2：虽然触发了handle，但也是直接修改了原对象的值，不使用emit也可以
// const formData = computed(() => {
//   return props.modelValue
// })
// function handle() {
//   emit('update:modelValue', formData)
// }

// 方法3：重新赋值，真正的双向绑定 但是无法在外面清除重置
// const formData = ref({ ...props.modelValue })
// function handle() {
//   emit('update:modelValue', formData)
// }

// 方法3：可用方法 重新赋值，使用watch实现双向绑定
// const formData = ref({ ...props.modelValue })
// watch(
//   formData,
//   newValue => {
//     console.log('新值', newValue)
//     emit('update:modelValue', newValue)
//   },
//   { deep: true }
// )
</script>

<style scoped></style>
