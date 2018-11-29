import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { HelperService } from '../../../core/services/helpers/helper.service';
import { OfflineImageService } from '../../../core/services/offline-image/offline-image.service';
import { settings } from '../../../../settings';
import { RegistrationViewModel, Summary } from '../../../modules/regobs-api/models';
import { Slides, ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FullscreenImageModalPage } from '../../../pages/fullscreen-image-modal/fullscreen-image-modal.page';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';

@Component({
  selector: 'app-observation-list-card',
  templateUrl: './observation-list-card.component.html',
  styleUrls: ['./observation-list-card.component.scss']
})
export class ObservationListCardComponent implements OnInit {
  @Input() obs: RegistrationViewModel;
  @ViewChild(Slides) slider: Slides;

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

  slideOptions = {
    autoplay: false,
    slidesPerView: 'auto',
    spaceBetween: 10,
  };

  constructor(
    private translateService: TranslateService,
    private helperService: HelperService,
    private offlineImageService: OfflineImageService,
    private modalController: ModalController,
    private inAppBrowser: InAppBrowser,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
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
      if (this.obs.Attachments.length > 0) {
        this.imageHeader = this.obs.Attachments[0].RegistrationName;
        this.imageDecription = this.obs.Attachments[0].Comment;
      }
      this.loaded = true;
    });
  }

  getImageUrl(filename: string, size: 'thumbnail' | 'medium' | 'large' | 'original' | 'raw' = 'medium') {
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

  async slideTap() {
    const index = await this.getImageIndex();
    if (index < this.obs.Attachments.length) {
      await this.openImage(index);
    } else {
      this.slider.slideTo(0);
    }
  }

  async openImage(index: number) {
    const image = this.obs.Attachments[index];
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: this.getImageUrl(image.AttachmentFileName, 'original'),
        header: this.obs.Attachments[index].RegistrationName,
        description: this.obs.Attachments[index].Comment,
      },
    });
    modal.present();
  }

  async getImageIndex() {
    const index = await this.slider.getActiveIndex();
    const isEnd = await this.slider.isEnd();
    return isEnd ? (this.obs.Attachments.length - 1) : index;
  }

  async setNextAndPrevVisibe() {
    const index = await this.getImageIndex();
    this.ngZone.run(() => {
      this.imageHeader = this.obs.Attachments[index].RegistrationName;
      this.imageDecription = this.obs.Attachments[index].Comment;
    });
  }

  toggleAllSelected() {
    this.allSelected = !this.allSelected;
    for (const s of this.summaries) {
      s.open = this.allSelected;
    }
  }

  toggleRegistration(index: number) {
    if (this.allSelected) {
      this.toggleAllSelected();
    }
    this.summaries[index].open = !this.summaries[index].open;
  }

  async openWeb() {
    const src = `${settings.services.regObs.webUrl[this.userSetting.appMode]}/Registration/${this.obs.RegID}`;
    const iap = this.inAppBrowser.create(src, '_system');
    iap.show();
  }
}
