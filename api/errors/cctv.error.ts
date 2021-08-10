import HttpError from '~/api/errors/http.error'

export class WrongKeyError extends HttpError {
  constructor () {
    const message = '잘못된 키 입니다.'
    super(404, message)
  }
}
