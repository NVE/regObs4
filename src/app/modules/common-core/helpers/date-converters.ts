import moment from 'moment/moment';

export function isoDateTimeToLocalDate(isoDateTime?: string): string | undefined {
  if (!isoDateTime) {
    return undefined;
  }
  return moment(isoDateTime).local(true).format('YYYY-MM-DD');
}

type StartOrEnd = 'start' | 'end';

/**
 * Converts a shorthand date string to an ISO-formatted date-time string.
 * @param {string} date - The shorthand date string to convert.
 * @param {'start'|'end'} [start='start'] - Indicates whether to return the start or end of the day.
 * @returns {string} The ISO-formatted date-time string.
 * @returns {undefined} If the provided date string is invalid
 */
export function convertToIsoDateTime(date: string | null, start: StartOrEnd = 'start'): string | undefined {
  const momentIn = moment(date);
  if (!momentIn.isValid()) {
    return;
  }
  const key: `${StartOrEnd}Of` = `${start}Of`;
  const momentOut = momentIn[key]('day');
  return momentOut.toISOString(true);
}
