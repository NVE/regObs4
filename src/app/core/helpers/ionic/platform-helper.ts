import { Platform } from '@ionic/angular';

export function isAndroidOrIos(platform: Platform): boolean {
  return (
    platform.is('cordova') && (platform.is('android') || platform.is('ios'))
  );
}
