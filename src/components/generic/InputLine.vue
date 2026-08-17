<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    label: string
    icon?: string
    type?: string
    iconSize?: number
    rows?: number
  }>(),
  {
    type: 'text',
    iconSize: 16,
    rows: 1,
  },
)

const model = defineModel<string>({ default: '' })

const isMultiline = computed(() => props.rows > 1)
const containerHeight = computed(() =>
  isMultiline.value ? `${60 + props.rows * 45}px` : undefined,
)
const fieldHeight = computed(() =>
  isMultiline.value ? `${props.rows * 45}px` : undefined,
)

function updateValue(event: Event) {
  const field = event.target as HTMLInputElement | HTMLTextAreaElement
  model.value = field.value
}
</script>

<template>
  <label class="input-line" :class="{ 'input-line--multiline': isMultiline }" :style="{ minHeight: containerHeight }">
    <span class="input-label">
      <span>{{ label }}</span>
      <img v-if="icon" :src="icon" :width="iconSize" :height="iconSize" alt="" />
    </span>

    <textarea v-if="isMultiline" v-bind="$attrs" :value="model" :rows="rows" :style="{ height: fieldHeight }"
      @input="updateValue"></textarea>

    <input v-else v-bind="$attrs" :value="model" :type="type" @input="updateValue" />
  </label>
</template>

<style scoped>
.input-line {
  position: relative;
  display: block;
  width: 100%;
  min-height: clamp(5.5rem, 10vw, 6.5625rem);
  margin-top: clamp(0.5rem, 1.5vw, 0.625rem);
  padding: clamp(0.75rem, 2vw, 0.9375rem) clamp(0.75rem, 2vw, 0.875rem);
  border-bottom: 2px solid #202020;
  border-radius: clamp(0.75rem, 2vw, 1.125rem);
  background: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.input-label {
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  direction: rtl;
  color: #111;
  font-size: clamp(1.125rem, 3vw, 1.5625rem);
}

.input-label img {
  max-width: 20px;
  max-height: 20px;
  flex-shrink: 0;
}

input,
textarea {
  position: absolute;
  bottom: 0;
  width: calc(100% - clamp(1.5rem, 4vw, 1.875rem));
  height: clamp(2.5rem, 6vw, 2.8125rem);
  margin: clamp(0.5rem, 1.5vw, 0.625rem);
  padding: 0 clamp(0.375rem, 1vw, 0.5rem);
  border: 0;
  outline: 0;
  background: transparent;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  text-align: right;
}

textarea {
  resize: none;
  font-family: inherit;
}
</style>
