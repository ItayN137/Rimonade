<script setup lang="ts">
defineProps<{
  text: string
  icon: string
  iconSize?: number
}>()


defineEmits<{
  click: []
}>()
</script>


<template>
  <button class="welcome-button" @click="$emit('click')">

    <span>
      {{ text }}
    </span>


    <img :src="icon" :style="{
      width: `${iconSize || 48}px`,
      height: `${iconSize || 48}px`
    }" alt="" />

  </button>
</template>


<style scoped src="./welcomebutton.css"></style>