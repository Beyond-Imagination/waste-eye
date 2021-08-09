import { Router } from 'express'
import { Trashes } from '../../db/'
import { API } from '~/types'

const router = Router()

interface ItemMap {
  [key: string]: API.Item[]
}

router.get('/', async (_req, res) => {
  try {
    const query = Trashes.find().sort({ createdAt: -1 })
    const dataList = await query.find() as API.Item[]

    const result: ItemMap = {}

    for (const data of dataList) {
      if (!result[data.guName]) {
        result[data.guName] = []
      }
      result[data.guName].push(data)
    }

    res.json({
      error: null,
      message: 'success',
      result: Object.keys(result).map(key => ({
        key,
        size: result[key].length,
        items: result[key]
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

export default {
  name: 'cctv',
  router
}
