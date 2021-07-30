import moment from 'moment'

export default function () {
  const dateFormat = (date: Date | string | moment.Moment, format: string = 'YYYY년 MM 월 DD일') => moment(date).format(format)

  return {
    dateFormat
  }
}
