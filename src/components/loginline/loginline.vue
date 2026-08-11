<script setup lang="ts">
const props = defineProps<{
  text: string
  icon: string
  type?: string
  iconSize?: number
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="login-line">
    <div class="login-label">
      <span>{{ text }}</span>

      <img
        :src="icon"
        :style="{
          width: `${iconSize || 16}px`,
          height: `${iconSize || 16}px`
        }"
      />
    </div>

    <input
      :value="props.modelValue"
      @input="updateValue"
      :type="props.type || 'text'"
    />
  </div>
</template>

<style scoped src="./loginline.css"></style>