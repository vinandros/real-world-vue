import { createStore } from 'vuex'

export default createStore({
  state: {
    flashMessage: '',
    event: null,
    events: [],
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
  },
  actions: {
    setEvent({ commit, state }, payload) {
      console.log(payload.event)
      console.log(state)
      commit('SET_EVENT', payload.event)
    },
  },
  modules: {},
})
