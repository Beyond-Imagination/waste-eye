import { Router } from 'express'
import { Trashes } from '../../db/'

const router = Router()

const limit:number = 5

router.get('/', async (req, res) => {
  let page:number = Number(req.query.page || 1)

  if (page <= 0) {
    page = 1
  }

  try {
    const result = await Trashes
      .find({}, null, {
        skip: (page - 1) * limit,
        limit
      })
      .sort({ createdAt: -1 })

    res.json({
      error: null,
      message: 'success',
      result
    })
  } catch (error) {
    res
      .status(400)
      .json({
        error,
        message: error.message,
        result: null
      })
  }
})

router.get('/size', async (_, res) => {
  try {
    const size = await Trashes.countDocuments()

    const pages = size / limit

    res.json({
      error: null,
      message: 'success',
      result: {
        size,
        limit,
        pages
      }
    })
  } catch (error) {
    res
      .status(400)
      .json({
        error,
        message: error.message,
        result: null
      })
  }
})

router.post('/', async (req, res) => {
  const { type, address, image } = req.body
  try {
    const doc = new Trashes({
      type,
      address,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    const result = await doc.save()
    res.json({
      error: null,
      message: 'success',
      result
    })
  } catch (error) {
    res
      .status(400)
      .json({
        error,
        message: error.message,
        result: null
      })
  }
})

export default {
  name: 'trashes',
  router
}
