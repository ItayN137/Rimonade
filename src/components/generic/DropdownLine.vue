<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type DropdownOption = string | Record<string, unknown>

const props = withDefaults(
  defineProps<{
    label: string
    options: DropdownOption[]
    placeholder?: string
    disabled?: boolean
    searchable?: boolean
    displayFields?: string[]
    valueField?: string
  }>(),
  {
    placeholder: '',
    disabled: false,
    searchable: false,
    displayFields: () => [],
    valueField: '',
  },
)

const model = defineModel<string>({ default: '' })

const dropdown = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const searchText = ref('')

function isObjectOption(option: DropdownOption): option is Record<string, unknown> {
  return typeof option === 'object' && option !== null
}

function getOptionValue(option: DropdownOption): string {
  if (!isObjectOption(option)) {
    return option
  }

  return String(option[props.valueField] ?? '')
}

function getDisplayValues(option: DropdownOption): string[] {
  if (!isObjectOption(option)) {
    return [option]
  }

  const fields = props.displayFields.length > 0
    ? props.displayFields
    : props.valueField
      ? [props.valueField]
      : []

  return fields.map(field => String(option[field] ?? ''))
}

const selectedOption = computed(() =>
  props.options.find(option => getOptionValue(option) === model.value)
)

const selectedDisplay = computed(() =>
  selectedOption.value ? getOptionValue(selectedOption.value) : model.value
)

const filteredOptions = computed(() => {
  if (!props.searchable || !searchText.value.trim()) {
    return props.options
  }

  const search = searchText.value.trim().toLowerCase()

  return props.options.filter(option =>
    getDisplayValues(option).some(value =>
      value.toLowerCase().includes(search)
    )
  )
})

function closeMenu() {
  isOpen.value = false
  searchText.value = selectedDisplay.value
}

function toggleDropdown() {
  isOpen.value = !isOpen.value

  if (!isOpen.value) {
    searchText.value = selectedDisplay.value
  }
}

function openSearchableDropdown() {
  if (!props.disabled) {
    isOpen.value = true
  }
}

function handleSearchInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value

  searchText.value = value
  isOpen.value = true

  if (value !== model.value) {
    model.value = ''
  }
}

function selectInputText(event: FocusEvent) {
  openSearchableDropdown()
  ;(event.target as HTMLInputElement).select()
}

function selectOption(option: DropdownOption) {
  const selectedValue = getOptionValue(option)

  model.value = selectedValue
  searchText.value = selectedValue
  isOpen.value = false
}

function isSelected(option: DropdownOption): boolean {
  return model.value === getOptionValue(option)
}

function closeDropdown(event: PointerEvent) {
  if (!dropdown.value?.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => document.addEventListener('pointerdown', closeDropdown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeDropdown))

watch(selectedDisplay, (display) => {
  if (!isOpen.value) {
    searchText.value = display
  }
}, { immediate: true })
</script>

<template>
  <div ref="dropdown" class="dropdown-line" @keydown.esc="closeMenu">
    <span class="dropdown-label">{{ label }}</span>

    <button v-if="!searchable" class="dropdown-trigger" type="button" :disabled="disabled" :aria-expanded="isOpen" aria-haspopup="listbox"
      @click="toggleDropdown">
      <span :class="{ placeholder: !model }">
        {{ model || placeholder }}
      </span>
      <span class="dropdown-arrow" :class="{ open: isOpen }">⌄</span>
    </button>

    <div v-else class="dropdown-trigger dropdown-trigger--searchable" :class="{ disabled }" @click="openSearchableDropdown">
      <input :value="searchText" class="dropdown-input" type="text" :placeholder="placeholder" :disabled="disabled"
        role="combobox" aria-autocomplete="list" aria-haspopup="listbox" :aria-expanded="isOpen"
        @focus="selectInputText" @input="handleSearchInput" />
      <span class="dropdown-arrow" :class="{ open: isOpen }">⌄</span>
    </div>

    <div v-if="isOpen" class="dropdown-menu" role="listbox">
      <button v-for="(option, index) in filteredOptions" :key="`${getOptionValue(option)}-${index}`" class="dropdown-option"
        :class="{ selected: isSelected(option) }" type="button" role="option" :aria-selected="isSelected(option)"
        @click="selectOption(option)">
        <span v-for="(value, fieldIndex) in getDisplayValues(option)" :key="fieldIndex" class="option-field">
          {{ value }}
        </span>
      </button>

      <p v-if="searchable && filteredOptions.length === 0" class="no-results">לא נמצאו תוצאות</p>
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

.dropdown-trigger--searchable {
  cursor: text;
}

.dropdown-trigger--searchable.disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.dropdown-trigger--searchable:focus-within {
  border-radius: 0.5rem;
  box-shadow: 0 0 0 1.5px rgba(173, 23, 70, 0.12);
}

.dropdown-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #111;
  font-family: inherit;
  font-size: inherit;
  text-align: right;
  direction: rtl;
}

.dropdown-input::placeholder {
  color: #1111119c;
}

.option-field + .option-field::before {
  content: ' | ';
  color: #9a8f93;
}

.no-results {
  margin: 0;
  padding: 0.75rem 1rem;
  color: #777;
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  text-align: right;
  direction: rtl;
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
