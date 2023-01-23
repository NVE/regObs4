import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, filter, fromEvent, map, merge, Observable, share, Subscription, tap } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'HeadingService';

@Injectable({
  providedIn: 'root',
})
/**
 * Henter kompassretning fra dingsen. På web vil du ikke få kompassretning
 */
export class HeadingService {
  private headingSubscription: Subscription;
  private currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);
  private isWatching = false;

  constructor(
    private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private logger: LoggingService
  ) {
    this.platform.ready().then(() => {
      if (Capacitor.isNativePlatform()) {
        this.logger.debug('Platform ready and we are native, so start watching heading', DEBUG_TAG);
        this.startWatchingHeading();
      }
    });
    this.platform.pause.subscribe(() => {
      this.logger.debug('Pause, stop watching heading', DEBUG_TAG);
      this.stopWatchingHeading();
    });
    this.platform.resume.subscribe(() => {
      this.logger.debug('Resume, start watching heading', DEBUG_TAG);
      this.startWatchingHeading();
    });
  }

  /**
   * Gir deg kompassretningen dingsen peker mot
   */
  get currentHeading$(): Observable<number> {
    if (!this.isWatching) {
      this.logger.debug('Running startWatchingHeading', DEBUG_TAG);
      this.startWatchingHeading();
    }
    return this.currentHeading.pipe(
      filter((heading) => heading !== null),
      //TODO: Fjern logging før vi fullfører PR
      tap((heading) =>
        this.logger.debug(
          `Dispatched heading: ${heading}. Subscribers: ${this.currentHeading.observers?.length}`,
          DEBUG_TAG
        )
      ),
      share()
    );
  }

  private startWatchingHeading() {
    this.stopWatchingHeading();
    // NOTE! Because of issues with show heading with W3C Devece Orientation API in iOS 13, the depricated
    // plugin cordova-plugin-device-orientation is used instead on ios
    // https://github.com/apache/cordova-plugin-device-orientation/issues/52
    this.headingSubscription = (this.isIos() ? this.getHeadingNative() : this.getWebHeading$()).subscribe(
      (heading: number) => this.validateAndSetHeading(heading)
    );
    this.isWatching = true;
  }

  private isIos(): boolean {
    return Capacitor.getPlatform() === 'ios';
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
