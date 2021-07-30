import { Router } from 'express'
import { Trashes } from '../../db/'

const router = Router()

const limit:number = 20

router.get('/:latitude/:longitude', async (req, res) => {
  const { latitude, longitude } = req.params
  const radius = req.query.radius || 500

  try {
    const result = await Trashes.find({
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radius
        }
      }
    })

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

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await Trashes.findByIdAndDelete(id)
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
