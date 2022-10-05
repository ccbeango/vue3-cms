<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <PageContent :contentTableConfig="contentTableConfig" pageName="role" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSystemStore } from '@/stores'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped lang="scss"></style>
