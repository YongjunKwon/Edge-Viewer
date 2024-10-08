<script setup lang="ts">
import Main from './components/Main.vue';

window.electronAPI.sendMessage('Launch succeeded!');
</script>

<template>
  <Main />
</template>

<style>
html {
  overflow-y: auto !important;
  user-select: none;
}
html,
body {
  width: 100%;
  height: 100%;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}

/* Do not force capitalization of button text */
.v-btn {
  text-transform: unset !important;
}
</style>
