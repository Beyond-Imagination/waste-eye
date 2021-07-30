<template>
  <v-card
    class="d-inline-flex mr-2 rounded-lg"
    :max-width="$vuetify.breakpoint.name === 'xs' ? 100 : 120"
    :max-height="$vuetify.breakpoint.name === 'xs' ? 100 : 120"
    @click="onClick"
  >
    <v-img
      :src="item.thumbnail"
    >
      <div class="image-card-title">
        {{ item[textKey] }}
      </div>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from '@nuxtjs/composition-api'
import { API } from '~/types'

export default defineComponent({
  name: 'ImageCard',
  props: {
    item: {
      type: Object as PropType<API.Trash>,
      required: true
    },
    textKey: {
      type: String,
      default: 'type'
    }
  },
  setup (_, { emit }) {
    const onClick = () => emit('click')

    return {
      onClick
    }
  }
})
</script>

<style scoped lang="scss">
.image-card-title {
  background-color: rgba(25, 25, 25, 0.4);
  padding: 10px;
  color: white;
  font-weight: bolder;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
