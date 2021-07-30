<template>
  <v-dialog
    v-model="model"
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
          @click="model = false"
        >
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Data,
  defineComponent,
  PropType,
  SetupContext
} from '@nuxtjs/composition-api'
import moment from 'moment'
import { API } from '~/types'
import useModel from '~/compositions/useModel'

export default defineComponent({
  name: 'InfoDialog',
  props: {
    selected: {
      type: Object as PropType<API.Trash | null>,
      default: () => null
    }
  },
  setup (props: Data, context: SetupContext) {
    const formatDate = (date: Date) => moment(date).format('YYYY년 MM월 DD일')

    const onClickOpenNaverMap = () => {
      context.emit('onClickNaverMap', props.selected)
    }

    const model = useModel<boolean>(context)

    return {
      model,
      formatDate,
      onClickOpenNaverMap
    }
  }
})
</script>

<style scoped>

</style>
