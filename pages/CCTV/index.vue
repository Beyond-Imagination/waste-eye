<template>
  <v-row>
    <v-col cols="12">
      <v-card
        elevation="3"
        class="rounded-lg"
      >
        <v-card-title>
          CCTV 데이터 수집 현황
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row>
        <template
          v-for="(item, index) in cctvGroupList"
        >
          <v-col
            :key="index"
            cols="6"
            sm="3"
            md="2"
          >
            <v-card
              elevation="5"
              class="rounded-lg"
              @click="onClickItem(item)"
            >
              <v-card-title class="justify-center">
                {{ item.key }}
              </v-card-title>
              <v-card-text class="text-center">
                {{ item.size }} 건
              </v-card-text>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  useContext,
  useRouter,
  ref
} from '@nuxtjs/composition-api'
import { API } from '~/types'

export default defineComponent({
  name: 'CCTV',
  setup () {
    const context = useContext()
    const router = useRouter()
    const cctvGroupList = ref<API.CctvGroup[]>([])

    const fetchCctvGroupList = async () => {
      const { result } = await context.$axios.$get('/api/cctv')

      cctvGroupList.value = result
    }

    const { fetch } = useFetch(async () => {
      await fetchCctvGroupList()
    })

    const onClickItem = (item: API.CctvGroup) => {
      router.push(`/CCTV/${item.key}`)
    }

    fetch()

    return {
      cctvGroupList,
      onClickItem
    }
  }
})
</script>

<style scoped lang="scss">

</style>
