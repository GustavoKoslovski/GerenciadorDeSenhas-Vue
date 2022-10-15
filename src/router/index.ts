import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
 
  {
    path: '/',
    name: 'password-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/password/password-list.vue')
  },
  {
    path: '/password/formulario',
    name: 'password-cadastrar',
    component: () => import(/* webpackChunkName: "form" */ '../views/password/password-form.vue')
  },
  {
    path: '/password/formulario/:model/:id',
    name: 'password-detalhar',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import(/* webpackChunkName: "form" */ '../views/password/password-form.vue')
  },
  {
    path: '/password-formulario/:model/:id',
    name: 'password-editar',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import('../views/password/password-form.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
