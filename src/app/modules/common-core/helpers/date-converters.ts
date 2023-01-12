import moment from 'moment/moment';

export function isoDateTimeToLocalDate(isoDateTime: string): string {
  if (isoDateTime) {
    const offset = new Date().getTimezoneOffset();
    const localTime = new Date(Date.parse(isoDateTime) - offset * 60 * 1000);
    return localTime.toISOString().split('T')[0];
  }
  return null;
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
