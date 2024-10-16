<script setup>
import Main from './components/Main.vue';
</script>

<template>
  <!--  <Main />-->
  <router-view />
</template>

<style>
html {
  overflow-y: auto !important;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: transparent !important;
}
html,
body {
  width: 100%;
  height: 100%;

  background-color: transparent !important;
  -webkit-app-region: drag;
  overflow: hidden;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  border-radius: 20px;
  background-color: darkslategrey;
}

/* Do not force capitalization of button text */
.v-btn {
  text-transform: unset !important;
}
</style>
