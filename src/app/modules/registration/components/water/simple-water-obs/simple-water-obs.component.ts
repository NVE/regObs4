import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import L from 'leaflet';
import { BehaviorSubject, Subject } from 'rxjs';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { DangerObsEditModel, SnowSurfaceEditModel, Waterlevel2EditModel } from 'src/app/modules/common-regobs-api';
import { SetAvalanchePositionPage } from '../../../pages/set-avalanche-position/set-avalanche-position.page';
import { SetFloodPositionPage } from '../../../pages/set-flood-position/set-flood-position.page';

/**
 * Simplified water registration schema.
 */
@Component({
  selector: 'app-simple-water-obs',
  templateUrl: './simple-water-obs.component.html',
  styleUrls: ['./simple-water-obs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleWaterObsComponent implements OnInit {
  @Input() draft: RegistrationDraft;
  isAreaDrawingTouched = new Subject<boolean>();
  constructor(private draftRepository: DraftRepositoryService, private modalController: ModalController) {}

  ngOnInit(): void {
    console.log(this.draft);
  }

  get waterLevel2(): Waterlevel2EditModel {
    if (!this.draft.registration.WaterLevel2) {
      this.draft.registration.WaterLevel2 = {};
    }
    return this.draft.registration.WaterLevel2;
  }
  async save(): Promise<void> {
    this.draftRepository.save(this.draft);
  }

  async setFloodPosition() {
    const relativeToLatLng = this.draft.registration.ObsLocation
      ? L.latLng(this.draft.registration.ObsLocation.Latitude, this.draft.registration.ObsLocation.Longitude)
      : null;
    const modal = await this.modalController.create({
      component: SetFloodPositionPage,
      componentProps: {
        extent: this.waterLevel2.Extent,
        relativeToLatLng,
        geoHazard: this.draft.registration.GeoHazardTID,
      },
      cssClass: 'modal-fullscreen',
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      this.waterLevel2.Extent = result.data.totalPolygon;
      this.save();
    }
  }
}
