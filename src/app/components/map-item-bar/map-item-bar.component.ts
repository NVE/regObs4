import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MapItem } from '../../core/models/map-item.model';
import { Router } from '@angular/router';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import { AtAGlanceViewModel, AttachmentViewModel } from 'src/app/modules/common-regobs-api/models';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { StarRatingHelper } from '../competence/star-helper';

@Component({
  selector: 'app-map-item-bar',
  templateUrl: './map-item-bar.component.html',
  styleUrls: ['./map-item-bar.component.scss'],
})
/**
 * Show key info from selected registration on top of the map.
 * To show this, klick on a registrations icon in the map.
 * Also include an image slider if registration contain images.
 */
export class MapItemBarComponent implements OnInit, OnDestroy {
  visible: boolean;
  topHeader: string;
  title: string;
  distanceAndType: string;
  firstAttachmentUrl: SafeUrl;
  additionaAttachmentCount: number;
  name: string;
  id: number;
  geoHazard: GeoHazard;
  attachments: AttachmentViewModel[] = [];
  masl: number;
  competenceLevel: number;
  showAdditionalAttachmentCount: boolean;

  private subscription: Subscription;
  private appMode: AppMode;

  // TODO: Rewrite this component to use observable. Maybe put visibleMapItem observable in map service?

  constructor(
    private router: Router,
    private zone: NgZone,
    private userSettingService: UserSettingService,
    private sanitizer: DomSanitizer
  ) {
    this.visible = false;
  }

  ngOnInit() {
    this.subscription = this.userSettingService.appModeLanguageAndCurrentGeoHazard$.subscribe(([appMode, _, __]) => {
      this.appMode = appMode;
      this.hide();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTitle(item: AtAGlanceViewModel) {
    return item.FormNames.join(', ');
  }

  getAdditionalAttachmentsCount(count: number): number {
    return count > 1 ? count - 1 : null;
  }

  handleMissingImage() {
    this.firstAttachmentUrl = './assets/images/broken-image-w-bg.svg';
    this.showAdditionalAttachmentCount = false;
  }

  private sanitize(url: string): SafeUrl {
    if (url) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else {
      return null;
    }
  }

  show(item: MapItem) {
    this.showAdditionalAttachmentCount = true;
    this.zone.run(async () => {
      this.id = item.RegId;
      this.topHeader = item.DtObsTime;
      this.title = this.getTitle(item);
      this.name = item.NickName;
      this.competenceLevel = StarRatingHelper.getStarRating(item.CompetenceLevelTID);
      this.geoHazard = item.GeoHazardTID;
      // this.masl = item.ObsLocation ? item.ObsLocation.Height : undefined;
      // this.setDistanceAndType(item);
      this.attachments = [];
      this.firstAttachmentUrl = this.sanitize(item.FirstAttachmentUrl);
      this.additionaAttachmentCount = this.getAdditionalAttachmentsCount(item.AttachmentsCount);
      this.visible = true;
    });
  }

  hide() {
    this.zone.run(() => {
      this.visible = false;
    });
  }

  navigateToItem() {
    this.router.navigateByUrl(`view-observation/${this.id}`);
  }

  // TODO
  // private async setDistanceAndType(item: MapItem) {
  //   this.distanceAndType = ''; // set by promise
  //   const translations = await this.translateService.get(['MAP_ITEM_BAR.OBSERVATION', 'MAP_ITEM_BAR.AWAY']).toPromise();
  //   try {
  //     const currentPosition = await this.geoPositionService.currentPosition$.pipe(take(1)).toPromise();
  //     if (currentPosition) {
  //       const distance = L.latLng(item.Latitude, item.Longitude).distanceTo(
  //         L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude)
  //       );
  //       this.zone.run(() => {
  //         this.distanceAndType =
  //           `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()} ` +
  //           `${this.helper.getDistanceText(distance)} ${translations['MAP_ITEM_BAR.AWAY'].toLowerCase()}`;
  //       });
  //     } else {
  //       this.zone.run(() => {
  //         this.distanceAndType = `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()}`;
  //       });
  //     }
  //   } catch {
  //     this.zone.run(() => {
  //       this.distanceAndType = `${item.GeoHazardName}${translations['MAP_ITEM_BAR.OBSERVATION'].toLowerCase()}`;
  //     });
  //   }
  // }
}
