/*
  Denne filen inneholder konfigurasjonen for Permissions-Policy headeren.
  Permissions-Policy brukes til å kontrollere hvilke funksjoner og API-er som er tilgjengelige for nettsiden.
  Hver nøkkel representerer en funksjon (f.eks. kamera, geolokasjon), og verdien angir hvem som har tilgang (f.eks. 'self' eller '()' for ingen tilgang).
*/

const permissionsPolicyConfig = {
  accelerometer: '()',
  autoplay: '()',
  bluetooth: '()',
  'browsing-topics': '()',
  camera: 'self',
  'display-capture': '()',
  fullscreen: 'self',
  geolocation: 'self',
  gyroscope: '()',
  magnetometer: '()',
  microphone: '()',
  midi: '()',
  usb: '()',
  'xr-spatial-tracking': '()',
};

export default permissionsPolicyConfig;
