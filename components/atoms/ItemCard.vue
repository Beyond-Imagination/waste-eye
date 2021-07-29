<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        :elevation="hover ? 4: 0"
        dark
        outlined
        class="transition-ease-in-out"
        @click="onClickItem"
      >
        <v-img
          :src="item.image"
          class="bg-img"
        >
          <div class="description">
            <v-card-title>
              {{ item.address }}
            </v-card-title>
          </div>
        </v-img>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { API } from '~/types'
export default defineComponent({
  name: 'ItemCard',
  props: {
    item: {
      type: Object as PropType<API.Trash>,
      required: true
    }
  },
  setup (props, context) {
    const onClickItem = () => context.emit('click', props.item)

    return {
      onClickItem
    }
  }
})
</script>

<style scoped>

</style>
