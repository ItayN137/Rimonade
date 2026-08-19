<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    message: string
    type: 'success' | 'warning' | 'error' | 'info'
    duration?: number
  }>(),
  {
    duration: 100
  }
)

const emit = defineEmits<{ close: [] }>()
const visible = ref(true)

let displayTimer: ReturnType<typeof setTimeout> | undefined
let transitionTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  displayTimer = setTimeout(() => {
    visible.value = false
    transitionTimer = setTimeout(() => emit('close'), 50)
  }, props.duration)
})

onBeforeUnmount(() => {
  if (displayTimer) {
    clearTimeout(displayTimer)
  }

  if (transitionTimer) {
    clearTimeout(transitionTimer)
  }
})
</script>

<template>
  <Transition name="toast" appear>
    <div v-if="visible" class="toast" :class="`toast--${type}`" role="status" aria-live="polite">
      {{ message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: clamp(5.25rem, 10vw, 6.5rem);
  left: 50%;
  z-index: 3000;
  transform: translateX(-50%);
  width: min(calc(100% - 2rem), 28rem);
  padding: 0.85rem 1.15rem;
  border: 1px solid transparent;
  border-radius: 12px;
  box-shadow: 0 10px 28px rgba(40, 24, 30, 0.18);
  color: #252125;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  direction: rtl;
}

.toast--success {
  border-color: #91c99d;
  background: #e5f6e8;
  color: #27743a;
}

.toast--warning {
  border-color: #dfc45c;
  background: #fff4c7;
  color: #705a08;
}

.toast--error {
  border-color: #d98989;
  background: #fde5e5;
  color: #9f2828;
}

.toast--info {
  border-color: #bdb8ba;
  background: #efedee;
  color: #514c4e;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -0.75rem);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
