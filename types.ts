import { Router } from 'express'

export declare namespace Server {
  interface IRoute {
    name: string,
    router: Router
  }
}

export declare namespace API {
  interface Result {
    error: string | null,
    message: string | null,
    result: any | null
  }

  interface Trash {
    _id?: string
    type: string
    address: string
    image: string
    createdAt: Date
    updatedAt: Date
  }

  interface Size {
    size: number,
    pages: number,
    limit: number
  }
}
