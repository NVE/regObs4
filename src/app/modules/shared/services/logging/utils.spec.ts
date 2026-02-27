import { HttpErrorResponse } from '@angular/common/http';
import { toSafeString } from './utils';

describe('toSafeString', () => {
  it('should return string values unchanged', () => {
    const result = toSafeString('hello world');
    expect(result).toBe('hello world');
  });

  it('should serialize plain objects as JSON', () => {
    const value = { foo: 'bar', num: 42 };

    const result = toSafeString(value);
    const parsed = JSON.parse(result);

    expect(result).toBe(JSON.stringify(value, null, 2));
    expect(parsed).toEqual(value);
  });

  it('should serialize Error instances with details and custom properties', () => {
    const error: any = new Error('Something went wrong');
    error.code = 'E_CUSTOM';

    const result = toSafeString(error);
    const parsed = JSON.parse(result);

    expect(result).toContain(`"name": "${error.name}"`);
    expect(result).toContain('"message": "Something went wrong"');
    expect(result).toContain('"code": "E_CUSTOM"');
    expect(parsed.name).toBe(error.name);
    expect(parsed.message).toBe('Something went wrong');
    expect(typeof parsed.stack === 'string' || parsed.stack === undefined).toBe(true);
    expect(parsed.code).toBe('E_CUSTOM');
  });

  it('should keep the stack string from Error objects', () => {
    const error = new Error('With custom stack');
    error.stack = 'CustomStackLine1\nCustomStackLine2';

    const result = toSafeString(error);
    const parsed = JSON.parse(result);

    expect(result).toContain('CustomStackLine1');
    expect(typeof parsed.stack).toBe('string');
    expect(parsed.stack).toContain('CustomStackLine1');
  });

  it('should serialize Angular HttpErrorResponse with useful details', () => {
    const httpError = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: '/api/test',
      error: { message: 'Missing' },
    });

    const result = toSafeString(httpError);
    const parsed = JSON.parse(result);

    expect(result).toContain('"status": 404');
    expect(result).toContain('"statusText": "Not Found"');
    expect(result).toContain('"url": "/api/test"');
    expect(parsed.status).toBe(404);
    expect(parsed.statusText).toBe('Not Found');
    expect(parsed.url).toBe('/api/test');
    expect(parsed.error).toEqual({ message: 'Missing' });
  });

  it('should mark circular references as [Circular] instead of throwing', () => {
    const value: any = { foo: 'bar' };
    value.self = value;

    const result = toSafeString(value);

    expect(result).toContain('[Circular]');
  });

  it('should serialize BigInt values safely', () => {
    const rootResult = toSafeString(10n);
    expect(rootResult).toBe('"BigInt(10)"');

    const objectWithBigInt = { value: 10n } as any;
    const objectResult = toSafeString(objectWithBigInt);
    const parsed = JSON.parse(objectResult);

    expect(objectResult).toContain('"value": "BigInt(10)"');
    expect(parsed.value).toBe('BigInt(10)');
  });

  it('should fall back to String() when JSON.stringify throws', () => {
    const value: any = {};

    Object.defineProperty(value, 'toJSON', {
      value() {
        throw new Error('Fail in toJSON');
      },
    });

    const result = toSafeString(value);

    expect(result).toBe('[object Object]');
  });
});
