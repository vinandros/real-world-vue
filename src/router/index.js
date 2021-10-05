import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '../views/About.vue'
import EventDetails from '../views/event/Details.vue'
import EventEdit from '../views/event/Edit.vue'
import EventRegister from '../views/event/Register.vue'
import EventLayout from '../views/event/Layout.vue'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
