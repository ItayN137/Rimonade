<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

withDefaults(
  defineProps<{
    label: string
    options: string[]
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    placeholder: '',
    disabled: false,
  },
)

const model = defineModel<string>({ default: '' })

const dropdown = ref<HTMLElement | null>(null)
const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: string) {
  model.value = option
  isOpen.value = false
}

function closeDropdown(event: PointerEvent) {
  if (!dropdown.value?.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('pointerdown', closeDropdown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeDropdown))
</script>

<template>
  <div ref="dropdown" class="dropdown-line" @keydown.esc="isOpen = false">
    <span class="dropdown-label">{{ label }}</span>

    <button class="dropdown-trigger" type="button" :disabled="disabled" :aria-expanded="isOpen" aria-haspopup="listbox"
      @click="toggleDropdown">
      <span :class="{ placeholder: !model }">
        {{ model || placeholder }}
      </span>
      <span class="dropdown-arrow" :class="{ open: isOpen }">⌄</span>
    </button>

    <div v-if="isOpen" class="dropdown-menu" role="listbox">
      <button v-for="option in options" :key="option" class="dropdown-option" :class="{ selected: model === option }"
        type="button" role="option" :aria-selected="model === option" @click="selectOption(option)">
        {{ option }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown-line {
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

.dropdown-label {
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  direction: rtl;
  color: #111;
  font-size: clamp(1.125rem, 3vw, 1.5625rem);
}

.dropdown-trigger {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: rtl;
  width: calc(100% - clamp(1.5rem, 4vw, 1.875rem));
  height: clamp(2.5rem, 6vw, 2.8125rem);
  margin: clamp(0.5rem, 1.5vw, 0.625rem);
  padding: 0 clamp(0.375rem, 1vw, 0.5rem);
  border: 0;
  outline: 0;
  background: transparent;
  color: #111;
  font-family: inherit;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  text-align: right;
  cursor: pointer;
}

.placeholder {
  color: #1111119c;
}

.dropdown-trigger:focus-visible {
  border-radius: 0.5rem;
  box-shadow: 0 0 0 3px rgba(173, 23, 70, 0.12);
}

.dropdown-arrow {
  color: #111;
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  line-height: 1;
  transition: transform 0.2s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.375rem);
  right: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: min(20rem, 45vh);
  padding: 0.625rem;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.875rem;
  background: #fff;
  box-shadow: 0 16px 36px rgba(43, 27, 34, 0.16);
}

.dropdown-option {
  width: 100%;
  min-height: clamp(2.75rem, 6vw, 3.25rem);
  padding: 0.625rem 1rem;
  border: 0;
  border-radius: 0.75rem;
  background: transparent;
  color: #111;
  font-family: inherit;
  font-size: clamp(1rem, 2.5vw, 1.1875rem);
  text-align: right;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-option:hover,
.dropdown-option:focus-visible,
.dropdown-option.selected {
  outline: 0;
  background: #f3f1f2;
}

.dropdown-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
