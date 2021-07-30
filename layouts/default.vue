<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container
        class="mx-auto"
        style="max-width: 800px"
      >
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import AppBar from '~/components/atoms/AppBar'
import Footer from '~/components/atoms/Footer'

export default defineComponent({
  components: {
    AppBar,
    Footer
  }
})
</script>
