import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Header from "../views/Header.vue";
import Todo from "../views/Todo.vue";
import Footer from "../views/Footer.vue"; 
import Todo_Show from "../views/Todo_Show.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path : '/header',
    name : 'header',
    component : Header
  },{
    path : '/todo',
    name : 'todo',
    component : Todo
  },{
    path : '/footer', 
    name : 'footer' , 
    component : Footer 
  },{
    path: '/todoshow',
    name : 'todoshow',
    component : Todo_Show
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
