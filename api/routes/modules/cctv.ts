import { Router } from 'express'
import { param, validationResult } from 'express-validator'
import { Trashes } from '../../db/'
import { API } from '~/types'
import wrapAsync from '~/api/middlewares/async.middleware'
import { success } from '~/api/helper/response'
import { ParamsError } from '~/api/errors/params.error'
import { WrongKeyError } from '~/api/errors/cctv.error'

const router = Router()

interface ItemMap {
  [key: string]: API.Trash[]
}

let cached: ItemMap = {}

async function fetchCache () {
  console.log('fetching cache.')

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

router.get('/', wrapAsync(
  async (_req, res) => {
    if (Object.keys(cached).length === 0) {
      await fetchCache()
    }

    success(res, Object
      .keys(cached)
      .map(key => ({
        key,
        size: cached[key].length
      }))
    )
  }
))

router.get('/:key',
  param('key').exists(),
  wrapAsync(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ParamsError(errors)
    }

    const { key } = req.params

    if (Object.keys(cached).length === 0) {
      await fetchCache()
    }

    if (!cached[key]) {
      throw new WrongKeyError()
    }

    success(res, cached[key])
  })
)

export default {
  name: 'cctv',
  router
}
