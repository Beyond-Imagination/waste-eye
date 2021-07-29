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
      <v-dialog
        v-model="models.infoDialog"
        max-width="400"
      >
        <v-card
          v-if="selected !== null"
          class="rounded-lg"
        >
          <v-row no-gutters class="px-4 pt-4">
            <v-col
              cols="12"
            >
              <v-img
                :src="selected.image"
                :lazy-src="selected.thumbnail"
                max-width="400"
                width="100%"
                class="rounded-lg elevation-3 mx-auto"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-card-title class="justify-center">
                {{ selected.type }}
              </v-card-title>
              <v-card-subtitle class="text-center">
                <p class="mb-0">
                  발견일시 {{ formatDate(selected.createdAt) }}
                </p>
                <p class="mb-0">
                  {{ selected.address }}
                </p>
                <p class="mb-0">
                  {{ selected.guName }}
                </p>
              </v-card-subtitle>
            </v-col>
            <v-col cols="12">
              <v-btn
                text
                block
                @click="onClickOpenNaverMap"
              >
                네이버 지도에서 열기
              </v-btn>
            </v-col>
          </v-row>
          <v-card-actions class="pb-4">
            <v-btn
              block
              color="primary"
              @click="models.infoDialog = false"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        fab
        fixed
        top
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
  useContext,
  defineComponent,
  reactive
} from '@nuxtjs/composition-api'
import moment from 'moment'

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
      imageLoaded: true
    })

    // @ts-ignore
    const setCenter = (lat: number, lng: number) => maps.value.setCenter(new naver.maps.LatLng(lat, lng), true)
    // const setZoomLevel = (level: number) => maps.value.setZoom(level, false)

    const updateItem = async (lat: number, lng: number) => {
      const { result } = await context.$axios.$get(`/api/trashes/${lat}/${lng}?radius=3000`)
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

    const onClickOpenNaverMap = () => {
      const searchUrl = `https://map.naver.com/v5/search/${selected.value?.address}`
      window.open(searchUrl)
    }

    const onClickSearch = () => {

    }

    const formatDate = (date: Date) => moment(date).format('YYYY년 MM월 DD일')

    return {
      selected,
      items,
      maps,
      mapOptions,
      models,
      formatDate,
      onLoad,
      onClickMarker,
      onClickMap,
      onClickOpenNaverMap,
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
