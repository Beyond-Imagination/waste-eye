import { Router } from 'express'
import { Trashes } from '../../db/'
import { API } from '~/types'

const router = Router()

interface ItemMap {
  [key: string]: API.Trash[]
}

let cached: ItemMap = {}

async function fetchCache () {
  const query = Trashes.find().sort({ createdAt: -1 })
  const dataList = await query.find() as API.Trash[]

  const result: ItemMap = {}

  for (const data of dataList) {
    if (!result[data.guName]) {
      result[data.guName] = []
    }
    result[data.guName].push(data)
  }

  cached = result
}

router.get('/', async (_req, res) => {
  try {
    if (Object.keys(cached).length === 0) {
      await fetchCache()
    } else {
      console.log('cache hit!')
    }

    res.json({
      error: null,
      message: 'success',
      result: Object.keys(cached).map(key => ({
        key,
        size: cached[key].length
      }))
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

router.get('/:key', async (req, res) => {
  const { key } = req.params
  if (!key) {
    return res.status(400).json({
      result: null,
      message: '파라미터 [key]는 반드시 필요합니다.',
      status: 400
    })
  } else {
    console.log('cache hit!')
  }

  if (Object.keys(cached).length === 0) {
    await fetchCache()
  }

  if (!cached[key]) {
    return res.status(400).json({
      result: null,
      message: '잘못된 key 입니다.',
      status: 400
    })
  }

  res.status(200).json({
    result: cached[key],
    message: 'success',
    status: 200
  })
})

export default {
  name: 'cctv',
  router
}
