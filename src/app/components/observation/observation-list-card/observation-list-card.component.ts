import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';
import { settings } from '../../../../settings';
import { RegistrationViewModel, Summary } from '../../../modules/regobs-api/models';
import { ModalController } from '@ionic/angular';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';
import { FullscreenImageModalPage } from '../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ExternalLinkService } from '../../../core/services/external-link/external-link.service';
import * as utils from '@nano-sql/core/lib/utilities';
import * as L from 'leaflet';
import { ModalMapImagePage } from '../../../modules/map/pages/modal-map-image/modal-map-image.page';
import { AnalyticService } from '../../../modules/analytics/services/analytic.service';
import { AppEventCategory } from '../../../modules/analytics/enums/app-event-category.enum';
import { AppEventAction } from '../../../modules/analytics/enums/app-event-action.enum';
// import { ObsCardHeightService } from '../../../core/services/obs-card-height/obs-card-height.service';

@Component({
  selector: 'app-observation-list-card',
  templateUrl: './observation-list-card.component.html',
  styleUrls: ['./observation-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationListCardComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {


  @Input() obs: RegistrationViewModel;

  dtObsDate: string;
  icon: string;
  settings = settings;
  header: string;
  summaries: Summary[] = [];
  private userSetting: UserSetting;
  allSelected = true;
  loaded = false;
  imageHeader = '';
  imageDecription = '';
  stars: { full: boolean }[] = [];
  hasNoStars: boolean;
  geoHazard: GeoHazard;

  imageUrls: string[] = [];
  imageHeaders: string[] = [];
  imageDescriptions: string[] = [];
  location: { latLng: L.LatLng, geoHazard: GeoHazard };

  constructor(
    private translateService: TranslateService,
    private modalController: ModalController,
    private externalLinkService: ExternalLinkService,
    private userSettingService: UserSettingService,
    private socialSharing: SocialSharing,
    private cdr: ChangeDetectorRef,
    private analyticService: AnalyticService,
  ) { }

  async ngOnInit() {

  }

  private async load() {
    if (!this.userSetting) {
      this.userSetting = await this.userSettingService.getUserSettings();
    }
    this.geoHazard = <GeoHazard>this.obs.GeoHazardTID;

    this.header = this.obs.ObsLocation.Title;
    this.location = {
      latLng: L.latLng(this.obs.ObsLocation.Latitude, this.obs.ObsLocation.Longitude),
      geoHazard: this.geoHazard
    };
    this.dtObsDate = this.obs.DtObsTime;
    this.icon = this.getGeoHazardCircleIcon(this.geoHazard);
    this.summaries = this.obs.Summaries;
    this.stars = [];
    for (let i = 0; i < 5; i++) {
      this.stars.push({ full: (this.obs.Observer.CompetenceLevelName || '')[i] === '*' });
    }
    this.hasNoStars = !this.stars.some((x) => x.full);
    this.updateImages();
    this.loaded = true;

    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }

  getGeoHazardCircleIcon(geoHazard: GeoHazard) {
    switch (geoHazard) {
      case GeoHazard.Dirt:
        return '/assets/icon/dirt_circle.svg';
      case GeoHazard.Ice:
        return '/assets/icon/ice_circle.svg';
      case GeoHazard.Snow:
        return '/assets/icon/snow_circle.svg';
      case GeoHazard.Water:
        return '/assets/icon/water_circle.svg';
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  updateImages() {
    const openImages = this.obs.Attachments.filter((a) => {
      return true;
      // const summary = this.summaries.find((s) => s.RegistrationTID === a.RegistrationTID);
      // if (!summary) {
      //   return true;
      // } else {
      //   return summary.open;
      // }
    });
    this.imageHeaders = openImages.map((x) => x.RegistrationName);
    this.imageDescriptions = openImages.map((x) => x.Comment);
    this.imageUrls = openImages.map((x) => this.getImageUrl(x.AttachmentFileName));
  }

  getImageUrl(filename: string, size: 'thumbnail' | 'medium' | 'large' | 'original' | 'raw' = 'large') {
    return `${settings.services.regObs.webUrl[this.userSetting.appMode]}/Attachments/${size}/${filename}`;
  }

  getRegistrationNames() {
    return this.obs.Summaries.map((reg) => reg.RegistrationName).join(', ');
  }

  async openImage(event: { index: number, imgUrl: string }) {
    const image = this.obs.Attachments[event.index];
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: `${this.getImageUrl(image.AttachmentFileName, 'original')}?r=${utils.uuid()}`,
        header: this.obs.Attachments[event.index].RegistrationName,
        description: this.obs.Attachments[event.index].Comment,
      },
    });
    modal.present();
  }

  async openLocation(location: { latLng: L.LatLng, geoHazard: GeoHazard }) {
    const modal = await this.modalController.create({
      component: ModalMapImagePage,
      componentProps: {
        location
      },
    });
    modal.present();
  }

  // toggleAllSelected() {
  //   this.allSelected = !this.allSelected;
  //   for (const s of this.summaries) {
  //     s.open = this.allSelected;
  //   }
  //   this.updateImages();
  // }

  // toggleRegistration(index: number) {
  //   if (this.allSelected) {
  //     this.toggleAllSelected();
  //   }
  //   this.summaries[index].open = !this.summaries[index].open;
  //   this.updateImages();
  // }

  private getRegistrationUrl() {
    return `${settings.services.regObs.webUrl[this.userSetting.appMode]}/Registration/${this.obs.RegID}`;
  }

  async openWeb() {
    const url = this.getRegistrationUrl();
    this.analyticService.trackEvent(AppEventCategory.Observations, AppEventAction.Click, url, this.obs.RegID);
    this.externalLinkService.openExternalLink(url);
  }

  async share() {
    const url = this.getRegistrationUrl();
    this.analyticService.trackEvent(AppEventCategory.Observations, AppEventAction.Share, url, this.obs.RegID);
    this.socialSharing.share(null, null, null, url);
  }
}
