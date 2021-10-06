import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')
import EventDetails from '../views/event/Details.vue'
import EventEdit from '../views/event/Edit.vue'
import EventRegister from '../views/event/Register.vue'
import EventLayout from '../views/event/Layout.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/eventService'
import GStore from '../store/index'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((res) => {
          GStore.event = res.data
        })
        .catch((error) => {
          console.log(error)
          if (error.response && error.response.status === 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' },
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
      // fetch event (by id) and set local event data
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      // path solution
      return {
        path: '/events/' + to.params.afterEvent,
      }
      // children solution
      // id can be pass without params, this is do it, auto
      // like it is doing into the children section for each nested route
      // return {
      //   name: 'EventDetails',
      //   params: { id: to.params.id },
      // }
    },
    // children solution
    // children: [
    //   {
    //     path: 'register',
    //     redirect: () => ({
    //       name: 'EventRegister',
    //     }),
    //   },
    //   {
    //     path: 'edit',
    //     redirect: () => ({
    //       name: 'EventEdit',
    //     }),
    //   },
    // ],
  },
  // Not fount page
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
      }
    }
  },
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
