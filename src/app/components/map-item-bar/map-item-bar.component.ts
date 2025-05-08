import { IonGrid, IonRow, IonCol, IonLabel } from '@ionic/angular/standalone';
import { Component, OnInit, inject, input, signal, computed, output } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MapItem } from '../../core/models/map-item.model';
import { Router } from '@angular/router';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { AttachmentViewModel, KdvElement } from 'src/app/modules/common-regobs-api/models';
import { StarRatingHelper } from '../competence/star-helper';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { NgClass, AsyncPipe } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { CompetenceComponent } from '../competence/competence.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatDatePipe } from '../../modules/shared/pipes/format-date/format-date.pipe';

@Component({
  selector: 'app-map-item-bar',
  templateUrl: './map-item-bar.component.html',
  styleUrls: ['./map-item-bar.component.scss'],
  imports: [
    AsyncPipe,
    CompetenceComponent,
    FormatDatePipe,
    IonCol,
    IonGrid,
    IonLabel,
    IonRow,
    NgClass,
    SvgIconComponent,
    TranslatePipe,
  ],
})
/**
 * Show key info from selected registration on top of the map.
 * To show this, klick on a registrations icon in the map.
 * Also include an image slider if registration contain images.
 */
export class MapItemBarComponent implements OnInit {
  cardClicked = output();
  private kdvService = inject(KdvService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  registration = input<MapItem | null>();

  distanceAndType?: string;
  firstAttachmentUrl = signal<SafeUrl | undefined>(undefined);
  additionaAttachmentCount = computed(() => {
    const attachmentCount = this.registration()?.AttachmentsCount;
    if (!attachmentCount) {
      return 0;
    }
    return attachmentCount > 1 ? attachmentCount - 1 : 0;
  });
  id?: number;
  geoHazard?: GeoHazard;
  attachments: AttachmentViewModel[] = [];
  masl?: number;
  showAdditionalAttachmentCount = signal(true);

  title = computed(() => this.registration()?.FormNames?.join(', '));
  starCount = computed(() => StarRatingHelper.getStarRating(this.registration()?.CompetenceLevelTID));
  competenceLevelName?: string = undefined;

  async ngOnInit() {
    if (this.registration()?.CompetenceLevelTID) {
      const competence = this.registration()?.CompetenceLevelTID;
      if (!competence) return;
      const competenceLevelName = await this.getCompetenceKdvById(competence);
      this.competenceLevelName = competenceLevelName.Name;
    }
    this.firstAttachmentUrl.set(this.sanitize(this.registration()?.FirstAttachmentUrl));
  }

  handleMissingImage() {
    this.firstAttachmentUrl.set('./assets/images/broken-image-w-bg.svg');
    this.showAdditionalAttachmentCount.set(false);
  }

  private sanitize(url: string | undefined): SafeUrl | undefined {
    if (!url) return;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private getCompetenceKdvById(id: number): Promise<KdvElement> {
    const ifNotFound: KdvElement = { Id: 0, Name: 'Unknown', Description: 'Unknown competence' };
    return firstValueFrom(
      this.kdvService.getKdvRepositoryByKeyObservable('CompetenceLevelKDV').pipe(
        map((kdvs) => kdvs.find((kdv) => kdv.Id === id)),
        map((kdv) => (kdv == null ? ifNotFound : kdv))
      )
    );
  }

  navigateToItem() {
    const targetUrl = `view-observation/${this.registration()?.RegId}`;
    this.router.navigateByUrl(targetUrl).then((navigationSuccess) => {
      if (navigationSuccess) {
        this.cardClicked.emit();
      }
    });
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
