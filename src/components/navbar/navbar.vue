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
    router.push('/')
  }

}



function logout() {

  logoutUser()

  router.push('/')

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

      <template v-if="isLoggedIn">
        <button class="nav-button" @click="goHome">
          <img :src="homeIcon" alt="Home" />
        </button>

        <button class="nav-button" @click="logout">
          <img :src="logoutIcon" alt="Logout" />
        </button>
      </template>

      <span class="hello-user">
        שלום, {{ currentUser || 'אנא התחבר למערכת' }}
      </span>
    </div>

  </nav>

</template>


<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  min-height: clamp(4.5rem, 9vw, 5.625rem);

  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 1rem);
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 3vw, 1.25rem);

  background: linear-gradient(to left, #ffd0d0, #ff999f);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);

  z-index: 1000;
}


/* LEFT SIDE */

.brand {
  display: flex;
  align-items: center;
  gap: clamp(0.375rem, 1.5vw, 0.625rem);
}

.brand img {
  width: clamp(3.5rem, 6vw, 3rem);
  height: clamp(3.5rem, 6vw, 3rem);
  object-fit: contain;
}

.brand span {
  font-size: clamp(1rem, 2.5vw, 1.375rem);
  font-weight: bold;
  color: #a91d48;
}


/* RIGHT SIDE */

.navbar-right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: clamp(0.375rem, 1.5vw, 0.875rem);

  direction: rtl;
}

.hello-user {
  font-size: clamp(0.75rem, 2vw, 1.0625rem);
  font-family: 'Arial', sans-serif;
  color: #222;
}


/* BUTTONS */

.nav-button {
  width: clamp(2rem, 5vw, 2.5rem);
  height: clamp(2rem, 5vw, 2.5rem);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  background: transparent;

  cursor: pointer;
}

.nav-button img {
  width: clamp(1.25rem, 3vw, 1.625rem);
  height: clamp(1.25rem, 3vw, 1.625rem);

  object-fit: contain;
}

.nav-button:hover {
  opacity: 0.65;
}
</style>
