<template>
  <v-container class="fill-height ma-0 pa-0" fluid>
    <Splitpanes :push-other-panes="false" :dblClickSplitter="false">
      <pane min-size="20">
        <LeftPanel />
      </pane>
      <pane>
        <Splitpanes horizontal :dblClickSplitter="false">
          <pane>
            <TopPanel />
          </pane>
          <pane>main</pane>
          <pane min-size="1">
            <BottomPanel />
          </pane>
        </Splitpanes>
      </pane>
      <pane>
        <RightPanel />
      </pane>
    </Splitpanes>
  </v-container>
</template>

<script setup lang="ts">
import LeftPanel from '@/components/LeftPanel.vue';
import RightPanel from '@/components/RightPanel.vue';
import TopPanel from '@/components/TopPanel.vue';
import BottomPanel from '@/components/BottomPanel.vue';
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { onBeforeMount, onMounted } from 'vue';

onMounted(() => {});

onBeforeMount(() => {
  console.log('test');
});
</script>

<style>
.splitpanes {
  background-color: #f8f8f8;
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
  background-color: rgba(255, 0, 0, 0.3);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 3;
}
</style>
