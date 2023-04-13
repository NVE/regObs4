import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import L from 'leaflet';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeneralObservationEditModel, Waterlevel2EditModel } from 'src/app/modules/common-regobs-api';
import { SetFloodPositionPage } from '../../../pages/set-flood-position/set-flood-position.page';

/**
 * Simplified water registration schema.
 */
@Component({
  selector: 'app-simple-water-obs',
  templateUrl: './simple-water-obs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleWaterObsComponent {
  @Input() draft: RegistrationDraft;
  constructor(private draftRepository: DraftRepositoryService, private modalController: ModalController) {}

  get waterLevel2(): Waterlevel2EditModel {
    if (!this.draft.registration.WaterLevel2) {
      this.draft.registration.WaterLevel2 = {};
    }
    return this.draft.registration.WaterLevel2;
  }

  get generalObservation(): GeneralObservationEditModel {
    if (!this.draft.registration.GeneralObservation) {
      this.draft.registration.GeneralObservation = {};
    }
    return this.draft.registration.GeneralObservation;
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
