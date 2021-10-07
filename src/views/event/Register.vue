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
      this.$store.commit(
        'SET_FLASH_MESSAGE',
        'You are successfully registered for ' + this.event.title + '.'
      )
      setTimeout(() => {
        this.$store.commit('SET_FLASH_MESSAGE', '')
      }, 3000)
    },
  },
}
</script>
