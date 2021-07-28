<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import AppBar from '~/components/atoms/AppBar'
export default defineComponent({
  components: {
    AppBar
  }
})
</script>
