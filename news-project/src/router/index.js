import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import business from '../components/business.vue'
import entertainment from '../components/entertainment.vue'
import general from '../components/general.vue'
import health from '../components/health.vue'
import science from '../components/science.vue'
import sports from '../components/sports.vue'
import technology from '../components/technology.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/business',
      name: 'business',
      component: business
    },
    ,
    {
      path: '/general',
      name: 'general',
      component: general
    },
    ,
    {
      path: '/health',
      name: 'health',
      component: health
    },
    ,
    {
      path: '/science',
      name: 'science',
      component: science
    },
    ,
    {
      path: '/sports',
      name: 'sports',
      component: sports
    },
    ,
    {
      path: '/technology',
      name: 'technology',
      component: technology
    },
    {
      path: '/entertainment',
      name: 'entertainment',
      component: entertainment
    },
    
  ]
})

export default router
