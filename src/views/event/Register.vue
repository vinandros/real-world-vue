<template>
  <p>Register for the event here!</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      this.$router.push({ name: 'EventDetails' })
      this.$store.dispatch('setFlashMessage', 'You are successfully registered for ' + this.event.title + '.')
    },
  },
}
</script>
