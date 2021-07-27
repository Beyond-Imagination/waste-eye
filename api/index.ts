import express, { Application } from 'express'
import mongoose from 'mongoose'

import routes from './routes/'
import { Server } from '~/types'

const URI = process.env.DB_URI || 'ERROR'

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app: Application = express()

//  Body Parser
app.use(express.json())

//  Router
routes.forEach((route: Server.IRoute) => app.use(`/${route.name}`, route.router))

export default app
