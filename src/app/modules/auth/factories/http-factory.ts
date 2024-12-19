import { NgHttpService } from '../ng-http.service';

export const httpFactory = () => {
  // return platform.is('cordova') ? new CordovaRequestor() : new NgHttpService(httpClient);
  return new NgHttpService(); // NgHttpService works fine, no need to use advanced http
};
