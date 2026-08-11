<script setup lang="ts">

import { useRouter } from 'vue-router'

import homeIcon from '../../assets/home.svg'
import logoIcon from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'

import auth from '../../auth/auth'

const {
  currentUser,
  isLoggedIn,
  logoutUser
} = auth


const router = useRouter()


function goHome() {
  if (isLoggedIn.value) {
    router.push('/home')
  }
  else {
    router.push('/login')
  }

}



function logout() {

  logoutUser()

  router.push('/login')

}

</script>


<template>
  <nav class="navbar">
    <!-- LEFT SIDE -->
    <div class="brand">
      <img :src="logoIcon" alt="RimonAde" />
      <span>RimonAde</span>
    </div>

    <!-- RIGHT SIDE -->
    <div class="navbar-right">

      <button class="nav-button" @click="goHome">
        <img :src="homeIcon" alt="Home" />
      </button>

      <button class="nav-button" @click="logout">
        <img :src="logoutIcon" alt="Logout" />
      </button>

      <span class="hello-user">
        שלום, {{ currentUser || 'אנא התחבר למערכת' }}
      </span>
    </div>

  </nav>

</template>


<style scoped src="./navbar.css"></style>