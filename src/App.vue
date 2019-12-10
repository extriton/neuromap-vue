<template>
  <div id="app">
    <TheNavbar />
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
export default {
  components: {
    TheNavbar
  },
  beforeMount () {
    this.$store.commit('LOAD_USERS')
    this.$store.commit('LOAD_MEETINGS')
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
