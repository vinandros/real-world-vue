import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})

export default {
  getEvents(per_page, page) {
    return apiClient.get(`/events?_limit=${per_page}&_page=${page}`)
  },
  getEvent(eventID) {
    return apiClient.get(`/events/${eventID}`)
  },
  postEvent(event) {
    return apiClient.post(`/events`, event)
  },
}
