<template>
  <v-app>
    <app-bar />
    <Nuxt />
  </v-app>
</template>

<script>
import AppBar from '~/components/atoms/AppBar'

export default {
  name: 'FullScreen',
  components: {
    AppBar
  }
}
</script>

<style scoped>

</style>
