import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Users from '@/components/Users'
import User from '@/components/User'
import UserProfile from '@/components/UserProfile'
import UserPosts from '@/components/UserPosts'
import Playground1 from '@/components/Playground1'
import Playground2 from '@/components/Playground2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/users',
    name: 'Users',
    component: Users
  }, {
    path: '/user/:id',
    name: 'User',
    component: User,
    children: [
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts
      }
    ]
  }, {
    path: '/playground1',
    name: 'Playground1',
    component: Playground1
  }, {
    path: '/playground2',
    name: 'Playground2',
    component: Playground2
  }]
})
