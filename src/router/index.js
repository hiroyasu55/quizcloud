import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'
import QuizView from '@/components/QuizView'
import MasterRootView from '@/components/master/RootView'
import MasterListView from '@/components/master/ListView'
import MasterQuizView from '@/components/master/QuizView'
import TestView from '@/components/TestView'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/master',
      component: MasterRootView,
      children: [
        {
          path: 'list',
          name: 'master.list',
          meta: {
            title: '[Master]List'
          },
          component: MasterListView
        },
        {
          path: 'quiz/:id',
          name: 'master.quiz.detail',
          meta: {
            title: '[Master]Quiz'
          },
          component: MasterQuizView
        },
        {
          path: 'new',
          name: 'master.quiz.new',
          meta: {
            title: '[Master]New Quiz'
          },
          component: MasterQuizView
        },
        {
          path: '',
          redirect: { name: 'master.list' }
        }
      ]
    },
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
