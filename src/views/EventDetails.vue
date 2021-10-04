<template>
  <div>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '../services/eventService'
export default {
  data() {
    return {
      event: null,
      eventID: 123
    }
  },
  created() {
      
      EventService.getEvent(this.eventID).then((res) => {
          this.event = res.data
      }).catch((error) => {
          console.log(error)
      })
    // fetch event (by id) and set local event data
  }
}
</script>