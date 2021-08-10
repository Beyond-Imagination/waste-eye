import express, { Application } from 'express'
import morgan from 'morgan'

import './plugins/mongoose.plugin'

import routes from './routes/'
import { Server } from '~/types'
import { errorHandler } from '~/api/middlewares/error.middleware'

const app: Application = express()

//  Add Middlewares
app.use(express.json())
app.use(morgan('dev'))

//  Router
routes.forEach((route: Server.IRoute) => app.use(`/${route.name}`, route.router))

//  Error Handler
app.use(errorHandler)

export default app
