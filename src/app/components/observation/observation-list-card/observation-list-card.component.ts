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
  AdaptiveElement,
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
import { take } from 'rxjs/operators';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { RegistrationTid } from 'src/app/modules/common-registration/models/registration-tid.enum';
import { SnowProfileData } from 'src/app/modules/adaptive-cards/adaptive-snow-profile';
import { getObserverEditCheckObservable } from 'src/app/modules/registration/edit-registration-helper-functions';
import { firstValueFrom } from 'rxjs';
import { RegistrationService } from 'src/app/modules/common-regobs-api';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'ObservationListCardComponent';

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

  imageUrls: string[] = [];
  imageHeaders: string[] = [];
  imageDescriptions: string[] = [];
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
    const snowProfileSummary = this.obs.Summaries.find(
      (s) => s.RegistrationTID === RegistrationTid.SnowProfile2
    );
    const snowProfilePlot = snowProfileSummary?.AdaptiveElements.find(
      (e: AdaptiveElement) => e.type == 'SnowProfilePlot'
    ) as SnowProfileData;
    if (snowProfilePlot) {
      const profilePlot: AttachmentViewModel & {Href: string} = {
        GeoHazardTID: this.obs.GeoHazardTID,
        GeoHazardName: this.obs.GeoHazardName,
        RegistrationTID: snowProfileSummary?.RegistrationTID,
        RegistrationName: snowProfileSummary?.RegistrationName,
        UrlFormats: {
          Original: snowProfilePlot?.svgUrl,
          Large: snowProfilePlot?.svgUrl,
          Medium: snowProfilePlot?.pngUrl,
        },
        Url: snowProfilePlot?.svgUrl,
        Comment: this.obs?.SnowProfile2?.Comment,
        Href: snowProfilePlot?.interactiveUrl,
      };
      this.obs.Attachments.unshift(profilePlot);
    }

    this.imageHeaders = this.obs.Attachments.map((x) => x.RegistrationName);
    this.imageDescriptions = this.obs.Attachments.map((x) => x.Comment);
    this.imageUrls = this.obs.Attachments.map((x) =>
      this.getImageUrl(x)
    );
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
    const image = this.obs.Attachments[event.index] as AttachmentViewModel & {Href: string};
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
    const userSetings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
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

  async edit() {
    const uuid = this.obs.ExternalReferenceId;
    const draft = await this.draftRepository.load(uuid);
    if (!draft) {
      //we don't have a local working copy of this regstration yet, so fetch it and save as draft
      this.logger.debug(`Registration edit: Fetching from API. RegID = ${this.obs.RegId}, uuid = ${uuid}`, DEBUG_TAG);
      const langKey = await firstValueFrom(this.userSettingService.language$);
      const registrationFromServer = await firstValueFrom(
        this.registrationService.RegistrationGet({ regId: this.obs.RegId, langKey: langKey })
      );
      await this.draftRepository.saveAsDraft(registrationFromServer);
    } else {
      this.logger.debug(`Registration edit: Using local draft. RegID = ${this.obs.RegId}, uuid = ${uuid}`, DEBUG_TAG);
    }
    this.router.navigate(['registration', 'edit', this.obs.ExternalReferenceId]);
  }
}