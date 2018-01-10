import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'
import QuizView from '@/components/QuizView'
import Test from '@/components/Test'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/list',
      name: 'list',
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
      /*
      beforeEnter: (to, from, next) => {
        console.log(`[router]beforeEnter to=${to.name}`)
        next()
      }
      */
    },
    {
      path: '/test/:value?',
      name: 'Test',
      meta: {
        title: 'Test'
      },
      component: Test
    },
    {
      path: '/',
      name: 'index',
      redirect: { name: 'Test', params: {value: 'index!'} }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || '(No title)'
  document.title = `${title} - Quiz Cloud`
  next()
})

export default router
