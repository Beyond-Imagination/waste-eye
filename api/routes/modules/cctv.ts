import { Router } from 'express'
import { Trashes } from '../../db/'
import { API } from '~/types'

const router = Router()

interface ItemMap {
  [key: string]: API.Trash[]
}

let cached: API.CctvGroup[] = []

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

  cached = Object.keys(result).map(key => ({
    key,
    size: result[key].length,
    items: result[key]
  }))
}

router.get('/', async (_req, res) => {
  try {
    if (cached.length === 0) {
      await fetchCache()
    } else {
      console.log('cache hit!')
    }

    res.json({
      error: null,
      message: 'success',
      result: cached
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
  name: 'cctv',
  router
}
