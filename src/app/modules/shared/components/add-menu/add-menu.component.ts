import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { IonFab, NavController } from '@ionic/angular';
import { Observable, from, forkJoin, combineLatest, of } from 'rxjs';
import moment from 'moment';
import { DateHelperService } from '../../services/date-helper/date-helper.service';
import { TripLoggerService } from '../../../../core/services/trip-logger/trip-logger.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHelperService } from '../../services/geo-helper/geo-helper.service';
import { IRegistration } from '../../../registration/models/registration.model';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { LangKey } from '../../../../core/models/langKey';
import { RegistrationService } from '../../../registration/services/registration.service';
import { map, concatMap, tap, switchMap, combineAll } from 'rxjs/operators';
import { enterZone, setObservableTimeout } from '../../../../core/helpers/observable-helper';
import { LoggingService } from '../../services/logging/logging.service';

const DEBUG_TAG = 'AddMenuComponent';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuFab') menuFab: IonFab;

  drafts$: Observable<{ id: string, geoHazard: GeoHazard, date: string }[]>;
  geoHazardInfo$: Observable<{ geoHazards: GeoHazard[], showSpace: boolean, showTrip: boolean }>;
  tripStarted$: Observable<boolean>;
  showSpace$: Observable<boolean>;

  constructor(
    private registrationService: RegistrationService,
    private ngZone: NgZone,
    private navController: NavController,
    private dateHelperService: DateHelperService,
    private tripLoggerService: TripLoggerService,
    private userSettingService: UserSettingService,
    private geoHelperService: GeoHelperService,
    private loggingService: LoggingService
  ) { }

  ngOnInit() {
    this.geoHazardInfo$ = this.userSettingService.userSetting$
      .pipe(
        map((us) => ({
          geoHazards: us.currentGeoHazard,
          showSpace: us.language !== LangKey.nb && us.language !== LangKey.nn,
          showTrip: us.currentGeoHazard.indexOf(GeoHazard.Snow) >= 0,
        })),
        setObservableTimeout()
      );
    this.drafts$ = this.registrationService.drafts$.pipe(
      tap((drafts) => this.loggingService.debug('Drafts has changed to', DEBUG_TAG, drafts)),
      switchMap((drafts) => drafts.length > 0 ? combineLatest(drafts.map((draft) => this.convertDraftToDate(draft))) : of([])),
      tap((drafts) => this.loggingService.debug('Converted drafts has changed to', DEBUG_TAG, drafts)),
      setObservableTimeout());
    this.tripStarted$ = this.tripLoggerService.getLegacyTripAsObservable().pipe(map((val) => !!val), enterZone(this.ngZone));
  }

  private convertDraftToDate(draft: IRegistration): Observable<{ id: string, geoHazard: GeoHazard, date: string }> {
    return from(this.getDate(draft.changed)).pipe(map((date) => ({ id: draft.id, geoHazard: draft.geoHazard, date })));
  }

  ngOnDestroy(): void {
  }

  getName(geoHazard: GeoHazard) {
    return this.geoHelperService.getTranslationKey(geoHazard);
  }

  getDate(timestamp: number) {
    return this.dateHelperService.formatDate(moment.unix(timestamp));
  }

  closeAndNavigate(url: string) {
    setTimeout(() => {
      if (this.menuFab) {
        this.menuFab.close();
      }
    }, 0);
    this.navController.navigateForward(url);
  }

  createRegistration(geoHazard: GeoHazard) {
    this.closeAndNavigate(`registration/new/${geoHazard}`);
  }

  editRegistration(id: string) {
    this.closeAndNavigate(`registration/edit/${id}`);
  }

  closeMenu() {
    this.menuFab.close();
  }

  startOrStopTrip(tripStarted: boolean) {
    return tripStarted ? this.tripLoggerService.stopLegacyTrip() : this.closeAndNavigate('legacy-trip');
  }
}
