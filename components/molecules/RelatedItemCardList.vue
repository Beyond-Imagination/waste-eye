<template>
  <v-card class="rounded-lg">
    <template v-if="loaded">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-actions class="px-4 pt-0">
        <div v-if="items.length > 0" class="scrollable">
          <template v-for="(item ,index) in items">
            <image-card
              :key="`${index}-image-card`"
              :item="item"
              :text-key="textKey"
              class="mb-2"
              @click="onClickItem(item)"
            />
          </template>
        </div>
        <no-item-card v-else />
      </v-card-actions>
    </template>
    <v-skeleton-loader
      v-else
      type="title, card"
      height="140"
    />
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  SetupContext
} from '@nuxtjs/composition-api'
import { API } from '~/types'
import NoItemCard from '~/components/atoms/NoItemCard.vue'
import ImageCard from '~/components/atoms/ImageCard.vue'

export default defineComponent({
  name: 'RelatedItemCardList',
  components: {
    NoItemCard,
    ImageCard
  },
  props: {
    items: {
      type: Array as PropType<API.Trash[]>,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    loaded: {
      type: Boolean,
      default: true
    },
    textKey: {
      type: String,
      default: 'type'
    }
  },
  setup (_, context: SetupContext) {
    const onClickItem = (item: API.Trash) => context.emit('onClickItem', item)

    return {
      onClickItem
    }
  }
})
</script>

<style scoped lang="scss">
.scrollable {
  white-space: nowrap;
  overflow-x: scroll;
  width: 100%;
}
</style>
