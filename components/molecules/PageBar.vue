<template>
  <v-toolbar
    flat
    class="d-flex justify-center"
  >
    <v-btn-toggle
      v-model="selected"
      class="rounded-lg"
    >
      <v-btn
        outlined
        color="primary"
        to="grid"
        value="/grid"
      >
        Grid
      </v-btn>
      <v-btn
        outlined
        color="primary"
        to="list"
        value="/list"
      >
        List
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script>
import { defineComponent, ref, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PageBar',
  setup () {
    const route = useRoute()
    const selected = ref(route.value.path.toLowerCase())

    return {
      selected
    }
  }
})
</script>

<style scoped>

</style>
