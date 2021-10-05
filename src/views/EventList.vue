<template>
  <div class="events">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        rel="prev"
        v-if="page != 1"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        >&#60; Previous</router-link
      >
      <router-link 
        v-for="( page, index ) in pages"
        :key="index + 1 "
        :to="{ name: 'EventList', query: { page: index + 1 } }"
        class="pages-link"
        active-class="active-page"
        >{{index + 1}}</router-link
      >
      
      <router-link
        id="page-next"
        rel="next"
        v-if="hasNextPage"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '../services/eventService'
import { watchEffect } from 'vue'
export default {
  name: 'Home',
  props: ['page'],
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
      totalEvents: 0,
      totalPages: 0,
      currentPage: 0
    }
  },
  created() {
    watchEffect(() => {
      EventService.getEvents(2, this.page)
        .then((res) => {
          this.events = res.data
          this.totalEvents = res.headers['x-total-count']
          this.totalPages = Math.ceil(this.totalEvents / 2)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  computed: {
    hasNextPage() {
      return this.page < this.totalPages
    },
    pages(){
      return [...Array(this.totalPages).keys()]
    },
    active(index){
      if(this.page === index){
        return{ textDecoration: "underline"}
      }
      return ""
    }
    
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}

.active-page{
  text-decoration: underline;
}

.pages-link{
  color: #2c3e50;
  margin:0 10px;
  text-decoration: none;
}

#page-prev {
  text-align: left;
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
 
}

#page-next {
  text-align: right;
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
</style>
