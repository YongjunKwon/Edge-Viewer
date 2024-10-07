<script setup lang="ts">
import Main from './components/Main.vue'

window.electronAPI.sendMessage('Hello from App.vue!');
</script>

<template>
  <Main/>
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
/* Do not force capitalization of button text */
.v-btn {
  text-transform: unset !important;
}
</style>