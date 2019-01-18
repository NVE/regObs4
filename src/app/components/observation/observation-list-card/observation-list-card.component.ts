import { Component, OnInit, Input, NgZone, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
// import { ObsCardHeightService } from '../../../core/services/obs-card-height/obs-card-height.service';

@Component({
  selector: 'app-observation-list-card',
  templateUrl: './observation-list-card.component.html',
  styleUrls: ['./observation-list-card.component.scss']
})
export class ObservationListCardComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {


  @Input() obs: RegistrationViewModel;

  geoHazardName: string;
  dtObsDate: Date;
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

  imageUrls: string[] = [];
  imageHeaders: string[] = [];
  imageDescriptions: string[] = [];

  // private changes: MutationObserver;

  constructor(
    private translateService: TranslateService,
    private helperService: HelperService,
    private modalController: ModalController,
    private externalLinkService: ExternalLinkService,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
    private socialSharing: SocialSharing,
    // private obsCardHeightService: ObsCardHeightService,
  ) { }

  async ngOnInit() {

  }

  private async load() {
    if (!this.userSetting) {
      this.userSetting = await this.userSettingService.getUserSettings();
    }
    const geoHazard = this.obs.GeoHazardTID;
    this.geoHazardName = await this.translateService
      .get(`GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase()).toPromise();

    this.ngZone.run(() => {
      this.header = this.obs.ObsLocation.Title;
      this.dtObsDate = moment(this.obs.DtObsTime).toDate();
      this.icon = this.getGeoHazardCircleIcon(geoHazard);
      this.summaries = this.obs.Summaries;
      this.stars = [];
      for (let i = 0; i < 5; i++) {
        this.stars.push({ full: (this.obs.Observer.CompetenceLevelName || '')[i] === '*' });
      }
      this.updateImages();
      this.loaded = true;
    });
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
    // const node = document.querySelector(`#cardRegId_${this.obs.RegID}`);

    // this.changes = new MutationObserver((mutations) => {
    //   mutations.forEach((mutation) => this.updateHeight(mutation));
    // });

    // this.changes.observe(node, {
    //   attributes: true,
    //   childList: true,
    //   characterData: true
    // });
  }

  // private updateHeight(mutationRecord: MutationRecord) {
  //   if (mutationRecord.target) {
  //     const height = (<any>mutationRecord.target).offsetHeight + 10; // add 10px padding
  //     if (height > 100) {
  //       this.obsCardHeightService.setHeight(this.obs.RegID, height);
  //     }
  //   }
  // }

  ngOnDestroy(): void {
    // if (this.changes) {
    //   this.changes.disconnect();
    // }
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
    this.externalLinkService.openExternalLink(this.getRegistrationUrl());
  }

  async share() {
    this.socialSharing.share(null, null, null, this.getRegistrationUrl());
  }
}
