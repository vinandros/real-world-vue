<template>
  <div class="events">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "../services/eventService"

export default {
  name: "Home",
  components: {
    EventCard,
  },
  data(){
    return {
      events:[],
    }
  },
  created(){
    EventService.getEvents().then(
      (res) => {
        this.events = res.data
      }
    ).catch((error) => {
      console.log(error)
    })
  }
};
</script>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
