import { Router } from 'express'

const router = Router()

router.get('/', (_, res) => {
  res.json({
    hello: 'world'
  })
})

export default {
  name: 'hello',
  router
}
