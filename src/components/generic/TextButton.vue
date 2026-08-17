<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    icon: string
    iconSize?: number
  }>(),
  {
    iconSize: 48,
  },
)

defineEmits<{ click: [] }>()
</script>

<template>
  <button class="text-button" type="button" @click="$emit('click')">
    <span>{{ text }}</span>
    <img :src="icon" :width="iconSize" :height="iconSize" alt="" />
  </button>
</template>

<style scoped>
.text-button {
  width: 100%;
  min-height: clamp(5rem, 12vw, 6.875rem);
  display: flex;
  align-items: center;
  direction: rtl;
  gap: clamp(0.75rem, 2.5vw, 1.125rem);
  padding: clamp(0.875rem, 2.5vw, 1.125rem) clamp(1rem, 3vw, 1.375rem);
  border: 0;
  border-radius: clamp(0.75rem, 2vw, 1.125rem);
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease, background-color 0.15s ease;
}

span {
  flex: 1;
  color: #2b1b22;
  font-size: clamp(1.125rem, 3vw, 1.625rem);
  font-weight: 600;
  text-align: right;
}

img {
  object-fit: contain;
  flex-shrink: 0;
}

.text-button:hover {
  background: #fff;
  transform: translateY(-2px);
}

.text-button:active {
  transform: scale(0.99);
}
</style>
