import moment from 'moment';

export function dateToBars(date: string) {
  return moment(date).format('YYYY/MM/DD');
}

export function dateToDayMonth(date: string) {
  return moment(date).format('DD MMM');
}

export function dateToISO8601(date: string | null): string {
  return moment(date).format('YYYY-MM-DD');
}

export function dateToTimeStamp(date: string) {
  return moment(date).format('DD MMM HH:mm');
}
