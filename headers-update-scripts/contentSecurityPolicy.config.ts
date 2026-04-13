/*
  Denne filen inneholder konfigurasjonen for Content-Security-Policy (CSP) headeren.
  CSP brukes til å kontrollere hvilke ressurser som kan lastes inn og kjøres på nettsiden.
  Hver nøkkel representerer en CSP-direktiv (f.eks. connect-src, script-src), og verdiene angir hvilke kilder som er tillatt.
*/

const cspConfig = {
  'connect-src': [
    "'self'",
    'https://plausible.io',
    'https://offlinemap.blob.core.windows.net',
    'https://nveb2c01prod.b2clogin.com',
    'https://nveb2c01test.b2clogin.com',
    'https://nveb2c01staging.b2clogin.com',
    'https://api.regobs.no',
    'https://test-api.regobs.no',
    'https://demo-api.regobs.no',
    'http://localhost:5130/',
    'http://localhost:40001/',
    'https://localhost:7182/',
    'https://api01.nve.no',
    'https://ws.geonorge.no/stedsnavn',
    'https://secure.geonames.org',
    'https://www.iskart.no',
    'https://sentry.io',
    'https://ws.geonorge.no',
    'https://www.yr.no',
    'data:',
  ],
  'frame-src': ['https://plot.regobs.no', 'https://test-plot.regobs.no', 'https://demo-plot.regobs.no'],
  'upgrade-insecure-requests': true,
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'object-src': ["'none'"],
  'font-src': ["'self'"],
  'style-src-elem': ["'self'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'script-src': ["'self'", "'unsafe-inline'", 'https://plausible.io'],
  'worker-src': ["'self'", 'blob:'],
  'default-src': ["'self'", 'data:', 'gap:', 'cdvfile:', 'blob:'],
  'img-src': ['*', 'filesystem:', 'app-file:', 'cdvfile:', 'data:', 'blob:'],
  'media-src': ['*', 'blob:'],
};

export default cspConfig;
