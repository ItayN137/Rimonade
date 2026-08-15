<script setup lang="ts">

import { ref } from 'vue'

import { useRouter } from 'vue-router'


import InputLine from '../generic/InputLine.vue'


import userIcon from '../../assets/user.svg'
import keyIcon from '../../assets/key.svg'
import { loginUser } from '@/auth/auth'


const props = defineProps<{
  validUsername: string
  validPassword: string
}>()


const router = useRouter()


const username = ref('')
const password = ref('')

const errorMessage = ref('')


function login() {

  const enteredUsername = username.value.trim()


  if (
    enteredUsername === props.validUsername &&
    password.value === props.validPassword
  ) {

    errorMessage.value = ''
    loginUser(enteredUsername)

    router.push('/home')

  }

  else {

    errorMessage.value =
      'שם משתמש או סיסמה שגויים'

  }

}

</script>


<template>

  <div class="login-page">


    <main class="login-main">


      <h1 class="login-title">
        התחברות
      </h1>


      <div class="login-card">


        <InputLine v-model="username" label="שם משתמש" :icon="userIcon" :icon-size="16" />


        <InputLine v-model="password" label="סיסמה" :icon="keyIcon" :icon-size="14" type="password" />


        <p v-if="errorMessage" class="error-message">

          {{ errorMessage }}

        </p>


        <button class="login-button" type="button" @click="login">

          התחבר

        </button>


      </div>


    </main>


  </div>

</template>


<style scoped>
.login-page {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom,
      #ffffff 8%,
      #fff6f6 45%,
      #ffd8d8 100%);
}


.login-main {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: clamp(6.5rem, 12vh, 8rem) clamp(1rem, 4vw, 2rem) clamp(2rem, 6vh, 3rem);
}


.login-title {
  margin: 0 0 clamp(0.75rem, 2vw, 1.125rem);

  direction: rtl;

  color: #111;

  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: bold;
}


.login-card {
  width: min(92%, 32.5rem);
  max-width: 100%;
  padding: clamp(1.25rem, 5vw, 2.625rem) clamp(1rem, 5vw, 2.375rem) clamp(1.5rem, 5vw, 2.5rem);
  border-radius: clamp(0.75rem, 2vw, 1.125rem);
  background: rgba(255, 255, 255, 0);
}


.error-message {
  direction: rtl;

  text-align: center;

  color: #ad1746;

  font-size: clamp(0.875rem, 2vw, 0.9375rem);
}


.login-button {
  display: block;
  width: 100%;
  min-width: min(12.5rem, 100%);
  min-height: clamp(3.25rem, 8vw, 4.25rem);
  margin: clamp(1.25rem, 4vw, 1.625rem) auto 0;
  border: none;
  border-radius: 10px;
  background: #ad1746;
  color: white;
  font-size: clamp(1.125rem, 3vw, 1.5625rem);
  cursor: pointer;
}


.login-button:hover {
  background: #94123b;
}
</style>
