import { Injectable, OnDestroy } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CallbackID, ClearWatchOptions, Geolocation, Position, WatchPositionCallback } from '@capacitor/geolocation';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  BehaviorSubject,
  catchError,
  defer,
  firstValueFrom,
  from,
  merge,
  Observable,
  of,
  share,
  switchMap,
  tap,
} from 'rxjs';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'GeoPositionNativeService';

const POSITION_OPTIONS_DEFAULT: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 20 * 1000, // 20 sec
  maximumAge: Infinity, // Start with latest cached value
};

const POSITION_OPTIONS_ANDROID: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 20 * 1000, // 20 sec
  maximumAge: 0, //we do not accept cached positions, ask for GPS position immediately
};

const POSITION_OPTIONS_ANDROID_FIRST_REQUEST: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 1000, //to avoid a long delay on app startup
  maximumAge: 0, //we do not accept cached positions, ask for GPS position immediately
};

/**
 * Henter posisjon fra GPS og himmelretning fra kompasset på Android eller iOS.
 * TODO: Hvordan sikre at vi får med oss om brukeren skrur på "GPS" etter at appen startet?
 * TODO: Hvordan sikre oss at bruker skjønner at han må skru på "GPS" og tillate posisjonsdata uten å spørre hver gang vi prøver å hente posisjon?
 * TODO: Hvordan ønsker vi å gjøre det egentlig? Skiller pluginen mellom "Dette er tilgangen appen har..." og "Be om tilgang.." ? Svar: Ja
 * Jeg tenker at når appen starter så bør vi bare sjekke hvilken tilgang appen har.
 * Kun når man trykker på posisjonsikonet i kartet bør vi be om tilgang.
 * For det er kun da vi vet at brukeren aktivt vil at posisjonen skal vises / trackes i kartet, og da kan det være likt på app/web.
 * TODO: Hvordan skal klienten få beskjed om at den ikke får posisjonsdata som forventet?
 * TODO: Logge til gpsPositionLog
 *
 */
@Injectable({
  providedIn: 'root',
})
export class GeoPositionNativeService implements OnDestroy {
  /**
   * A stream of positions. If position data is not available an error will be thrown.
   */
  position$: Observable<Position>;

  private position: BehaviorSubject<Position> = new BehaviorSubject(null);
  private watchPositionCallbackId: CallbackID = null;
  private watchPositionRequestTime: number = null;
  private watchPositionFirstCallbackReceived = false;

  constructor(
    private deviceOrientation: DeviceOrientation,
    private loggingService: LoggingService,
    private alertController: AlertController,
    private toastController: ToastController,
    private translateService: TranslateService,
    private platform: Platform
  ) {
    this.position$ = defer(() => this.startWatchingPosition()).pipe(
      switchMap(() => this.position.asObservable()),
      // Etter at vi har en position kan vi bruke share for å dele posisjonen med alle som subscriber
      share({
        // I denne funksjonen som vi gir til share
        // kan vi sette opp teardown-logikk.
        // refCount har med antall subscribers å gjøre.
        resetOnRefCountZero: () => {
          this.stopWatchingPosition();
          return of(true); //TODO; Hva skal jeg returnere her?
        },
      })
    );

    this.platform.pause.subscribe(() => this.stopWatchingPosition());
    this.platform.resume.subscribe(() => this.startWatchingPosition()); //TODO: Check that current subscribers will get notified after resume
  }

  ngOnDestroy(): void {
    this.stopWatchingPosition();
  }

  private async startWatchingPosition(): Promise<void> {
    const permissionToGetPosition = await this.checkPermissionsAndAsk();
    if (permissionToGetPosition) {
      const watchPositionCallback: WatchPositionCallback = (position: Position, err: any) => {
        if (err) {
          this.loggingService.log('Error when watchPosition', err, LogLevel.Warning, DEBUG_TAG, err);
          // this.gpsPositionLog.next(this.createPositionError('Unknown error'));
        }
        if (position !== null) {
          if (!this.watchPositionFirstCallbackReceived) {
            this.watchPositionFirstCallbackReceived = true;
            const secondsSinceStartWatch = (Date.now() - this.watchPositionRequestTime) / 1000;
            this.loggingService.debug(
              'First callback received. ' +
                `Timestamp: ${new Date(position.timestamp).toLocaleTimeString()}, ` +
                `Delay since request: ${secondsSinceStartWatch}s`,
              DEBUG_TAG,
              { accuracy: position?.coords?.accuracy }
            );
          }
          // this.gpsPositionLog.next(this.createGpsPositionLogElement(position));
          if (this.isValidPosition(position)) {
            this.position.next(position);
          }
        }
      };
      // this.addStatusToGpsPositionLog('StartGpsTracking');
      this.watchPositionRequestTime = Date.now();
      this.watchPositionCallbackId = await Geolocation.watchPosition(this.getPositionOptions(), watchPositionCallback);
      this.loggingService.debug(
        `Start GPS position subscription with callback ID: ${this.watchPositionCallbackId}`,
        DEBUG_TAG,
        this.getPositionOptions()
      );
    } else {
      Promise.reject('Position data not available');
    }
  }

  private stopWatchingPosition() {
    if (this.watchPositionCallbackId !== null) {
      this.loggingService.debug(
        `Stop current GPS position watch subscription with callback ID: ${this.watchPositionCallbackId}`,
        DEBUG_TAG
      );
      // this.addStatusToGpsPositionLog('StopGpsTracking');
      const options: ClearWatchOptions = { id: this.watchPositionCallbackId };
      Geolocation.clearWatch(options);
      this.watchPositionCallbackId = null;
      this.watchPositionRequestTime = null;
      this.watchPositionFirstCallbackReceived = false;
    }
  }

  private isValidPosition(pos: Position): boolean {
    return (
      pos !== undefined &&
      pos !== null &&
      pos.coords !== undefined &&
      pos.coords !== null &&
      pos.coords.latitude >= -90 &&
      pos.coords.latitude <= 90 &&
      pos.coords.longitude >= -180 &&
      pos.coords.longitude <= 180
    );
  }

  private getPositionOptions(): PositionOptions {
    if (Capacitor.getPlatform() === 'android') {
      if (this.watchPositionFirstCallbackReceived) {
        return POSITION_OPTIONS_ANDROID;
      } else {
        return POSITION_OPTIONS_ANDROID_FIRST_REQUEST;
      }
    }
    return POSITION_OPTIONS_DEFAULT;
  }

  private async checkPermissionsAndAsk(): Promise<boolean> {
    try {
      const currentPermissions = await Geolocation.checkPermissions();
      this.loggingService.debug('Geolocation permissions', DEBUG_TAG, currentPermissions);
      const authorized = currentPermissions.location === 'granted';
      if (!authorized) {
        if (Capacitor.getPlatform() === 'ios') {
          this.showPermissionDeniedToast();
          return false;
        }
        // location is not authorized, request new. This only works on Android
        const newPermissionsAfterRequest = await Geolocation.requestPermissions();
        this.loggingService.debug('Geolocation permissions after new request', DEBUG_TAG, newPermissionsAfterRequest);
        if (newPermissionsAfterRequest?.location === 'denied') {
          this.showPermissionDeniedToast();
          return false;
        }
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, 'Error asking for location permissions');
      this.showPermissionDeniedToast();
      return false;
    }
    return true;
  }

  private showPermissionDeniedToast() {
    const errorMessage = this.translateService.instant('GEOLOCATION.POSITION_ERROR.PermissionDenied');
    this.createToast(errorMessage);
  }

  private async createToast(message?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000,
    });
    await toast.present();
  }
}
