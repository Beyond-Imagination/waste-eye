import { Router } from 'express'
import { Trashes } from '../../db/'
import dataJson from '../../../data.json'
import { API } from '~/types'

const router = Router()

const _limit:number = 20

function genImageUrl (fileName: string, folder: string, prefix: string = '') {
  const baseUrl = 'https://wasteye.s3.ap-northeast-2.amazonaws.com'
  return encodeURI(`${baseUrl}/${folder}/${prefix}${fileName}`)
}

router.get('/all', async (_req, res) => {
  const data = dataJson as API.Item[]

  let success = 0
  let failed = 0
  for await (const item of data) {
    try {
      const trash = new Trashes({
        fileName: item.fileName,
        type: item.type,
        coordinates: [item.coordinates.longitude, item.coordinates.latitude],
        address: item.address,
        guName: item.guName,
        image: genImageUrl(item.fileName, 'images'),
        lowImage: genImageUrl(item.fileName, 'low_images'),
        thumbnail: genImageUrl(item.fileName, 'thumbnails', 'thumbnail_'),
        createdAt: new Date(),
        updatedAt: new Date()
      })

      await trash.save()
      success += 1
      if (success % 10 === 0) {
        console.log(`${success} success!`)
      }
    } catch (e) {
      console.error(e)
      failed += 1
    }
  }

  res.status(200).json({
    error: null,
    message: 'success',
    result: {
      success,
      failed
    }
  })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const result = await Trashes.findById(id)

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

router.get('/coordinates/:latitude/:longitude', async (req, res) => {
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
  const limit:number = Number(req.query.limit || _limit)
  const type = req.query.type || null
  const guName = req.query.guName || null

  if (page <= 0) {
    page = 1
  }

  try {
    let query = Trashes.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 })

    if (type) {
      query = query.where('type').equals(type)
    }

    if (guName) {
      query = query.where('guName').equals(guName)
    }

    const result = await query.find()

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

router.get('/size', async (req, res) => {
  const limit:number = Number(req.query.limit || _limit)
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
