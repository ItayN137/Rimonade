<script setup lang="ts">
import Navbar from './components/navbar/navbar.vue'
import './App.css'
</script>

<template>
  <Navbar />

  <main class="app-content">
    <RouterView />
  </main>
</template>