import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Show from '@/components/Show'
import Test from '@/components/Test'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: 'Home'
      },
      component: Home
    },
    {
      path: '/Show/:key',
      name: 'Show',
      meta: {
        title: 'Show'
      },
      component: Show,
      props: true
    },
    {
      path: '/test',
      name: 'Test',
      meta: {
        title: 'Test'
      },
      component: Test
    },
    {
      path: '/',
      name: 'Index',
      redirect: { name: 'Home' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || '(No title)'
  document.title = `${title} - Quiz Cloud`
  next()
})

export default router
