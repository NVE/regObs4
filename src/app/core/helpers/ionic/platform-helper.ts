import { Platform } from '@ionic/angular';

declare module '@ionic/angular/dist/providers/platform' {
    interface Platform {
        isAndroidOrIos(this: Platform): boolean;
    }
}

function isAndroidOrIos(this: Platform): boolean {
    return this.is('cordova') && (this.is('android') || this.is('ios'));
}

Platform.prototype.isAndroidOrIos = isAndroidOrIos;
