<template>
  <client-only>
    <naver-maps
      ref="maps"
      :map-options="mapOptions"
      class="full-page"
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
  </client-only>
</template>

<script lang="ts">
import {
  ref,
  useContext,
  defineComponent
} from '@nuxtjs/composition-api'

import { API } from '~/types'

function getGeolocation (): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
}

export default defineComponent({
  name: 'Index',
  layout: 'FullScreen',
  setup () {
    const context = useContext()
    const maps = ref()
    const mapOptions = ref({
      lat: 37.564214,
      lng: 127.001699,
      zoom: 14,
      zoomControl: false,
      zoomControlOptions: { position: 'TOP_LEFT' }
    })
    const items = ref<API.Trash[]>([])

    // @ts-ignore
    const setCenter = (lat: number, lng: number) => maps.value.setCenter(new naver.maps.LatLng(lat, lng), true)
    const setZoomLevel = (level: number) => maps.value.setZoom(level, false)

    const updateItem = async (lat: number, lng: number) => {
      const { result } = await context.$axios.$get(`/api/trashes/${lat}/${lng}?radius=3000`)
      items.value = result
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
      setCenter(item.coordinates[1], item.coordinates[0])
      setZoomLevel(17)
    }

    const onClickMap = (item: any) => {
      const lat = item.coord.y
      const lng = item.coord.x
      updateCoordinate(lat, lng)
    }

    return {
      items,
      maps,
      mapOptions,
      onLoad,
      onClickMarker,
      onClickMap
    }
  }
})

</script>

<style lang="scss">
.full-page {
  width: 100%;
  height: 100%;
}
</style>
