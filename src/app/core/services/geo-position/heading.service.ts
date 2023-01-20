import { Injectable } from '@angular/core';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Platform } from '@ionic/angular';
import {
  BehaviorSubject,
  debounce,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  share,
  Subscription,
  tap,
  timer,
} from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'HeadingService';

@Injectable({
  providedIn: 'root',
})
/**
 * Henter kompassretning fra enheten
 */
export class HeadingService {
  private headingSubscription: Subscription;
  private currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);
  private isWatching = false;

  constructor(
    private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private logger: LoggingService
  ) {}

  get currentHeading$(): Observable<number> {
    if (!this.isWatching) {
      this.logger.debug('Running startWatchingHeading', DEBUG_TAG);
      this.startWatchingHeading();
    }
    return this.currentHeading.pipe(
      filter((heading) => heading !== null),
      debounce(() => timer(300)),
      //TODO: Fjern logging før vi fullfører PR
      tap((heading) =>
        this.logger.debug(
          `Dispatched heading: ${heading}. Subscribers: ${this.currentHeading.observers?.length}`,
          DEBUG_TAG
        )
      ),
      share({
        // I denne funksjonen som vi gir til share kan vi sette opp teardown-logikk.
        // refCount har med antall subscribers å gjøre.
        resetOnRefCountZero: () => {
          //TODO: Fjern logging før vi fullfører PR
          this.logger.debug('No more subscribers so stopWatchingHeading...', DEBUG_TAG);
          this.stopWatchingHeading();
          this.isWatching = false;
          return of(false);
        },
      })
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
function debouce(): import('rxjs').OperatorFunction<number, number> {
  throw new Error('Function not implemented.');
}
