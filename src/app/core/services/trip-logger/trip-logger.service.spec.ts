import { HttpErrorResponse } from '@angular/common/http';
import { isTripNotFoundError } from './trip-logger.service';

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
