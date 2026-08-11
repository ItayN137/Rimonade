<script setup lang="ts">

import { ref } from 'vue'

import { useRouter } from 'vue-router'


import LoginLine from '../loginline/loginline.vue'


import userIcon from '../../assets/user.svg'
import keyIcon from '../../assets/key.svg'
import { isLoggedIn, loginUser } from '@/auth/auth.js'


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


        <LoginLine v-model="username" text="שם משתמש" :icon="userIcon" :icon-size="16" />


        <LoginLine v-model="password" text="סיסמה" :icon="keyIcon" :icon-size="14" type="password" />


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


<style scoped src="./loginscreen.css"></style>