<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen bg-[#222222]">
    <RouterLink to="/">Home</RouterLink>
    <RouterView />
  </div>
</template>
