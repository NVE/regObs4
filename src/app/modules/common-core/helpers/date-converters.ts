import moment from 'moment/moment';

export function isoDateTimeToLocalDate(isoDateTime: string): string {
  if (isoDateTime) {
    const offset = new Date().getTimezoneOffset();
    const localTime = new Date(Date.parse(isoDateTime) - offset * 60 * 1000);
    return localTime.toISOString().split('T')[0];
  }
  return null;
}

export function shorthandDateToIsoDateTime(date: string, start: 'start' | 'end' = 'start'): string {
  return moment(date)[start ? 'startOf' : 'endOf']('day').toISOString(true);
}
