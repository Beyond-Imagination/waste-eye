import trashes from './modules/trashes'
import cctv from './modules/cctv'

import { Server } from '~/types'

const routes: Server.IRoute[] = [
  trashes,
  cctv
]

export default routes
