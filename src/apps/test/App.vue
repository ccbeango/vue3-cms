<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/test/home">Home</RouterLink>
      <RouterLink to="/test/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
