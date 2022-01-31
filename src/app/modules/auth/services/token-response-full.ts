import {
  nowInSeconds,
  TokenResponse,
  TokenResponseJson
} from '@openid/appauth';

export const AUTH_EXPIRY_BUFFER = 10 * 60 * -1; // 10 mins in seconds

export interface TokenResponseFullJson extends TokenResponseJson {
  refresh_token_expires_in: string;
}

export class TokenResponseFull extends TokenResponse {
  // eslint-disable-next-line max-len
  // id_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjQ5SVcxMGI3bjVSVTJsNFNqem9VblpvekdkYWpna3Z0QjgyQUswVHFHTU0ifQ.eyJleHAiOjE2MzIxOTM2ODksIm5iZiI6MTYzMjE1MDQ4OSwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9udmViMmMwMXRlc3QuYjJjbG9naW4uY29tLzQ3YjM5ZTRkLTA2MmYtNDhkZi05YTVhLWFiY2Y4OWQ4N2E0YS92Mi4wLyIsInN1YiI6IjcxOWFjYjVjLTI4MTAtNDA2NS1iNGIxLWU5YjY4ZDNmYTc3ZiIsImF1ZCI6IjEzMjcwODE1LTdkZWYtNDgwMC04ZmM5LTE3OGRkNTE3ZjU3NCIsImlhdCI6MTYzMjE1MDQ4OSwiYXV0aF90aW1lIjoxNjMyMTUwNDg2LCJ1aWQiOiI3MTlhY2I1Yy0yODEwLTQwNjUtYjRiMS1lOWI2OGQzZmE3N2YiLCJlbWFpbCI6Im9teUBudmUubm8iLCJuYW1lIjoiVW5rbm93biIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsImNvbnNlbnRfb3BlcmF0aW5nX2luZm8iOmZhbHNlLCJjb25zZW50X25ld3NsZXR0ZXIiOmZhbHNlLCJjb25zZW50X3VzZXJfc3VydmV5IjpmYWxzZSwicm9sZXMiOlsicmVnT2JzX2FkbWluIl0sInBpZCI6IkIyQ18xQV9zaWduX3VwX3NpZ25faW5fbnZlIn0.zgzFYDrhttICNlK7-ddn4RMqu-JnXTTniP-qsI1KR939geLvoj8hemvjc7Oi67VMPUOxVhD0hzaGZ0l22uvAFFVnUjAb3mAyvdCDnnb3JKuzBoc-sNzvsp4LH3Uavl-szD-aHvUJ5PM_MJmXPpERBloYf3HK57hSyCfmpl1wwkFuB6vElPudedBBwn8vri_v6mzbEFy2Xo9HXRsC0bLbdXxYA1BD70Rq_JK-6XgKj2jwXiPFB5Z6-gULb5oSt7izkPo-BnjDdSdR6dF2WQcFQ5N07h_lS9QmFrHRvU7ML7xc3Y6mBJ4syIGa5xWTOG3UdMWaF87TSc8G4TqZXbEkkA"
  // id_token_expires_in: 43200
  // not_before: 1632150489 //samme som issued_at
  // profile_info: "eyJ2ZXIiOiIxLjAiLCJ0aWQiOiI0N2IzOWU0ZC0wNjJmLTQ4ZGYtOWE1YS1hYmNmODlkODdhNGEiLCJzdWIiOm51bGwsIm5hbWUiOiJVbmtub3duIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJpZHAiOm51bGx9"
  // eslint-disable-next-line max-len
  // refresh_token: "eyJraWQiOiJlTzRSeHRyR1Q3cEhTX1lBMTFsQzZhaVpFS21oTlRfd3ppcU5KakFQaVZ3IiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.aCB-s3tzaJpKdi4Jle-it5amN5r7gQu_oQH-jQ30smduADaYCLeUKBJR8qdQLw-1JjOmyZ9akgf0r06Gi7HKDm1ekp_MQnetiB5IesHAVQv__18lcrojVQaEb5q_ifIjR8bngXMNJ8j7vM53yVHNVfIyBzVPniA8MkTFYByEtACFg-3HhGNt89rG4303fpbAc2gu-vP3YFYGCsmCoBzpIerRssuqS0jApMhJxBgSVbWpB4_k4rTmde7uQJ5i2ooO55-YJaD1ZcMcfA00wmd394PbGg7yxPIt8Ss2js6f30-wNOcENt0mV0mTlB_6LFgQ4XWiAXgZzxkGLBlCLHmOwA.eqkMEie0UXNorSYP.4vNmYAgRuUEWyKqQ0imSBsYhM6vB9DUcCST6_31TE_biQPNXD05fpa0XIckkFCDXoLkPW7B76qFrzCYkGgqp4y8TRNu7mtK-xtt9N-OSn_9MNnfen4pmOXSrzfV5R2tZyWB4zmoySHabPe44nliSimiewFh3nvYNBy-m9ayVbk90KOnjhvW6H-yPw3lzwCY1FnfhEIAfvWIcmZaujhMGdl0jYlsz0YbYm7ex_1hpkVs60U6wN-Qih5hRR3nCZblcmGOUa8rby0e2_PcAz_caXCj1hifQ5Id_TRjNPylroEwG1_6d5scYsPgTLPPkcOVXSTTmaYBQ_fYv8oQHCme3w3DxGsn5gSI66Rllm9WdeUQ5CSYpFZgaaUs7VqEdZglTnGKS8N8gcREtlHIdwnjwIkylpASAfdhvpMPCrmi3xzFZQbziyUjUHNADyFGl_b37JegP64KybuO9D4CDiGxKVaqi_bmdH9VmjiGuv9TXsE5ugFDGfxw1EZhvOrUuXqZO2OsTUcK_AIT_MsvJJ2b12bq25QtCU0fd1B9CyUe6E9qt4oYheI4dwpF04ADQBVCOzqCbEQEdMeN6LL9bmoR2xhy4is2q4kuBbbxDOU_Gp3H3UsEF5__YofTsJ9UlO758bEhqZTKHh-ya_4w3Dc3s513mPXMnuiaE-7sgIrjrjjENlIfVdAhittxh49EBmwqzU-AkM1q180Yax_WCX-c.uqm4ebK3LfQMSgCV3TcCgg"
  // refresh_token_expires_in: 86400
  // scope: "offline_access openid"
  // token_type: "Bearer"

  refreshTokenExpiresIn: number | undefined; /* lifetime in seconds. */

  constructor(response: TokenResponseFullJson) {
    super(response);
    if (response.refresh_token_expires_in) {
      this.refreshTokenExpiresIn = parseInt(
        response.refresh_token_expires_in,
        10
      );
    }
  }

  isRefreshTokenValid(buffer: number = AUTH_EXPIRY_BUFFER): boolean {
    if (this.expiresIn) {
      const now = nowInSeconds();
      return now < this.issuedAt + this.expiresIn + buffer;
    } else {
      return true;
    }
  }
}
