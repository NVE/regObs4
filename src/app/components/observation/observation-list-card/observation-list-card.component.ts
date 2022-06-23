import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { settings } from '../../../../settings';
import {
  AttachmentViewModel,
  RegistrationViewModel,
  Summary
} from 'src/app/modules/common-regobs-api/models';
import { ModalController } from '@ionic/angular';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { FullscreenImageModalPage } from '../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ExternalLinkService } from '../../../core/services/external-link/external-link.service';
import * as utils from '@nano-sql/core/lib/utilities';
import * as L from 'leaflet';
import { ModalMapImagePage } from '../../../modules/map/pages/modal-map-image/modal-map-image.page';
import { AnalyticService } from '../../../modules/analytics/services/analytic.service';
import { AppEventCategory } from '../../../modules/analytics/enums/app-event-category.enum';
import { AppEventAction } from '../../../modules/analytics/enums/app-event-action.enum';
import { ImageLocation } from '../../img-swiper/image-location.model';
import 'leaflet.utm';
import { getStarCount } from '../../../core/helpers/competence-helper';
import { catchError, switchMap, timeout } from 'rxjs/operators';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { getObserverEditCheckObservable } from 'src/app/modules/registration/edit-registration-helper-functions';
import { firstValueFrom, Observable, of, TimeoutError } from 'rxjs';
import { RegistrationService } from 'src/app/modules/common-regobs-api';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { getAllAttachmentsFromViewModel } from 'src/app/modules/common-registration/registration.helpers';
import { HttpErrorResponse } from '@angular/common/http';

const DEBUG_TAG = 'ObservationListCardComponent';
const FETCH_OBS_TIMEOUT_MS = 5000;

