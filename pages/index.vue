<template>
  <client-only>
    <div class="full-page">
      <naver-maps
        ref="maps"
        class="full-page"
        :map-options="mapOptions"
        @load="onLoad"
        @click="onClickMap"
      >
        <template v-for="(item, index) in items">
          <naver-marker
            :key="`${index}-marker`"
            :lat="item.coordinates[1]"
            :lng="item.coordinates[0]"
            @click="onClickMarker(item)"
          />
        </template>
      </naver-maps>
      <info-dialog
        v-model="models.infoDialog"
        :selected="selected"
        @onClickNaverMap="onClickOpenNaverMap"
        @onClickDetail="onClickDetail"
      />
      <v-btn
        fab
        fixed
        bottom
        right
        color="secondary"
        @click="onClickSearch"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
    </div>
  </client-only>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  useContext,
  useRouter,
  defineComponent
} from '@nuxtjs/composition-api'
import InfoDialog from '~/components/molecules/Dialogs/InfoDialog.vue'

import { API } from '~/types'

function getGeolocation (): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
}

export default defineComponent({
  name: 'Index',
  components: {
    InfoDialog
  },
  layout: 'FullScreen',
  setup () {
    const context = useContext()
    const router = useRouter()

    const maps = ref()
    const selected = ref<API.Trash | null>(null)
    const mapOptions = ref({
      lat: 37.564214,
      lng: 127.001699,
      zoom: 14,
      zoomControl: false,
      zoomControlOptions: { position: 'TOP_LEFT' }
    })
    const items = ref<API.Trash[]>([])
    const models = reactive({
      infoDialog: false,
      fab: false
    })

    // @ts-ignore
    const setCenter = (lat: number, lng: number) => maps.value.setCenter(new naver.maps.LatLng(lat, lng), true)
    // const setZoomLevel = (level: number) => maps.value.setZoom(level, false)

    const updateItem = async (lat: number, lng: number) => {
      const { result } = await context.$axios.$get(`/api/trashes/coordinates/${lat}/${lng}?radius=3000`)
      items.value = result
      if (result.length === 0) {
        // @ts-ignore
        context.$dialog.notify.success('폐기물을 하나도 찾지 못했어요! 😅', { timeout: 2500 })
        return
      }
      // @ts-ignore
      context.$dialog.notify.info(`${result.length} 개의 폐기물을 찾았습니다 😎`, { timeout: 2500 })
    }

    const onLoad = async () => {
      const geo = await getGeolocation()
      const { latitude, longitude } = geo.coords
      await updateCoordinate(latitude, longitude)
    }

    const updateCoordinate = async (lat: number, lng: number) => {
      mapOptions.value.lat = lat
      mapOptions.value.lng = lng

      setCenter(lat, lng)
      await updateItem(lat, lng)
    }

    const onClickMarker = (item: API.Trash) => {
      selected.value = item
      setCenter(item.coordinates[1], item.coordinates[0])
      models.infoDialog = true
    }

    const onClickMap = (item: any) => {
      const lat = item.coord.y
      const lng = item.coord.x
      updateCoordinate(lat, lng)
    }

    const onClickOpenNaverMap = (item: API.Trash) => {
      const searchUrl = `https://map.naver.com/v5/search/${item.address}`
      window.open(searchUrl)
    }

    const onClickDetail = (item: API.Trash) => {
      router.push(`/trash/${item._id}`)
    }

    const onClickSearch = () => {
    }

    return {
      selected,
      items,
      maps,
      mapOptions,
      models,
      onLoad,
      onClickMarker,
      onClickMap,
      onClickOpenNaverMap,
      onClickDetail,
      onClickSearch
    }
  },
  head: {
    title: '홈'
  }
})

</script>

<style lang="scss">
.full-page {
  width: 100%;
  height: 100%;
}
</style>
