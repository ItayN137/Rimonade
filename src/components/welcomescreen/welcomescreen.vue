<script setup lang="ts">

import WelcomeButton
  from '../welcomebutton/welcomebutton.vue'


import registerIcon
  from '../../assets/register.svg'

import approveIcon
  from '../../assets/approve.svg'

import historyIcon
  from '../../assets/history.svg'


const username =
  sessionStorage.getItem('username') || 'User'


const actions = [

  {
    id: 'register',
    text: 'רישום פינוי',
    icon: registerIcon
  },

  {
    id: 'approve',
    text: 'אשר הגעת פינוי',
    icon: approveIcon
  },

  {
    id: 'history',
    text: 'ההיסטוריה שלי',
    icon: historyIcon
  }

]


function actionClicked(action: string) {

  console.log(
    'clicked:',
    action
  )

}

</script>


<template>

  <div class="welcome-page">





    <main class="welcome-main">


      <h1 class="welcome-title">

        בחר פעולה

      </h1>


      <div class="actions-container">


        <WelcomeButton v-for="action in actions" :key="action.id" :text="action.text" :icon="action.icon"
          :icon-size="40" @click="actionClicked(action.id)" />


      </div>


    </main>


  </div>

</template>


<style scoped src="./welcomescreen.css"></style>