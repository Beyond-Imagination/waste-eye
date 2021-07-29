<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container
        class="mx-auto"
        style="max-width: 1200px"
      >
        <page-bar />
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import AppBar from '~/components/atoms/AppBar'
import PageBar from '@/components/molecules/PageBar'

export default defineComponent({
  components: {
    AppBar,
    PageBar
  }
})
</script>
