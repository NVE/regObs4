import { HttpClient } from '@angular/common/http';
import { NgHttpService } from '../ng-http.service';
import { inject } from '@angular/core';

export const httpFactory = () => {
  const httpClient = inject(HttpClient);
  // return platform.is('cordova') ? new CordovaRequestor() : new NgHttpService(httpClient);
  return new NgHttpService(httpClient); // NgHttpService works fine, no need to use advanced http
};
