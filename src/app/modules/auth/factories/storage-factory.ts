import { LocalStorageBackend } from '@openid/appauth';

export const storageFactory = () => {
  return new LocalStorageBackend();
  // return platform.is('cordova') ? new CordovaSecureStorage() : new CapacitorStorage();
};
