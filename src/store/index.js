import { createStore } from 'vuex'
import EventService from '@/services/eventService'

export default createStore({
  state: {
    flashMessage: '',
    event: null,
    events: [],
    totalPages: null,
  },
  mutations: {
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_FLASH_MESSAGE(state, message) {
      state.flashMessage = message
    },
    ADD_NEW_EVENT(state, event) {
      state.events.push(event)
    },
    SET_TOTAL_PAGES(state, amount) {
      state.totalPages = amount
    },
  },
  actions: {
    fetchEvent({ commit }, id) {
      EventService.getEvent(id)
        .then((res) => {
          commit('SET_EVENT', res.data)
        })
        .catch((error) => {
          console.log(error)
          // if (error.response && error.response.status === 404) {
          //   return {
          //     name: '404Resource',
          //     params: { resource: 'event' },
          //   }
          // } else {
          //   return { name: 'NetworkError' }
          // }
        })
    },
    fetchEvents({ commit }, { per_page, page }) {
      return EventService.getEvents(per_page, page)
        .then((res) => {
          commit('SET_EVENTS', res.data)
          const totalEvents = res.headers['x-total-count']
          const totalPages = Math.ceil(totalEvents / 2)
          commit('SET_TOTAL_PAGES', totalPages)
        })
        .catch((error) => {
          console.log(error)
          //   if (error.response && error.response.status === 404) {
          //     next({
          //       name: '404Resource',
          //       params: { resource: 'event' },
          //     })
          //   } else {
          //     next({ name: 'NetworkError' })
          //   }
        })
    },
    postEvent({ commit, dispatch }, event) {
      EventService.postEvent(event)
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            commit('ADD_NEW_EVENT', event)
            dispatch('setFlashMessage', 'Event added successfully!')
            // setTimeout(() => {
            //   this.$store.commit('SET_FLASH_MESSAGE', '')
            //   this.$router.push({
            //     name: 'EventDetails',
            //     params: { id: event.id },
            //   })
            // }, 3000)
          } else {
            dispatch('SET_FLASH_MESSAGE', 'Something went wrong!')
            // setTimeout(() => {
            //   this.$store.commit('SET_FLASH_MESSAGE', '')
            //   this.$router.push({
            //     name: 'EventDetails',
            //     params: { id: event.id },
            //   })
            // }, 3000)
          }
        })
        .catch((error) => {
          console.log(error)
          // if (error.response && error.response.status === 404) {
          //   this.$router.push({
          //     name: '404Resource',
          //     params: { resource: 'event' },
          //   })
          // } else {
          //   this.$router.push({ name: 'NetworkError' })
          // }
        })
    },
    setFlashMessage({ commit }, message) {
      commit('SET_FLASH_MESSAGE', message)
      setTimeout(() => {
        commit('SET_FLASH_MESSAGE', '')
      }, 3000)
    },
  },
  modules: {},
})
