import { Injectable, OnDestroy } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import {
  BehaviorSubject,
  defer,
  filter,
  firstValueFrom,
  Observable,
  of,
  ReplaySubject,
  share,
  switchMap,
  tap,
} from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { GeoPositionErrorCode } from './geo-position-error.enum';
import { GeoPositionLog, PositionError } from './geo-position-log.interface';

const DEBUG_TAG = 'GeoPositionService';

const POSITION_OPTIONS_DEFAULT: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 20 * 1000, // 20 sec
  maximumAge: Infinity, // Start with latest cached value
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
 * TODO: Skille ut kompasskode i egen service(r)
 *
 */
@Injectable({
  providedIn: 'root',
})
export abstract class GeoPositionService implements OnDestroy {
  protected currentPosition: BehaviorSubject<Position> = new BehaviorSubject(null);
  protected currentHeading: BehaviorSubject<number> = new BehaviorSubject(null);
  protected gpsPositionLog: ReplaySubject<GeoPositionLog> = new ReplaySubject(20);

  /**
   * A stream of position data.
   * On web, the observable will complete after the first position is returned, so you need to re-subscribe.
   * If position data is not available an error will be thrown.
   */
  readonly currentPosition$: Observable<Position>;

  get currentHeading$(): Observable<number> {
    return this.currentHeading.pipe(filter((cp) => cp !== null));
  }

  get log$(): Observable<GeoPositionLog> {
    return this.gpsPositionLog.asObservable();
  }

  constructor(
    private deviceOrientation: DeviceOrientation,
    private toastController: ToastController,
    protected translateService: TranslateService,
    protected platform: Platform,
    protected loggingService: LoggingService
  ) {
    this.currentPosition$ = defer(() => this.startWatchingPosition()).pipe(
      switchMap(() => this.currentPosition.asObservable()),
      // Etter at vi har en posisjon kan vi bruke share for å dele posisjonen med alle som subscriber
      tap((pos) =>
        this.loggingService.debug(
          `Dispatched position: ${pos?.coords?.latitude}, ${pos?.coords?.longitude}, timestamp: ${pos?.timestamp}`,
          DEBUG_TAG
        )
      ),
      filter((pos) => this.isValidPosition(pos)),
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
  }

  ngOnDestroy(): void {
    this.stopWatchingPosition();
  }

  /**
   * @returns last known position
   * @see https://github.com/ionic-team/capacitor/issues/1279
   */
  getSingleCurrentPosition(): Promise<Position> {
    // this.currentPosition always returns a value.
    return firstValueFrom<Position>(this.currentPosition);
  }

  protected abstract startWatchingPosition(): Promise<void>;

  protected stopWatchingPosition() {}

  protected isValidPosition(pos: Position): boolean {
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

  protected getPositionOptions(): PositionOptions {
    return POSITION_OPTIONS_DEFAULT;
  }

  protected showPermissionDeniedToast() {
    const errorMessage = this.translateService.instant('GEOLOCATION.POSITION_ERROR.PermissionDenied');
    this.createToast(errorMessage);
  }

  protected async createToast(message?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000,
    });
    await toast.present();
  }

  protected async geolocationError(error: PositionError) {
    let key: string;
    switch (error.code) {
      case GeoPositionErrorCode.PermissionDenied:
        key = 'PermissionDenied';
        break;
      case GeoPositionErrorCode.Timeout:
        key = 'Timeout';
        break;
      default:
        key = 'PositionUnavailable';
    }
    if (key) {
      const errorMessage: string = this.translateService.instant(`GEOLOCATION.POSITION_ERROR.${key}`);
      this.gpsPositionLog.next(this.createPositionError(errorMessage, error.code));
      this.createToast(errorMessage);
    }
  }

  protected createPositionError(
    message: string,
    code: GeoPositionErrorCode = GeoPositionErrorCode.Unknown,
    highAccuracyEnabled = true
  ): GeoPositionLog {
    return {
      timestamp: moment().unix(),
      status: 'PositionError',
      pos: undefined,
      highAccuracyEnabled,
      err: {
        code,
        message,
      },
    };
  }
}
