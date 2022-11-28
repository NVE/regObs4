import 'globalthis/auto';
if(typeof window === 'undefined') {
  // eslint-disable-next-line no-var
  var window = self;
}
if(typeof window.global === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).global = globalThis;
}