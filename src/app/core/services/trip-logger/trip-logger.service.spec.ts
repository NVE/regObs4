import { HttpErrorResponse } from '@angular/common/http';
import { isTripFromToday, isTripNotFoundError } from './trip-logger.service';
import { LegacyTrip } from './legacy-trip.model';
import moment from 'moment';

describe('isTripFromToday', () => {
  it('Should return true if trip is from today', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: moment().unix(),
      request: {},
    };

    const result = isTripFromToday(trip);

    expect(result).toBeTrue();
  });

  it('Should return false if trip is from yesterday', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: moment().subtract(1, 'day').unix(),
      request: {},
    };

    const result = isTripFromToday(trip);
    expect(result).toBeFalse();
  });

  it('Should return false if timestamp is zero', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: 0,
      request: {},
    };

    const result = isTripFromToday(trip);
    expect(result).toBeFalse();
  });

  it('Should return false if timestamp is null', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: null,
      request: {},
    };

    const result = isTripFromToday(trip);
    expect(result).toBeFalse();
  });

  it('Should return false if trip is null', () => {
    const result = isTripFromToday(null);
    expect(result).toBeFalse();
  });

  it('Should return false if trip is undefined', () => {
    const result = isTripFromToday(undefined);
    expect(result).toBeFalse();
  });
});

describe('isTripNotFoundError', () => {
  it('should return true for HttpErrorResponse objects with trip error', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: ['Trip not found for deviceId 1cdb2dd1-5b35-4dc3-be74-045fb9202307'],
      },
    };

    // Tried to replicate an error object equal to what the api returns when
    // a trip is already stopped
    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeTrue();
  });

  it('should be case insensitive', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: ['trip not found for deviceId 1cdb2dd1-5b35-4dc3-be74-045fb9202307'],
      },
    };

    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeTrue();
  });

  it('should handle trip error message null', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: [null],
      },
    };

    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeFalse();
  });

  it('should handle trip error message numbers', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: [1234],
      },
    };

    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeFalse();
  });

  it('should return false if not error', () => {
    expect(isTripNotFoundError(undefined)).toBeFalse();
    expect(isTripNotFoundError(null)).toBeFalse();
    expect(isTripNotFoundError(12345)).toBeFalse();
    expect(isTripNotFoundError('Hello')).toBeFalse();
    expect(isTripNotFoundError({ foo: 'bar' })).toBeFalse();
  });

  it('should return false if not HttpErrorResponse', () => {
    expect(isTripNotFoundError(new Error('Some other error'))).toBeFalse();
  });
});
