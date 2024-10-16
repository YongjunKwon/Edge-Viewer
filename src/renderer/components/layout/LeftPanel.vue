<template>
  Left Panel
  <div class="division-line"></div>
  <div class="d-flex justify-center">
    <v-switch
      class="v-input--reverse"
      v-model="edgeAppSwitch"
      color="green"
      base-color="grey"
    >
      <template #label> Edge App </template>
    </v-switch>
  </div>
  <div class="division-line"></div>
  <div class="d-flex justify-center">
    <v-switch
      class="v-input--reverse"
      v-model="floatingViewerSwitch"
      color="green"
      base-color="grey"
    >
      <template #label> Floating Viewer </template>
    </v-switch>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, watch } from 'vue';

let edgeAppSwitch = ref(false);
let floatingViewerSwitch = ref(false);

// watchEffect(() => {
//   if (floatingViewerSwitch.value) {
//     // console.log('FloatingViewerSwitch:', FloatingViewerSwitch.value);
//     window.electronAPI.send('toggleFloatingViewer', floatingViewerSwitch.value);
//   }
// });

watch(
  () => floatingViewerSwitch.value,
  (newVal, oldValue) => {
    console.log('watch newVal, oldValue:', newVal, oldValue);
    // if (newVal) {
    window.electronAPI.send('toggleFloatingViewer', newVal);
    // }
  },
);

onMounted(() => {
  window.electronAPI.receive('isFloatingViewerClosed', () => {
    floatingViewerSwitch.value = false;
  });
});
</script>

<style>
.v-selection-control {
  flex-direction: row-reverse !important;
  justify-content: flex-end !important;
}
.v-selection-control__wrapper {
  margin-right: 0;
  margin-left: 8px;
}

.division-line {
  border-top: 1px solid rgba(128, 125, 125, 0.4);
  margin: 4px;
}
.v-input__details {
  display: none !important;
}
</style>
