<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <v-card
        flat
        outlined
        elevation="0"
      >
        <v-card-title class="justify-center">
          데이터 초기화
        </v-card-title>
        <v-card-actions>
          <v-btn
            elevation="0"
            color="primary"
            block
            @click="onClickReset"
          >
            초기화
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Admin',
  setup () {
    const context = useContext()
    const onClickReset = async () => {
      const { result } = await context.$axios.$get('/api/trashes')
      await Promise.all(
        result.map(item => context.$axios.$delete(`/api/trashes/${item._id}`))
      )
    }

    return {
      onClickReset
    }
  }
})
</script>

<style scoped>

</style>
