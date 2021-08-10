<template>
  <v-row>
    <v-col cols="12">
      <v-card
        elevation="3"
        class="rounded-lg"
      >
        <v-card-title>
          {{ key }}
        </v-card-title>
        <v-card-text>
          <p>
            발견된 폐기물 개수
          </p>
          <p>
            {{ itemList.length }} 개
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <related-item-card-list
        :items="itemList"
        :title="`${key}에서 발견된 있는 폐기물들`"
        @onClickItem="onClickItem"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent, ref,
  useContext, useFetch, useRouter
} from '@nuxtjs/composition-api'
import { API } from '~/types'
import RelatedItemCardList from '~/components/molecules/RelatedItemCardList.vue'

export default defineComponent({
  name: 'CctvKey',
  components: { RelatedItemCardList },
  setup () {
    const context = useContext()
    const router = useRouter()
    const itemList = ref<API.Trash[]>([])

    const { key } = context.params.value

    const { fetch } = useFetch(async () => {
      const { result } = await context.$axios.$get(encodeURI(`/api/cctv/${key}`))
      itemList.value = result
    })

    const onClickItem = (item: API.Trash) => {
      console.log(item)
      router.push(`/trash/${item._id}`)
    }

    fetch()

    return {
      key,
      itemList,
      onClickItem
    }
  }
})
</script>

<style scoped>

</style>
