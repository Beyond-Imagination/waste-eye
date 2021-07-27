import { Router } from 'express'

export declare namespace Server {
  interface IRoute {
    name: string,
    router: Router
  }
}

export declare namespace API {
  interface Trash {
    type: string
    address: string
    image: string
    createdAt: Date
    updatedAt: Date
  }
}
