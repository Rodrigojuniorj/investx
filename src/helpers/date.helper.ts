import * as moment from 'moment-timezone'

export class DateHelper {
  static dateISO() {
    return moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss') + 'z'
  }

  static dateISOExpired(minute = 5) {
    return (
      moment
        .tz('America/Sao_Paulo')
        .add(minute, 'minutes')
        .format('YYYY-MM-DDTHH:mm:ss') + 'z'
    )
  }

  static dateISORemove() {
    return (
      moment
        .tz('America/Sao_Paulo')
        .subtract(200, 'minutes')
        .format('YYYY-MM-DDTHH:mm:ss') + 'z'
    )
  }

  static compareDate(data: Date) {
    const momentData =
      moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss') + 'z'
    return new Date(momentData) < data
  }
}
