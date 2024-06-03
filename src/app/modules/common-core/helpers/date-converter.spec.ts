import { LoggingService } from '../../shared/services/logging/logging.service';
import { isoDateTimeToLocalDateTimeInIsoFormat } from './date-converters';

// tidssone-offset i timer, f.eks. '02' for norsk sommertid
const offsetHours = Math.abs(new Date().getTimezoneOffset() / 60)
  .toString()
  .padStart(2, '0');
console.log(`tidssone-offsett i timer er '${offsetHours}'`);

describe('date-converters', () => {
  if (offsetHours === '01') {
    it('burde kunne konvertere UTC til lokal tid i ISO-format', () => {
      const isoDateTimeWithOffset = '2021-09-01T04:00:00+00:00';
      const expected = `2021-09-01T05:00:00+01:00`;
      expect(isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset)).toEqual(expected);
    });
    it('burde kunne konvertere norsk vintertid til norsk vintertid i ISO-format', () => {
      const isoDateTimeWithOffset = '2021-09-01T04:00:00+01:00';
      const expected = `2021-09-01T04:00:00+01:00`;
      expect(isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset)).toEqual(expected);
    });
    it('burde kunne konvertere norsk sommertid til norsk vintertid i ISO-format', () => {
      const isoDateTimeWithOffset = '2021-09-01T04:00:00+02:00';
      const expected = `2021-09-01T03:00:00+01:00`;
      expect(isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset)).toEqual(expected);
    });
  } else if (offsetHours === '02') {
    it('burde kunne konvertere UTC til norsk sommertid i ISO-format', () => {
      const isoDateTimeWithOffset = '2021-09-01T04:00:00+00:00';
      const expected = `2021-09-01T06:00:00+02:00`;
      expect(isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset)).toEqual(expected);
    });
    it('burde kunne konvertere norsk vintertid til norsk sommertid ISO-format', () => {
      const isoDateTimeWithOffset = '2021-09-01T04:00:00+01:00';
      const expected = `2021-09-01T05:00:00+02:00`;
      expect(isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset)).toEqual(expected);
    });
    it('burde kunne konvertere norsk sommertid til norsk sommertid i ISO-format', () => {
      const isoDateTimeWithOffset = '2021-09-01T04:00:00+02:00';
      const expected = `2021-09-01T04:00:00+02:00`;
      expect(isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset)).toEqual(expected);
    });
    it('burde kunne konvertere norsk vintertid til norsk sommertid i ISO-format, test 2', () => {
      const isoDateTimeWithOffset = '2021-02-14T15:10:33+01:00';
      const expected = `2021-02-14T16:10:33+02:00`;
      expect(isoDateTimeToLocalDateTimeInIsoFormat(isoDateTimeWithOffset)).toEqual(expected);
    });
  } else {
    console.warn('Testene støtter ikke denne tidssonen, og vil derfor ikke kjøre.');
  }
});
