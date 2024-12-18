import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { constantRouters, dynamicRouters } from "@/config/router.config";

const router = createRouter({
  history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       name: 'layout',
//       component: () => import('@/layout/index.vue'),
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })
  routes: [...constantRouters, ...dynamicRouters]
})

export default router
