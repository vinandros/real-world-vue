<template>
  <div class="events">
    <h1>Events for Good</h1>
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
    <div class="pagination">
      <router-link
        id="page-prev"
        rel="prev"
        v-if="page != 1"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        >&#60; Previous</router-link
      >
      <router-link
        v-for="(page, index) in pages"
        :key="index + 1"
        :to="{ name: 'EventList', query: { page: index + 1 } }"
        class="pages-link"
        active-class="active-page"
        >{{ index + 1 }}</router-link
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
export default {
  name: 'Home',
  props: ['page'],
  components: {
    EventCard,
  },
  data() {
    return {
      totalEvents: 0,
      currentPage: 0,
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    next((com) => {
       const per_page = 2;
       const page = parseInt(routeTo.query.page) || 1;
       com.$store.dispatch('fetchEvents',{ per_page, page })
    })
  },
  async beforeRouteUpdate(routeTo) {
      const per_page = 2
      const page = parseInt(routeTo.query.page) || 1;
      return this.$store.dispatch('fetchEvents', { per_page, page })
  },
  computed: {
    hasNextPage() {
      return this.page < this.$store.state.totalPages
    },
    pages() {
      return [...Array(this.$store.state.totalPages).keys()]
    },
    active(index) {
      if (this.page === index) {
        return { textDecoration: 'underline' }
      }
      return ''
    },
    events(){
      return this.$store.state.events
    },
    totalPages(){
      return this.$store.state.totalpages
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

.active-page {
  text-decoration: underline;
}

.pages-link {
  color: #2c3e50;
  margin: 0 10px;
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
