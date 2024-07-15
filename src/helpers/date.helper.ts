import * as moment from 'moment-timezone';

export class DateHelper {
  static dateISO() {
    return moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss') + 'z';
  }

  static momentDate() {
    return moment.tz('America/Sao_Paulo');
  }

  static convertUTCBrazil(data: Date) {
    return moment(data).tz('America/Sao_Paulo');
  }

  static convertUTCBrazilAndFormat(data: Date) {
    return moment(data).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
  }

  static convetToDateBD(data: string): Date {
    const [day, month, yearAndHours] = data.split('/');
    const [year, hours] = yearAndHours.split(' ');

    return new Date(`${year}-${month}-${day} ${hours}`);
  }

  static dateISOExpired(minute = 5) {
    return (
      moment
        .tz('America/Sao_Paulo')
        .add(minute, 'minutes')
        .format('YYYY-MM-DDTHH:mm:ss') + 'z'
    );
  }

  static dateISORemove() {
    return (
      moment
        .tz('America/Sao_Paulo')
        .subtract(200, 'minutes')
        .format('YYYY-MM-DDTHH:mm:ss') + 'z'
    );
  }

  static compareDate(data: Date) {
    const momentData =
      moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss') + 'z';
    return new Date(momentData) < data;
  }
}
