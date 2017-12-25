import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import QuizView from '@/components/QuizView'
import Test from '@/components/Test'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: 'Home'
      },
      component: Home
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
      redirect: { name: 'Test', params: { value: 'XXX' } }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(`[router]beforeEach to=${to.name}`)
  const title = to.meta.title || '(No title)'
  document.title = `${title} - Quiz Cloud`
  next()
})
router.afterEach((to, from) => {
  console.log(`[router]afterEach to=${to.name}`)
})

export default router
