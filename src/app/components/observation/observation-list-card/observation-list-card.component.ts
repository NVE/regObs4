import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { HelperService } from '../../../core/services/helpers/helper.service';
import { settings } from '../../../../settings';
import { RegistrationViewModel, Summary } from '../../../modules/regobs-api/models';
import { ModalController } from '@ionic/angular';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';
import { FullscreenImageModalPage } from '../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ExternalLinkService } from '../../../core/services/external-link/external-link.service';

@Component({
  selector: 'app-observation-list-card',
  templateUrl: './observation-list-card.component.html',
  styleUrls: ['./observation-list-card.component.scss']
})
export class ObservationListCardComponent implements OnInit {
  @Input() obs: RegistrationViewModel;

  geoHazardName: string;
  dtObsDate: Date;
  icon: string;
  settings = settings;
  header: string[];
  summaries: { summary: Summary, open: boolean }[] = [];
  private userSetting: UserSetting;
  allSelected = true;
  loaded = false;
  imageHeader = '';
  imageDecription = '';
  stars: { full: boolean }[] = [];

  imageUrls: string[] = [];
  imageHeaders: string[] = [];
  imageDescriptions: string[] = [];

  constructor(
    private translateService: TranslateService,
    private helperService: HelperService,
    private modalController: ModalController,
    private externalLinkService: ExternalLinkService,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
    private socialSharing: SocialSharing,
  ) { }

  async ngOnInit() {
    const geoHazard = this.obs.GeoHazardTID;
    this.userSetting = await this.userSettingService.getUserSettings();
    this.geoHazardName = await this.translateService
      .get(`GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase()).toPromise();

    this.ngZone.run(() => {
      this.header = this.getHeader(this.obs);
      this.dtObsDate = moment(this.obs.DtObsTime).toDate();
      this.icon = this.helperService.getGeoHazardIcon(geoHazard);
      this.summaries = this.obs.Summaries.filter((x) => x !== undefined).map((x) => ({ summary: x, open: true }));
      for (let i = 0; i < 5; i++) {
        this.stars.push({ full: (this.obs.Observer.CompetenceLevelName || '')[i] === '*' });
      }
      this.updateImages();
      this.loaded = true;
    });
  }

  updateImages() {
    const openImages = this.obs.Attachments.filter((a) => {
      const summary = this.summaries.find((s) => s.summary.RegistrationTID === a.RegistrationTID);
      if (!summary) {
        return true;
      } else {
        return summary.open;
      }
    });
    this.imageHeaders = openImages.map((x) => x.RegistrationName);
    this.imageDescriptions = openImages.map((x) => x.Comment);
    this.imageUrls = openImages.map((x) => this.getImageUrl(x.AttachmentFileName));
  }

  getImageUrl(filename: string, size: 'thumbnail' | 'medium' | 'large' | 'original' | 'raw' = 'large') {
    return `${settings.services.regObs.webUrl[this.userSetting.appMode]}/Attachments/${size}/${filename}`;
  }

  getHeader(obs: RegistrationViewModel) {
    const headerValues: string[] = [];
    if (obs.ObsLocation.MunicipalName) {
      headerValues.push(obs.ObsLocation.MunicipalName);
    } else if (obs.ObsLocation.LocationName) {
      headerValues.push(obs.ObsLocation.LocationName);
    }
    if (obs.ObsLocation.ForecastRegionName) {
      headerValues.push(obs.ObsLocation.ForecastRegionName);
    }
    return headerValues;
  }

  getRegistrationNames() {
    return this.obs.Summaries.map((reg) => reg.RegistrationName).join(', ');
  }

  async openImage(event: any) {
    const image = this.obs.Attachments[event.index];
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: this.getImageUrl(image.AttachmentFileName, 'large'),
        header: this.obs.Attachments[event.index].RegistrationName,
        description: this.obs.Attachments[event.index].Comment,
      },
    });
    modal.present();
  }

  toggleAllSelected() {
    this.allSelected = !this.allSelected;
    for (const s of this.summaries) {
      s.open = this.allSelected;
    }
    this.updateImages();
  }

  toggleRegistration(index: number) {
    if (this.allSelected) {
      this.toggleAllSelected();
    }
    this.summaries[index].open = !this.summaries[index].open;
    this.updateImages();
  }

  private getRegistrationUrl() {
    return `${settings.services.regObs.webUrl[this.userSetting.appMode]}/Registration/${this.obs.RegID}`;
  }

  async openWeb() {
    this.externalLinkService.openExternalLink(this.getRegistrationUrl());
  }

  async share() {
    this.socialSharing.share(null, null, null, this.getRegistrationUrl());
  }
}
