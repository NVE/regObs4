import 'globalthis/auto';
if(typeof window === 'undefined') {
  var window = self;
}
if(typeof window.global === 'undefined') {
  (window as any).global = globalThis;
}