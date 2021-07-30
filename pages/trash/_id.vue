<template>
  <v-card
    v-if="!!trash"
    flat
  >
    <v-card-title class="justify-center justify-sm-start">
      <h3>{{ trash.type }}</h3>
    </v-card-title>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          max-width="500"
          :src="trash.image"
          :lazy-src="trash.thumbnail"
          class="elevation-3 rounded-lg"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <client-only>
          <naver-maps
            :map-options="mapOptions"
            :height="300"
            class="rounded-lg elevation-3 mx-auto"
          >
            <naver-marker
              :lng="mapOptions.lng"
              :lat="mapOptions.lat"
            />
          </naver-maps>
        </client-only>
      </v-col>
      <v-col>
        <v-card-text class="text-body-1 pa-4 mt-6 rounded-lg elevation-3">
          <p class="mb-0 heading font-weight-bold">
            발견장소
          </p>
          <p>
            {{ trash.address }}
          </p>
          <p class="mb-0 heading font-weight-bold">
            날짜
          </p>
          <p class="mb-0">
            {{ dateFormat(trash.createdAt) }}
          </p>
        </v-card-text>
      </v-col>
      <v-col cols="12">
        <related-item-card-list
          :items="nearByItems"
          title="주변에 있는 폐기물"
          @onClickItem="onClickItem"
        />
      </v-col>

      <v-col cols="12">
        <related-item-card-list
          :items="relatedItems"
          title="관련있는 폐기물"
          text-key="guName"
          @onClickItem="onClickItem"
        />
      </v-col>
      <v-col cols="12">
        <v-card class="rounded-lg">
          <v-card-actions class="pa-4">
            <v-btn
              x-large
              block
              to="/"
              color="primary"
            >
              홈화면으로 가기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {
  ref,
  useRoute,
  useRouter,
  useFetch,
  useContext,
  useMeta,
  defineComponent
} from '@nuxtjs/composition-api'
import useFormat from '~/compositions/useFormat'
import RelatedItemCardList from '~/components/molecules/RelatedItemCardList.vue'

import { API } from '~/types'

export default defineComponent({
  name: 'TrashId',
  components: {
    RelatedItemCardList
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const context = useContext()
    const { title } = useMeta()
    const { dateFormat } = useFormat()

    const trash = ref<API.Trash>()

    const nearByItems = ref<API.Trash[]>([])
    const relatedItems = ref<API.Trash[]>([])

    const { id } = route.value.params

    const mapOptions = ref({
      lat: 37.564214,
      lng: 127.001699,
      zoom: 16,
      zoomControl: false,
      zoomControlOptions: { position: 'TOP_LEFT' }
    })

    const updateItem = async () => {
      const { result } = await context.$axios.$get(`/api/trashes/${id}`)
      trash.value = result as API.Trash
      mapOptions.value.lat = trash.value?.coordinates[1]
      mapOptions.value.lng = trash.value?.coordinates[0]
      title.value = result.type
    }

    const updateNearbyItems = async () => {
      if (!trash.value) {
        return
      }

      const [lng, lat] = trash.value.coordinates
      const { result } = await context.$axios.$get(`/api/trashes/coordinates/${lat}/${lng}`)
      nearByItems.value = (result as API.Trash[]).filter(({ _id }) => _id !== trash.value?._id)
    }

    const updateRelatedItems = async () => {
      if (!trash.value) {
        return
      }

      const type = trash.value.type
      const limit = 8
      const { result } = await context.$axios.$get(`/api/trashes?type=${type}&limit=${limit}`)
      relatedItems.value = (result as API.Trash[]).filter(({ _id }) => _id !== trash.value?._id)
    }

    const { fetch } = useFetch(async () => {
      await updateItem()
      await updateNearbyItems()
      await updateRelatedItems()
    })

    const onClickItem = (item: API.Trash) => {
      router.push(`/trash/${item._id}`)
    }

    fetch()

    return {
      trash,
      nearByItems,
      relatedItems,
      mapOptions,
      dateFormat,
      onClickItem
    }
  },
  head: {
  }
})
</script>

<style scoped lang="scss">

</style>
