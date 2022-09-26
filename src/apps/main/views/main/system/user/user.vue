<template>
  <div class="user">
    <BeanForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="Refresh">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </template>
    </BeanForm>

    <div class="content">
      <BeanTable :listData="userList" :propList="propList">
        <template #status="scope">
          <el-button plain :type="scope.row.enable ? 'success' : 'danger'">{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </BeanTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IForm } from '@/base-ui/form'
import BeanForm from '@/base-ui/form'
import BeanTable from '@/base-ui/table'
import { Refresh, Search } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useSystemStore } from '@/stores'

const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px'
  },
  // colLayout: {
  //   span: 8
  // },
  formItems: [
    {
      type: 'input',
      field: 'id',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      type: 'input',
      field: 'name',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      field: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      field: 'sport',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        { label: '篮球', value: 'basketball' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      type: 'datepicker',
      field: 'createTime',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}

const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: ''
})

const systemStore = useSystemStore()
systemStore.getPageListAction({
  pageUrl: '/users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})

const userList = computed(() => systemStore.userList)
const totalCount = computed(() => systemStore.userCount)

const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号码', minWidth: '100' },
  { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '250',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '250',
    slotName: 'updateAt'
  }
]
</script>

<style scoped lang="scss">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
