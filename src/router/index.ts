import { createRouter, createWebHistory } from 'vue-router'
import DashboardOrdersPageCreator from "../../src/templates/dashboard/orders/creators/DashboardOrdersPageCreator.vue";
import DashboardWrapper from '@/templates/dashboard/DashboardWrapper.vue';

const routes = [
  {
    path: '/',
    component: DashboardWrapper,
    children: [
      { path: '', component: DashboardOrdersPageCreator } // ✅ default child
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
