import type { type } from 'os'

type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  field: string
  label: string
  rules?: any[]
  placeholder?: string
  // 针对select
  options?: { label: string | number; value: string | number }[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
