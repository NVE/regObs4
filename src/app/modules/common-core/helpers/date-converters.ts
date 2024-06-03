import moment from 'moment/moment';

export function isoDateTimeToLocalDate(isoDateTime: string): string {
  if (!isoDateTime) return null;
  return moment(isoDateTime).local(true).format('YYYY-MM-DD');
}

/**
 * Converts a shorthand date string to an ISO-formatted date-time string.
 * @param {string} date - The shorthand date string to convert.
 * @param {'start'|'end'} [start='start'] - Indicates whether to return the start or end of the day.
 * @returns {string} The ISO-formatted date-time string.
 */
export function convertToIsoDateTime(date: string, start: 'start' | 'end' = 'start'): string {
  const momentIn = moment(date);
  const momentOut = momentIn[start + 'Of']('day');
  return momentOut.toISOString(true);
}

/**
 * Konverterer en ISO-tidsstreng med offset til lokal tid i ISO-format.
 * Eksempel: 2021-09-01T09:00:00+00:00 -> 2021-09-01T11:00:00+02:00
 */
export function isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset: string): string {
  // if (!isoDateTimeWithOffset) return null;
  // const utc = new Date(isoDateTimeWithOffset).UTCString();
  // return new Date(utc).toLocaleString();
  // const utc = moment(isoDateTimeWithOffset).utc();
  // return utc.local(false).format('YYYY-MM-DDTHH:mm:ssZ');

  const currentLocalTimeOffsetInMinutes = new Date().getTimezoneOffset();
  const isoDateTimeInMillis = new Date(isoDateTimeWithOffset).getTime();
  const isoDateTimeInMillisInLocalTimeZone = isoDateTimeInMillis + currentLocalTimeOffsetInMinutes * 60000;
  const isoDateTimeInLocalTimeZone = new Date(isoDateTimeInMillisInLocalTimeZone);

  const date = new Date(isoDateTimeInLocalTimeZone);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const timeZoneOffsetInMinutes = date.getTimezoneOffset();
  const timeZoneOffsetHours = Math.floor(timeZoneOffsetInMinutes / 60);
  const sign = timeZoneOffsetHours > 0 ? '-' : '+';
  const remainingMinutes = Math.abs(timeZoneOffsetInMinutes % 60);
  const offset = `${Math.abs(timeZoneOffsetHours).toString().padStart(2, '0')}:${remainingMinutes
    .toString()
    .padStart(2, '0')}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offset}`;
}
