<template>
  <v-container class="fill-height" fluid>
    <splitpanes class="default-theme">
      <pane>left</pane>
      <pane>
        <splitpanes horizontal>
          <pane>top</pane>
          <pane>main</pane>
          <pane>bottom</pane>
        </splitpanes>
      </pane>
      <pane>right</pane>
    </splitpanes>
  </v-container>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

defineProps({

})

</script>

<style>
.splitpanes__pane {
  box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
  justify-content: center;
  align-items: center;
  display: flex;
}

// GENERAL STYLES.
html, body, #app {height: 100%;margin: 0;}
body {
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.8);
  font-size: 5em;
}

// documentation link.
p {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #666;
  z-index: 10;
  font-size: 12px;

  a {color: inherit;}
}

</style>
