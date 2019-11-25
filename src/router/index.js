import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Header from '../views/Header'
import Todo from '../views/Todo'
import Footer from '../views/Footer' 
import Todo_Show from '../views/Todo_Show'
import Imageupload from '../views/Imageupload'
import Board from "../views/Board"
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
  },{
    path : '/imageupload',
    name : 'imageupload',
    component : Imageupload
  },{
    path :'/board',
    name : 'board',
    component : Board
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
