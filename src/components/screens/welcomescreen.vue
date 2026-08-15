<script setup lang="ts">
import { useRouter } from 'vue-router'

import TextButton from '../generic/TextButton.vue'

import registerIcon from '../../assets/register.svg'
import approveIcon from '../../assets/approve.svg'
import historyIcon from '../../assets/history.svg'

const router = useRouter()

const actions = [
  {
    id: 'evacuation',
    text: 'הזמן פינוי',
    icon: registerIcon,
    path: '/evacuation'
  },
  {
    id: 'approve',
    text: 'אשר הגעת פינוי',
    icon: approveIcon,
    path: '/approve'
  },
  {
    id: 'history',
    text: 'ההיסטוריה שלי',
    icon: historyIcon,
    path: '/history'
  }
]

function actionClicked(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="welcome-page">
    <main class="welcome-main">
      <h1 class="welcome-title">
        בחר פעולה
      </h1>

      <div class="actions-container">
        <TextButton v-for="action in actions" :key="action.id" :text="action.text" :icon="action.icon" :icon-size="40"
          @click="actionClicked(action.path)" />
      </div>

    </main>
  </div>
</template>

<style>
.welcome-page {
  width: 100%;
  min-height: 100dvh;
  background: linear-gradient(to bottom,
      #fffafa 0%,
      #fff0f0 40%,
      #ffd6d6 100%);
}


.welcome-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: clamp(6.5rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem) clamp(2rem, 6vh, 3rem);
}


.welcome-title {
  margin: 0 0 clamp(0.75rem, 2vw, 1.125rem);

  direction: rtl;

  color: #111;

  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: bold;
}


.actions-container {
  width: min(92%, 32.5rem);
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.5625rem);
  padding: clamp(1rem, 3vw, 1.25rem) clamp(0.5rem, 2vw, 0.9375rem) clamp(1.5rem, 4vw, 2.1875rem);
  border-radius: clamp(0.75rem, 2vw, 1.125rem);
  background: rgba(255, 255, 255, 0);
}
</style>