@Component({
  selector: 'app-observation-list-card',
  templateUrl: './observation-list-card.component.html',
  styleUrls: ['./observation-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservationListCardComponent implements OnChanges {
  @Input() obs: RegistrationViewModel;

  dtObsDate: string;
  icon: string;
  settings = settings;
  header: string;
  summaries: Summary[] = [];
  allSelected = true;
  loaded = false;
  imageHeader = '';
  imageDecription = '';
  competenceLevel: number;
  geoHazard: GeoHazard;
  userCanEdit = false;
  isLoadingObsForEdit = false;

  attachments: AttachmentViewModel[] = [];
  location: ImageLocation;

  constructor(
    private modalController: ModalController,
    private externalLinkService: ExternalLinkService,
    private userSettingService: UserSettingService,
    private socialSharing: SocialSharing,
    private cdr: ChangeDetectorRef,
    private analyticService: AnalyticService,
    private regobsAuthService: RegobsAuthService,
    private registrationService: RegistrationService,
    private draftRepository: DraftRepositoryService,
    private router: Router,
    private logger: LoggingService
  ) {}

  private async load() {
    this.geoHazard = <GeoHazard>this.obs.GeoHazardTID;
    this.header = this.obs.ObsLocation.Title;
    this.location = this.getLocation(this.obs);
    this.dtObsDate = this.obs.DtObsTime;
    this.icon = this.getGeoHazardCircleIcon(this.geoHazard);
    this.summaries = this.obs.Summaries;
    this.competenceLevel = getStarCount(this.obs.Observer.CompetenceLevelName);
    this.updateImages();
    this.loaded = true;
    this.userCanEdit = await this.checkIfUserCanEdit();
    this.cdr.markForCheck();
  }

  private getLocation(obs: RegistrationViewModel): ImageLocation {
    return {
      latLng: L.latLng(
        this.obs.ObsLocation.Latitude,
        this.obs.ObsLocation.Longitude
      ),
      geoHazard: this.geoHazard,
      startStopLocation: this.getStartStopLocation(obs),
      damageLocations: this.getDamagePositions(obs)
    };
  }

  private getStartStopLocation(
    obs: RegistrationViewModel
  ): { start?: L.LatLng; stop?: L.LatLng } {
    if (obs.AvalancheObs) {
      return {
        start:
          obs.AvalancheObs.StartLat && obs.AvalancheObs.StartLong
            ? L.latLng(obs.AvalancheObs.StartLat, obs.AvalancheObs.StartLong)
            : undefined,
        stop:
          obs.AvalancheObs.StopLong && obs.AvalancheObs.StopLong
            ? L.latLng(obs.AvalancheObs.StopLat, obs.AvalancheObs.StopLong)
            : undefined
      };
    }
    if (obs.LandSlideObs) {
      return {
        start:
          obs.LandSlideObs.StartLat && obs.LandSlideObs.StartLong
            ? L.latLng(obs.LandSlideObs.StartLat, obs.LandSlideObs.StartLong)
            : undefined,
        stop:
          obs.LandSlideObs.StopLat && obs.LandSlideObs.StopLong
            ? L.latLng(obs.LandSlideObs.StopLat, obs.LandSlideObs.StopLong)
            : undefined
      };
    }
    return undefined;
  }

  private getDamagePositions(obs: RegistrationViewModel) {
    if (obs && obs.DamageObs && obs.DamageObs.some((d) => d.DamagePosition)) {
      return obs.DamageObs.filter(
        (d) =>
          d.DamagePosition &&
          d.DamagePosition.Latitude &&
          d.DamagePosition.Longitude
      ).map((d) =>
        L.latLng(d.DamagePosition.Latitude, d.DamagePosition.Longitude)
      );
    }
    return undefined;
  }

  ngOnChanges(): void {
    this.load();
  }

  getGeoHazardCircleIcon(geoHazard: GeoHazard): string {
    switch (geoHazard) {
    case GeoHazard.Soil:
      return '/assets/icon/dirt_circle.svg';
    case GeoHazard.Ice:
      return '/assets/icon/ice_circle.svg';
    case GeoHazard.Snow:
      return '/assets/icon/snow_circle.svg';
    case GeoHazard.Water:
      return '/assets/icon/water_circle.svg';
    }
  }

  updateImages(): void {
    this.attachments = getAllAttachmentsFromViewModel(this.obs);
  }

  getImageUrl(
    attachment: AttachmentViewModel,
    size: 'Thumbnail' | 'Medium' | 'Large' | 'Original' | 'Raw' = 'Large'
  ): string {
    return attachment.UrlFormats[size] || attachment.Url;
  }

  getRegistrationNames(): string {
    return this.obs.Summaries.map((reg) => reg.RegistrationName).join(', ');
  }

  async openImage(event: { index: number; imgUrl: string }): Promise<void> {
    const attachments = getAllAttachmentsFromViewModel(this.obs);
    const image = attachments[event.index] as AttachmentViewModel & {Href: string};
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: `${this.getImageUrl(
          image,
          'Original'
        )}?r=${utils.uuid()}`,
        header: image.RegistrationName,
        description: image.Comment,
        href: image.Href,
      }
    });
    modal.present();
  }

  async openLocation(location: {
    latLng: L.LatLng;
    geoHazard: GeoHazard;
  }): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalMapImagePage,
      componentProps: {
        location
      }
    });
    modal.present();
  }

  private async getBaseUrl() {
    const userSetings = await firstValueFrom(this.userSettingService.userSetting$);
    return settings.services.regObs.webUrl[userSetings.appMode];
  }

  private getRegistrationUrl(baseUrl: string, loginHint?: string) {
    return `${baseUrl}/Registration/${this.obs.RegId}${
      loginHint ? `?login_hint=${loginHint}` : ''
    }`;
  }

  async openWeb(): Promise<void> {
    const baseUrl = await this.getBaseUrl();
    const user = await this.regobsAuthService.getLoggedInUserAsPromise();
    const url = this.getRegistrationUrl(baseUrl, user.email);
    this.analyticService.trackEvent(
      AppEventCategory.Observations,
      AppEventAction.Click,
      url,
      this.obs.RegId
    );
    this.externalLinkService.openExternalLink(url);
  }

  async share(): Promise<void> {
    const baseUrl = await this.getBaseUrl();
    const url = this.getRegistrationUrl(baseUrl);
    this.analyticService.trackEvent(
      AppEventCategory.Observations,
      AppEventAction.Share,
      url,
      this.obs.RegId
    );
    this.socialSharing.share(null, null, null, url);
  }

  private async checkIfUserCanEdit(): Promise<boolean> {
    const observer = await firstValueFrom(this.regobsAuthService.myPageData$);
    const editMode = await firstValueFrom(getObserverEditCheckObservable(this.obs, observer));
    return editMode === 'EDIT_OWN_REGISTRATION' || editMode === 'EDIT_AS_MODERATOR';
  }

  private fetchRegistrationBeforeEdit(
    regId: RegistrationService.RegistrationGetParams['regId']
  ): Observable<RegistrationViewModel> {
    return this.userSettingService.language$.pipe(
      switchMap(langKey => this.registrationService.RegistrationGet({ regId, langKey })),
      timeout(FETCH_OBS_TIMEOUT_MS),
      catchError(error => {
        let msg: string;
        if (error instanceof TimeoutError) {
          msg = `Failed to fetch obs before edit after ${FETCH_OBS_TIMEOUT_MS}ms, using cached obs`;
        } else if (error instanceof HttpErrorResponse && error.status === 410) {
          msg = 'Obs was deleted from Regobs';
          this.obs = null;
        } else {
          msg = 'An unknown error occured while fetching obs before edit, using cached obs';
        }
        this.logger.error(error, DEBUG_TAG, msg);
        return of(this.obs);
      })
    );
  }

  async edit() {
    this.isLoadingObsForEdit = true;
    try {
      const uuid = this.obs.ExternalReferenceId;
      const draft = await this.draftRepository.load(uuid);
      if (!draft) {
        //we don't have a local working copy of this regstration yet, so fetch it and save as draft
        this.logger.debug(`Registration edit: Fetching from API. RegID = ${this.obs.RegId}, uuid = ${uuid}`, DEBUG_TAG);
        const registrationFromServer = await firstValueFrom(this.fetchRegistrationBeforeEdit(this.obs.RegId));
        if (registrationFromServer === null) {
          return; //TODO: Handle registration gone
        }
        await this.draftRepository.saveAsDraft(registrationFromServer);
      } else {
        this.logger.debug(`Registration edit: Using local draft. RegID = ${this.obs.RegId}, uuid = ${uuid}`, DEBUG_TAG);
      }
    } finally {
      this.isLoadingObsForEdit = false;
      this.cdr.markForCheck();
    }
    this.router.navigate(['registration', 'edit', this.obs.ExternalReferenceId]);
  }
}