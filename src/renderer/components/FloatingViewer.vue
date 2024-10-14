<template>Floating Viewer</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.electronAPI.receive('fromMain', (evt, payload) => {
    console.log('receive:', evt, payload);
  });
});
</script>
