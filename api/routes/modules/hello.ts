import { Router } from 'express'
import { Trashes } from '../../db/'

const router = Router()

router.get('/', async (_, res) => {
  const doc = new Trashes({
    type: 'hello world',
    address: 'hello world',
    image: 'hello world',
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const result = await doc.save()
  res.json({
    result
  })
})

export default {
  name: 'hello',
  router
}
