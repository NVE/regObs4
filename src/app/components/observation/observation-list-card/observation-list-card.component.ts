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
  header: string;
  images: { id: number, url: string, header: string, description: string }[] = [];
  summaries: { summary: Summary, open: boolean }[] = [];
  private userSetting: UserSetting;
  allSelected = true;

  slideOptions = {
    autoplay: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
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
      this.summaries = this.obs.Summaries.map((x) => ({ summary: x, open: true }));
      this.images = this.obs.Attachments.map((x) => ({
        id: x.PictureID,
        url: this.getImageUrl(x.PictureID),
        header: x.RegistrationName,
        description: x.Comment,
      }));
    });
  }

  getImageUrl(id: number, size: 'medium' | 'large' = 'medium') {
    return `${settings.services.regObs.serviceUrl[this.userSetting.appMode]}/Image/${size}/${id}`;
  }

  getHeader(obs: RegistrationViewModel) {
    const headerValues = [];
    if (obs.ObsLocation.MunicipalName) {
      headerValues.push(obs.ObsLocation.MunicipalName);
    } else if (obs.ObsLocation.LocationName) {
      headerValues.push(obs.ObsLocation.LocationName);
    }
    if (obs.ObsLocation.ForecastRegionName) {
      headerValues.push(obs.ObsLocation.ForecastRegionName);
    }
    return headerValues.join(' / ');
  }

  getRegistrationNames() {
    return this.obs.Summaries.map((reg) => reg.RegistrationName).join(', ');
  }

  async slideTap() {
    const index = await this.slider.getActiveIndex();
    const image = this.images[index];
    const modal = await this.modalController.create({
      component: FullscreenImageModalPage,
      componentProps: {
        imgSrc: this.getImageUrl(image.id, 'large'),
        header: image.header,
        description: image.description,
      },
    });
    modal.present();
  }

  slideNext() {
    this.slider.slideNext();
  }
  slidePrev() {
    this.slider.slidePrev();
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
