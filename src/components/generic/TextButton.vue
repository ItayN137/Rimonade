<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    icon?: string
    iconSize?: number
    disabled?: boolean
    variant?: 'default' | 'primary'
    fullWidth?: boolean
  }>(),
  {
    iconSize: 48,
    variant: 'default',
  },
)

defineEmits<{ click: [] }>()
</script>

<template>
  <button class="text-button" :class="[
    `text-button--${variant}`,
    { 'text-button--full-width': fullWidth }
  ]" type="button" :disabled="disabled" @click="$emit('click')">
    <span>{{ text }}</span>
    <img v-if="icon" :src="icon" :width="iconSize" :height="iconSize" alt="" />
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

.text-button:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-2px);
}

.text-button:active {
  transform: scale(0.99);
}

.text-button:disabled {
  cursor: not-allowed;
}

.text-button--full-width {
  width: 100%;
}

.text-button--primary {
  min-height: 3.4rem;
  display: block;
  padding: 0;
  background: #ad1746;
  color: white;
  font-size: 1.08rem;
  box-shadow: 0 8px 20px rgba(173, 23, 70, 0.2);
}

.text-button--primary span {
  color: white;
  font-size: 1.08rem;
  text-align: center;
}

.text-button--primary:hover:not(:disabled) {
  background: #92123b;
  transform: none;
}

.text-button--primary:disabled {
  background: #c8bec1;
  color: #71696c;
  cursor: not-allowed;
  box-shadow: none;
}

.text-button--primary:disabled span {
  color: #71696c;
}
</style>
