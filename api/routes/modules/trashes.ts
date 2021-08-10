import { Router } from 'express'
import { body, param, validationResult } from 'express-validator'
import { Trashes } from '../../db/'
import wrapAsync from '~/api/middlewares/async.middleware'
import { success } from '~/api/helper/response'
import { ParamsError } from '~/api/errors/params.error'

const router = Router()

const _limit:number = 20

router.get('/:id',
  param('id').exists(),
  wrapAsync(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ParamsError(errors)
    }

    const { id } = req.params
    const result = await Trashes.findById(id)
    success(res, result)
  })
)

router.get('/coordinates/:latitude/:longitude',
  param('latitude').exists().isNumeric(),
  param('longitude').exists().isNumeric(),
  wrapAsync(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ParamsError(errors)
    }

    const { latitude, longitude } = req.params
    const radius = req.query.radius || 500

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

    success(res, result)
  })
)

router.get('/', async (req, res) => {
  let page:number = Number(req.query.page || 1)
  const limit:number = Number(req.query.limit || _limit)
  const type = req.query.type || null
  const guName = req.query.guName || null

  if (page <= 0) {
    page = 1
  }

  let query = Trashes.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 })

  if (type) {
    query = query.where('type').equals(type)
  }

  if (guName) {
    query = query.where('guName').equals(guName)
  }

  const result = await query.find()

  success(res, result)
})

router.post('/',
  body('type').exists(),
  body('address').exists(),
  body('image').exists(),
  wrapAsync(async (req, res) => {
    const { type, address, image } = req.body

    const doc = new Trashes({
      type,
      address,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    const result = await doc.save()
    success(res, result)
  })
)

router.delete('/:id',
  param('id').exists(),
  wrapAsync(
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new ParamsError(errors)
      }

      const { id } = req.params
      const result = await Trashes.findByIdAndDelete(id)
      success(res, result)
    }
  )
)

export default {
  name: 'trashes',
  router
}
