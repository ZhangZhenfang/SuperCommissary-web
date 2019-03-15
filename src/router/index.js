import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Upfile from '@/components/content/Upfile'
import Uptable from '@/components/content/Uptable'
import Notice from '@/components/content/Notice'
import Mytable from '@/components/content/Mytable'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'upfile',
          component: Upfile
        },
        {
          path: 'uptable',
          component: Uptable
        },
        {
          path: 'notice',
          component: Notice
        },
        {
          path: 'mytable',
          component: Mytable
        }
      ]
    }
  ]
})
