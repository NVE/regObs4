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
