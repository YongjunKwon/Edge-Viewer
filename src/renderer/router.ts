import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'EdgeViewer',
    component: () => import('/components/Main.vue'),
  },
  {
    path: '/floatingViewer',
    name: 'floatingViewer',
    component: () => import('/components/FloatingViewer.vue'),
  },
];
export default createRouter({ history: createWebHashHistory(), routes });
