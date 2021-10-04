import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router',
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
}
