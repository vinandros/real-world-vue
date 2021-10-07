<template>
  <div v-if="$store.state.event">
    <h1>{{ $store.state.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="$store.state.event"></router-view>
  </div>
</template>

<script>
export default {}
</script>
