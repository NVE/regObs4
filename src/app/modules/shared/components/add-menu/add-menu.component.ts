import { Component, OnInit, ViewChild } from '@angular/core';
import { IonFab, NavController, Platform } from '@ionic/angular';
import { Observable, from, combineLatest, of } from 'rxjs';
import moment from 'moment';
import { DateHelperService } from '../../services/date-helper/date-helper.service';
import { TripLoggerService } from '../../../../core/services/trip-logger/trip-logger.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { map, tap, switchMap } from 'rxjs/operators';
import { setObservableTimeout } from '../../../../core/helpers/observable-helper';
import { LoggingService } from '../../services/logging/logging.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';

const DEBUG_TAG = 'AddMenuComponent';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
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
  isIosOrAndroid: boolean;

  constructor(
    private draftService: DraftRepositoryService,
    private navController: NavController,
    private dateHelperService: DateHelperService,
    private tripLoggerService: TripLoggerService,
    private userSettingService: UserSettingService,
    private loggingService: LoggingService,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.geoHazardInfo$ = this.userSettingService.userSetting$.pipe(
      map((us) => ({
        geoHazards: us.currentGeoHazard,
        showTrip: us.currentGeoHazard.indexOf(GeoHazard.Snow) >= 0,
      })),
      setObservableTimeout()
    );

    this.drafts$ = this.draftService.drafts$.pipe(
      tap((drafts) => this.loggingService.debug('Drafts has changed to', DEBUG_TAG, drafts)),
      map((drafts) => drafts.filter((d) => d.syncStatus === SyncStatus.Draft)),
      switchMap((drafts) =>
        drafts.length > 0 ? combineLatest(drafts.map((draft) => this.convertDraftToDate(draft))) : of([])
      ),
      tap((drafts) => this.loggingService.debug('Converted drafts has changed to', DEBUG_TAG, drafts)),
      setObservableTimeout()
    );
    this.tripStarted$ = this.tripLoggerService.isTripRunning$;
  }

  private convertDraftToDate(
    draft: RegistrationDraft
  ): Observable<{ id: string; geoHazard: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999; date: string }> {
    return from(this.getDate(draft.lastSavedTime)).pipe(
      map((date) => ({ id: draft.uuid, geoHazard: draft.registration.GeoHazardTID, date }))
    );
  }

  getName(geoHazard: GeoHazard): string {
    return GeoHazard[geoHazard];
  }

  getDate(timestamp: number): Promise<string> {
    return this.dateHelperService.formatDate(moment(timestamp));
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
    return tripStarted ? this.tripLoggerService.stopLegacyTrip() : this.closeAndNavigate('legacy-trip');
  }
}
