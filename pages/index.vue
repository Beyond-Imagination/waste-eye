<template>
  <v-row class="mt-1">
    <template
      v-for="(item, index) in items"
    >
      <v-col
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="d-flex align-center justify-center"
      >
        <item-card
          :item="item"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  onMounted,
  computed
} from '@nuxtjs/composition-api'
import ItemCard from '~/components/atoms/ItemCard.vue'
import { API } from '~/types'

export default defineComponent({
  name: 'Index',
  components: {
    ItemCard
  },
  setup () {
    const store = useStore()

    onMounted(async () => {
      await Promise.all([
        store.dispatch('fetchSize'),
        store.dispatch('fetchItems')
      ])
    })

    const sizeInfo = computed<API.Size>(() => store.getters.sizeInfo)
    const items = computed<API.Trash[]>(() => store.getters.items)
    const ready = computed<boolean>(() => store.getters.ready)

    return {
      sizeInfo,
      items,
      ready
    }
  }
})

</script>

<style lang="scss">
.bg-img {
  position: relative;

  .description {
    position: absolute;
    background-color: rgba(16, 16, 16, 0.2);
    width: 100%;
    bottom: 0;
  }
}
</style>
