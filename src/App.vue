<script setup lang="ts">
import Navbar from './components/navbar/navbar.vue'
</script>

<template>
  <Navbar />
  <main class="app-content">
    <RouterView />
  </main>
</template>


<style scoped>
.app-content {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: linear-gradient(to bottom,
      #fff7f8 0%,
      #fff1f3 35%,
      #ffdfe2 100%);
}

.app-content>* {
  width: 100%;
  min-width: 0;
  margin: 0;
}
</style>

<style>
* {
  box-sizing: border-box;
}


html,
body,
#app {
  width: 100%;
  min-width: 0;
  min-height: 100dvh;

  margin: 0;
  padding: 0;
}

html,
body {
  overflow-x: hidden;
}


body {
  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


button,
input {
  font-family: inherit;
}
</style>
