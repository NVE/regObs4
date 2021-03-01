import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { GeoHazard } from '@varsom-regobs-common/core';
import { settings } from '../../../../settings';
import {
  RegistrationViewModel,
  Summary
} from '../../../modules/regobs-api/models';
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
    private regobsAuthService: RegobsAuthService
  ) {}

  private async load() {
    const baseUrl = await this.getBaseUrl();
    this.geoHazard = <GeoHazard>this.obs.GeoHazardTID;
    this.header = this.obs.ObsLocation.Title;
    this.location = this.getLocation(this.obs);
    this.dtObsDate = this.obs.DtObsTime;
    this.icon = this.getGeoHazardCircleIcon(this.geoHazard);
    this.summaries = this.obs.Summaries;
    this.competenceLevel = getStarCount(this.obs.Observer.CompetenceLevelName);
    this.updateImages(baseUrl);
    this.loaded = true;

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
          obs.LandSlideObs.UTMEastStart && obs.LandSlideObs.UTMNorthStart
            ? L.utm({
                y: obs.LandSlideObs.UTMNorthStart,
                x: obs.LandSlideObs.UTMEastStart,
                zone:
                  obs.LandSlideObs.UTMZoneStart > 0
                    ? obs.LandSlideObs.UTMZoneStart
                    : 33,
                band: 'W',
                southHemi: false
              }).latLng()
            : undefined,
        stop:
          obs.LandSlideObs.UTMEastStop && obs.LandSlideObs.UTMNorthStop
            ? L.utm({
                y: obs.LandSlideObs.UTMNorthStop,
                x: obs.LandSlideObs.UTMEastStop,
                zone:
                  obs.LandSlideObs.UTMZoneStart > 0
                    ? obs.LandSlideObs.UTMZoneStart
                    : 33, // TODO: Bug, UTMZoneStop is 0
                band: 'W',
                southHemi: false
              }).latLng()
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

  updateImages(baseUrl: string): void {
    this.imageHeaders = this.obs.Attachments.map((x) => x.RegistrationName);
    this.imageDescriptions = this.obs.Attachments.map((x) => x.Comment);
    this.imageUrls = this.obs.Attachments.map((x) =>
      this.getImageUrl(baseUrl, x.AttachmentFileName)
    );
  }

  getImageUrl(
    baseUrl: string,
    filename: string,
    size: 'thumbnail' | 'medium' | 'large' | 'original' | 'raw' = 'large'
  ): string {
    return `${baseUrl}/Attachments/${size}/${filename}`;
  }

  getRegistrationNames(): string {
    return this.obs.Summaries.map((reg) => reg.RegistrationName).join(', ');
  }

  async openImage(event: { index: number; imgUrl: string }): Promise<void> {
    const image = this.obs.Attachments[event.index];
    const baseUrl = await this.getBaseUrl();
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: `${this.getImageUrl(
          baseUrl,
          image.AttachmentFileName,
          'original'
        )}?r=${utils.uuid()}`,
        header: this.obs.Attachments[event.index].RegistrationName,
        description: this.obs.Attachments[event.index].Comment
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
    return `${baseUrl}/Registration/${this.obs.RegID}${
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
      this.obs.RegID
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
      this.obs.RegID
    );
    this.socialSharing.share(null, null, null, url);
  }
}
