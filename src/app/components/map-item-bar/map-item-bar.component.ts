import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MapItem } from '../../core/models/map-item.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import { AtAGlanceViewModel, AttachmentViewModel } from 'src/app/modules/common-regobs-api/models';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoPositionService } from '../../core/services/geo-position/geo-position.service';
import { getStarCountFromNumber } from '../../core/helpers/competence-helper';
import { AttachmentService } from 'src/app/modules/common-regobs-api';

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
  firstAttachment: SafeUrl;
  attachmentsCount: number;
  name: string;
  id: number;
  geoHazard: GeoHazard;
  attachments: AttachmentViewModel[] = [];
  masl: number;
  competenceLevel: number;
  showImage: boolean;
  imgSrc: string;

  private subscription: Subscription;
  private _isVisible: Subject<boolean>;
  private appMode: AppMode;

  get isVisible(): Observable<boolean> {
    return this._isVisible.asObservable();
  }

  // TODO: Rewrite this component to use observable. Maybe put visibleMapItem observable in map service?

  constructor(
    private geoPositionService: GeoPositionService,
    private helper: HelperService,
    private translateService: TranslateService,
    private attachmentService: AttachmentService,
    private router: Router,
    private zone: NgZone,
    private userSettingService: UserSettingService,
    private sanitizer: DomSanitizer
  ) {
    this.visible = false;
    this._isVisible = new Subject();
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

  getAttachmentsCount(count: number): number {
    return count > 1 ? count - 1 : null;
  }

  handleMissingImage() {
    this.firstAttachment = './assets/images/broken-image-w-bg.svg';
  }

  private isAttachments(url: string) {
    if (url) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else {
      this.showImage = false;
    }
  }

  show(item: MapItem) {
    this.showImage = true;
    this.zone.run(async () => {
      this.id = item.RegId;
      this.topHeader = item.DtObsTime;
      this.title = this.getTitle(item);
      this.name = item.NickName;
      this.competenceLevel = getStarCountFromNumber(item.CompetenceLevelTID);
      this.geoHazard = item.GeoHazardTID;
      // this.masl = item.ObsLocation ? item.ObsLocation.Height : undefined;
      // this.setDistanceAndType(item);
      this.attachments = [];
      this.firstAttachment = this.isAttachments(item.FirstAttachmentUrl);
      this.attachmentsCount = this.getAttachmentsCount(item.AttachmentsCount);
      this.visible = true;
      this.publishChange();
    });
  }

  hide() {
    this.zone.run(() => {
      this.visible = false;
      this.publishChange();
    });
  }

  navigateToItem() {
    this.router.navigateByUrl(`view-observation/${this.id}`);
  }

  private publishChange() {
    this._isVisible.next(this.visible);
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
