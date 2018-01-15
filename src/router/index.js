import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'
import QuizView from '@/components/QuizView'
import TestView from '@/components/TestView'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/list',
      name: 'List',
      meta: {
        title: 'List'
      },
      component: ListView
    },
    {
      path: '/quiz/:id?',
      name: 'Quiz',
      meta: {
        title: 'Quiz'
      },
      component: QuizView
    },
    {
      path: '/test/:value?',
      name: 'Test',
      meta: {
        title: 'Test'
      },
      component: TestView
    },
    {
      path: '/',
      name: 'index',
      redirect: { name: 'List' }
      // redirect: { name: 'Test', params: {value: 'index'} }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || '(No title)'
  document.title = `${title} - Quiz Cloud`
  next()
})

export default router
