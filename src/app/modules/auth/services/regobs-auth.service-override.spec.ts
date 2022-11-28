import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Requestor, StorageBackend, TokenType } from '@openid/appauth';
import { Browser } from 'ionic-appauth';
import { RegobsAuthServiceOverride } from './regobs-auth-service-override';
import { TokenResponseFullJson } from './token-response-full';

describe('RegobsAuthServiceOverride', () => {
  let service: RegobsAuthServiceOverride;
  let storageBackend: jasmine.SpyObj<StorageBackend>;


  //contains valid tokens
  const validTokenResponse: TokenResponseFullJson = {
    access_token: undefined,
    // eslint-disable-next-line max-len
    id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjQ5SVcxMGI3bjVSVTJsNFNqem9VblpvekdkYWpna3Z0QjgyQUswVHFHTU0ifQ.eyJleHAiOjE2MzIxOTM2ODksIm5iZiI6MTYzMjE1MDQ4OSwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9udmViMmMwMXRlc3QuYjJjbG9naW4uY29tLzQ3YjM5ZTRkLTA2MmYtNDhkZi05YTVhLWFiY2Y4OWQ4N2E0YS92Mi4wLyIsInN1YiI6IjcxOWFjYjVjLTI4MTAtNDA2NS1iNGIxLWU5YjY4ZDNmYTc3ZiIsImF1ZCI6IjEzMjcwODE1LTdkZWYtNDgwMC04ZmM5LTE3OGRkNTE3ZjU3NCIsImlhdCI6MTYzMjE1MDQ4OSwiYXV0aF90aW1lIjoxNjMyMTUwNDg2LCJ1aWQiOiI3MTlhY2I1Yy0yODEwLTQwNjUtYjRiMS1lOWI2OGQzZmE3N2YiLCJlbWFpbCI6Im9teUBudmUubm8iLCJuYW1lIjoiVW5rbm93biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsImNvbnNlbnRfb3BlcmF0aW5nX2luZm8iOmZhbHNlLCJjb25zZW50X25ld3NsZXR0ZXIiOmZhbHNlLCJjb25zZW50X3VzZXJfc3VydmV5IjpmYWxzZSwicm9sZXMiOlsicmVnT2JzX2FkbWluIl0sInBpZCI6IkIyQ18xQV9zaWduX3VwX3NpZ25faW5fbnZlIn0.zgzFYDrhttICNlK7-ddn4RMqu-JnXTTniP-qsI1KR939geLvoj8hemvjc7Oi67VMPUOxVhD0hzaGZ0l22uvAFFVnUjAb3mAyvdCDnnb3JKuzBoc-sNzvsp4LH3Uavl-szD-aHvUJ5PM_MJmXPpERBloYf3HK57hSyCfmpl1wwkFuB6vElPudedBBwn8vri_v6mzbEFy2Xo9HXRsC0bLbdXxYA1BD70Rq_JK-6XgKj2jwXiPFB5Z6-gULb5oSt7izkPo-BnjDdSdR6dF2WQcFQ5N07h_lS9QmFrHRvU7ML7xc3Y6mBJ4syIGa5xWTOG3UdMWaF87TSc8G4TqZXbEkkA',
    token_type: 'Bearer' as TokenType,
    expires_in: '43200',
    // eslint-disable-next-line max-len
    refresh_token: 'eyJraWQiOiJlTzRSeHRyR1Q3cEhTX1lBMTFsQzZhaVpFS21oTlRfd3ppcU5KakFQaVZ3IiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9',
    scope: 'offline_access openid',
    issued_at: Date.now(),
    refresh_token_expires_in: '86400'
  };

  //this token was issued in 2020 and should be expired
  const expiredTokenResponse: TokenResponseFullJson = {
    ...validTokenResponse,
    issued_at: 1584779614
  };

  beforeEach(() => {
    storageBackend = jasmine.createSpyObj('StorageBackend', ['getItem']);

    service = new RegobsAuthServiceOverride(
      {} as Browser,
      storageBackend as StorageBackend,
      {} as Requestor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear token if we get HTTP 400 or 401 even if token is not expired', async () => {
    storageBackend.getItem.and.returnValue(Promise.resolve(JSON.stringify(validTokenResponse)));

    const badRequest = new HttpErrorResponse({ status: HttpStatusCode.BadRequest });
    expect(await service.shouldTokensBeCleared(badRequest)).toBeTrue();

    const unauthorized = new HttpErrorResponse({ status: HttpStatusCode.Unauthorized });
    expect(await service.shouldTokensBeCleared(unauthorized)).toBeTrue();
  });

  it('should clear token if we get any HTTP error if token is expired', async () => {
    storageBackend.getItem.and.returnValue(Promise.resolve(JSON.stringify(expiredTokenResponse)));

    const randomError = new HttpErrorResponse({ status: HttpStatusCode.ImATeapot });
    expect(await service.shouldTokensBeCleared(randomError)).toBeTrue();
  });

  it('should not clear token if we get HTTP error (except 400 and 401) if token is not expired', async () => {
    storageBackend.getItem.and.returnValue(Promise.resolve(JSON.stringify(validTokenResponse)));

    const randomError = new HttpErrorResponse({ status: HttpStatusCode.ImATeapot });
    expect(await service.shouldTokensBeCleared(randomError)).toBeFalse();
  });

  it('should not clear token if no network', async () => {
    storageBackend.getItem.and.returnValue(Promise.resolve(JSON.stringify(validTokenResponse)));

    const error: Error = {
      name: 'Error',
      message: 'Unable To Obtain Server Configuration'
    };
    expect(await service.shouldTokensBeCleared(error)).toBeFalse();
  });
});
