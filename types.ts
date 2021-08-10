import { Router } from 'express'

export declare namespace Server {
  interface IRoute {
    name: string,
    router: Router
  }
}

export declare namespace API {
  export interface Response {
    message: string | null
    success: boolean
    status: number
    result: any
  }

  interface Result {
    error: string | null,
    message: string | null,
    result: any | null
  }

  interface ImageInfo {
    fileName: string
    type: string
  }

  interface LocationInfo {
    coordinates: {
      latitude: string
      longitude: string
    },
    address: string
    guName: string
  }

  interface Item extends ImageInfo, LocationInfo {
  }

  interface Trash extends ImageInfo {
    _id?: string
    image: string
    thumbnail: string
    lowImage: string
    coordinates: number[]
    address: string
    guName: string
    createdAt: Date
    updatedAt: Date
  }

  interface CctvGroup {
    key: string,
    size: number,
    items?: Trash[]
  }

  interface Size {
    size: number,
    pages: number,
    limit: number
  }
}
