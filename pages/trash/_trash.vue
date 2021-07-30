<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          Hello World
        </v-card-title>
        <v-card-text>
          {{ params }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: '_trash',
  setup () {
    const route = useRoute()
    const params = route.value.params
    return {
      params
    }
  },
  head: {
    title: 'Hello'
  }
})
</script>

<style scoped>

</style>
