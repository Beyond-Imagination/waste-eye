<template>
  <client-only>
    <naver-maps
      ref="map"
      :map-options="mapOptions"
      class="full-page"
    />
  </client-only>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted
} from '@nuxtjs/composition-api'

function getGeolocation (): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
}

export default defineComponent({
  name: 'Index',
  layout: 'map',
  setup () {
    const map = ref()
    const mapOptions = ref({
      lat: 37,
      lng: 127,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: { position: 'TOP_LEFT' }
    })

    const setCenter = (lat, lng) => map.value.setCenter(new naver.maps.LatLng(lat, lng))

    onMounted(async () => {
      const geo = await getGeolocation()
      mapOptions.value.lng = geo.coords.longitude
      mapOptions.value.lat = geo.coords.latitude

      setCenter(geo.coords.latitude, geo.coords.longitude)
    })

    return {
      map,
      mapOptions
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
