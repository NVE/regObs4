import { Injectable } from '@angular/core';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, fromEvent, map, merge, Observable, Subscription } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Henter kompassretning fra enheten
 */
export class HeadingService {
  private headingSubscription: Subscription;
  private currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);

  get currentHeading$(): Observable<number> {
    return this.currentHeading.pipe(filter((cp) => cp !== null));
  }

  constructor(
    private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private loggingService: LoggingService,
    private alertController: AlertController,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {}

  private startWatchingHeading() {
    if (this.headingSubscription && !this.headingSubscription.closed) {
      this.headingSubscription.unsubscribe();
    }
    // NOTE! Because of issues with show heading with W3C Devece Orientation API in iOS 13, the depricated
    // plugin cordova-plugin-device-orientation is used instead on ios
    // https://github.com/apache/cordova-plugin-device-orientation/issues/52
    this.headingSubscription = (this.isIos() ? this.getHeadingNative() : this.getWebHeading$()).subscribe(
      (heading: number) => this.validateAndSetHeading(heading)
    );
  }

  private isIos(): boolean {
    return this.platform.is('hybrid') && this.platform.is('ios');
  }

  private getHeadingNative() {
    return this.deviceOrientation
      .watchHeading({ filter: 1 }) //get notified only if heading changes > 1 degree
      .pipe(map((val) => val?.magneticHeading));
  }

  private getWebHeading$(): Observable<number> {
    return merge(fromEvent(<any>window, 'deviceorientationabsolute'), fromEvent(<any>window, 'deviceorientation')).pipe(
      map((event: DeviceOrientationEvent) => {
        const appleHeading = (<any>event).webkitCompassHeading;
        const heading: number = appleHeading || this.getAbsoluteHeading(event);
        return heading;
      })
    );
  }

  private getAbsoluteHeading(event: DeviceOrientationEvent) {
    return event.alpha !== undefined && event.absolute ? 360 - event.alpha : undefined;
  }

  private validateAndSetHeading(heading: number) {
    if (this.isValidHeading(heading)) {
      this.currentHeading.next(heading);
    }
  }

  private isValidHeading(heading: number) {
    return heading >= 0 && heading <= 360;
  }

  private stopWatchingHeading() {
    if (this.headingSubscription && !this.headingSubscription.closed) {
      this.headingSubscription.unsubscribe();
    }
  }
}
