<template>
  <!--    Floating Viewer-->
  <div
    style="
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 10px;
      width: 100%;
    "
  >
    <v-switch
      class="switch_btn"
      style="color: white"
      v-model="alwaysOnTop"
      color="white"
      base-color="grey"
      @change="alwaysOnTopClick"
    >
      <template #label> Always On Top </template>
    </v-switch>
    <img class="img_btn" src="@/assets/icon/close.svg" @click="close" />
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';

let alwaysOnTop = ref(false);
const close = () => {
  window.electronAPI.send('closeFloatingViewer', true);
};

// watchEffect(() => {
//   window.electronAPI.send('toggleAlwaysOnTop', alwaysOnTop.value);
// });

const alwaysOnTopClick = () => {
  window.electronAPI.send('toggleAlwaysOnTop', alwaysOnTop.value);
};

onMounted(async () => {
  const isActive = await app.invoke('alwaysOnTop');
  alwaysOnTop.value = isActive;
});
</script>

<style scoped>
.draggable {
  -webkit-app-region: drag;
}

.img_btn,
.switch_btn {
  -webkit-app-region: no-drag;
}

.img_btn {
  cursor: pointer;
}
</style>
