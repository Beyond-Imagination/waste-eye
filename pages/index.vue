<template>
  <v-row>
    <v-col>
      <v-card
        flat
        outlined
      >
        <v-card-title>
          Hello World!
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            elevation="0"
            color="primary"
            @click="onClickHello"
          >
            Hello World
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Index',
  setup () {
    const context = useContext()
    const onClickHello = async () => {
      const { result } = await context.$axios.$get('/api/trashes')
      console.log(result)
    }

    return {
      onClickHello
    }
  }
})

</script>
