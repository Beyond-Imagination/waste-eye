import express from 'express'
import routes from './routes/'
import { IRoute } from '~/api/types'

class Application {
  private readonly _app : express.Application;
  constructor () {
    this._app = express()
  }

  public init (): void {
    // add routes
    routes.forEach((route: IRoute) => this.app.use(`/${route.name}`, route.router))
  }

  public get app () {
    return this._app
  }
}

const application = new Application()
application.init()

export default application.app
