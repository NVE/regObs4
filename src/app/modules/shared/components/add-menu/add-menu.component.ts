import { Component, OnInit, ViewChild } from '@angular/core';
import { IonFab, NavController } from '@ionic/angular';
import { Observable, from, combineLatest, of } from 'rxjs';
import moment from 'moment';
import { DateHelperService } from '../../services/date-helper/date-helper.service';
import { TripLoggerService } from '../../../../core/services/trip-logger/trip-logger.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { RegistrationService } from '../../../registration/services/registration.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { setObservableTimeout } from '../../../../core/helpers/observable-helper';
import { LoggingService } from '../../services/logging/logging.service';

const DEBUG_TAG = 'AddMenuComponent';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  @ViewChild('menuFab') menuFab: IonFab;

  drafts$: Observable<{ id: string; geoHazard: GeoHazard; date: string }[]>;
  geoHazardInfo$: Observable<{
    geoHazards: GeoHazard[];
    showTrip: boolean;
  }>;
  tripStarted$: Observable<boolean>;
  showSpace$: Observable<boolean>;

  constructor(
    private registrationService: RegistrationService,
    private navController: NavController,
    private dateHelperService: DateHelperService,
    private tripLoggerService: TripLoggerService,
    private userSettingService: UserSettingService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.geoHazardInfo$ = this.userSettingService.userSetting$.pipe(
      map((us) => ({
        geoHazards: us.currentGeoHazard,
        showTrip: us.currentGeoHazard.indexOf(GeoHazard.Snow) >= 0
      })),
      setObservableTimeout()
    );
    this.drafts$ = this.registrationService.drafts$.pipe(
      tap((drafts) =>
        this.loggingService.debug('Drafts has changed to', DEBUG_TAG, drafts)
      ),
      switchMap((drafts) =>
        drafts.length > 0
          ? combineLatest(drafts.map((draft) => this.convertDraftToDate(draft)))
          : of([])
      ),
      tap((drafts) =>
        this.loggingService.debug(
          'Converted drafts has changed to',
          DEBUG_TAG,
          drafts
        )
      ),
      setObservableTimeout()
    );
    this.tripStarted$ = this.tripLoggerService.isTripRunning$;
  }

  private convertDraftToDate(
    draft: IRegistration
  ): Observable<{ id: string; geoHazard: GeoHazard; date: string }> {
    return from(this.getDate(draft.changed)).pipe(
      map((date) => ({ id: draft.id, geoHazard: draft.geoHazard, date }))
    );
  }

  getName(geoHazard: GeoHazard): string {
    return GeoHazard[geoHazard];
  }

  getDate(timestamp: number): Promise<string> {
    return this.dateHelperService.formatDate(moment.unix(timestamp));
  }

  closeAndNavigate(url: string): void {
    setTimeout(() => {
      if (this.menuFab) {
        this.menuFab.close();
      }
    }, 0);
    this.navController.navigateForward(url);
  }

  createRegistration(geoHazard: GeoHazard): void {
    this.closeAndNavigate(`registration/new/${geoHazard}`);
  }

  editRegistration(id: string): void {
    this.closeAndNavigate(`registration/edit/${id}`);
  }

  closeMenu(): void {
    this.menuFab.close();
  }

  startOrStopTrip(tripStarted: boolean): void {
    return tripStarted
      ? this.tripLoggerService.stopLegacyTrip()
      : this.closeAndNavigate('legacy-trip');
  }
}
