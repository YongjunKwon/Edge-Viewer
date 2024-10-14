<template>
  <v-container class="fill-height ma-0 pa-0" fluid>
    <Splitpanes
      :push-other-panes="false"
      :dblClickSplitter="false"
      ref="splitpane"
    >
      <pane size="20">
        <LeftPanel />
      </pane>
      <pane>
        <Splitpanes
          horizontal
          :push-other-panes="false"
          :dblClickSplitter="false"
        >
          <pane size="0">
            <TopPanel />
          </pane>
          <pane>main</pane>
          <pane size="20">
            <BottomPanel />
          </pane>
        </Splitpanes>
      </pane>
      <pane size="20">
        <RightPanel />
      </pane>
    </Splitpanes>
  </v-container>
</template>

<script setup lang="ts">
import LeftPanel from '@/components/layout/LeftPanel.vue';
import RightPanel from '@/components/layout/RightPanel.vue';
import TopPanel from '@/components/layout/TopPanel.vue';
import BottomPanel from '@/components/layout/BottomPanel.vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { onBeforeMount, onMounted, ref } from 'vue';

const splitpane = ref(null);
const leftPane = ref(null);
const rightPane = ref(null);
const topPane = ref(null);
const bottomPane = ref(null);

onBeforeMount(() => {});
</script>

<style>
.splitpanes {
  background-color: #f8f8f8;
  width: 100%;
}

.splitpanes__splitter {
  background-color: #ccc;
  position: relative;
}
.splitpanes__splitter:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  opacity: 0;
  z-index: 1;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -5px;
  right: -5px;
  height: 100%;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -5px;
  bottom: -5px;
  width: 100%;
}
</style>
