import {
  SetupContext,
  computed
} from '@nuxtjs/composition-api'

export default function <T> (context: SetupContext) {
  return computed({
    get () {
      return context.attrs.value as T
    },
    set (value: T) {
      context.emit('input', value)
    }
  })
}
