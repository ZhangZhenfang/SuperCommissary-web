import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Upfile from '@/components/content/Upfile'
import Uptable from '@/components/content/Uptable'
import Notice from '@/components/content/Notice'
import NewNotice from '@/components/content/NewNotice'
import Newtable from '@/components/content/Newtable'
import Mytable from '@/components/content/Mytable'
import Usercenter from '@/components/content/Usercenter'
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
      path: '/main',
      name: 'Main',
      component: Main,
      children: [// 子路由
        {
          path: 'usercenter',
          name: 'Usercenter',
          component: Usercenter
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
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
          path: '/main/notice/newnotice',
          component: NewNotice
        },
        {
          path: 'mytable',
          component: Mytable
        },
        {
          path: '/main/uptable/newtable',
          component: Newtable
        }
      ]
    }
  ]
})
