<script setup lang="ts">
import TextButton from './TextButton.vue'

withDefaults(
  defineProps<{
    title: string
    message: string
    icon?: string
    confirmText?: string
    cancelText?: string
  }>(),
  {
    icon: '✚',
    confirmText: 'אישור',
    cancelText: 'ביטול'
  }
)

const model = defineModel<boolean>()
const emit = defineEmits<{ confirm: [] }>()

function cancel(): void {
  model.value = false
}
</script>

<template>
  <div v-if="model" class="modal-backdrop" role="presentation" @click.self="model = false">
    <section class="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
      <span v-if="icon" class="modal-icon">{{ icon }}</span>
      <h2 id="confirmation-title">{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="modal-actions">
        <TextButton class="modal-button cancel-button" :text="cancelText" @click="cancel" />
        <TextButton class="modal-button approve-button" :text="confirmText" @click="emit('confirm')" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(38, 24, 29, 0.55);
}

.confirmation-modal {
  width: min(100%, 32rem);
  padding: clamp(1.4rem, 4vw, 2rem);
  border-radius: 16px;
  background: white;
  box-shadow: 0 24px 70px rgba(34, 15, 21, 0.3);
  text-align: center;
}

.modal-icon {
  width: 2.7rem;
  height: 2.7rem;
  display: grid;
  place-items: center;
  margin: 0 auto 0.8rem;
  border-radius: 10px;
  background: #bd4167;
  color: white;
  font-size: 1.45rem;
  font-weight: 800;
}

.confirmation-modal h2 {
  margin: 0;
}

.confirmation-modal p {
  margin: 0.8rem 0 1.4rem;
  line-height: 1.65;
}

.modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.modal-actions :deep(.modal-button) {
  min-height: 3.4rem;
  padding: 2px 6px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  box-shadow: none;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.modal-actions :deep(.modal-button span) {
  color: inherit;
  font: inherit;
  font-weight: 700;
  text-align: center;
}

.modal-actions :deep(.cancel-button),
.modal-actions :deep(.cancel-button:hover:not(:disabled)) {
  background: #f3e7eb;
  color: #6e3044;
  transform: none;
}

.modal-actions :deep(.approve-button) {
  background: #ad1746;
  color: white;
}

.modal-actions :deep(.approve-button:hover:not(:disabled)) {
  background: #92123b;
  transform: none;
}

.modal-actions :deep(.modal-button:active) {
  transform: none;
}
</style>
