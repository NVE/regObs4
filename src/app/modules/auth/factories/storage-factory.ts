import { Platform } from '@ionic/angular';
// import { CordovaSecureStorage } from 'ionic-appauth/lib/cordova';
// import { CapacitorStorage } from 'ionic-appauth/lib/capacitor';
import { LocalStorageBackend } from '@openid/appauth';

export const storageFactory = (platform: Platform) => {
  return new LocalStorageBackend();
  // return platform.is('cordova') ? new CordovaSecureStorage() : new CapacitorStorage();
};
