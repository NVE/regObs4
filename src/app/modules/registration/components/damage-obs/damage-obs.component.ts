import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { SetDamageLocationPage } from '../../pages/set-damage-location/set-damage-location.page';
import { ObsLocationEditModel } from 'src/app/modules/common-regobs-api/models';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

/**
 * Form to register an observation of a specific damage caused by water.
 * There are one instance of this form for each damage type.
 * An example of damage type is damage on buildings
 */
@Component({
  selector: 'app-damage-obs',
  templateUrl: './damage-obs.component.html',
  styleUrls: ['./damage-obs.component.scss'],
})
export class DamageObsComponent implements OnInit {
  @Input() damageTypeId: number;
  @Input() damageTypeName: string;
  @Input() draft: RegistrationDraft;
  @Input() registrationTid: RegistrationTid;

  isSelected: boolean;

  get damageObs() {
    if (this.draft?.registration?.DamageObs) {
      return this.draft.registration.DamageObs.find((x) => x.DamageTypeTID === this.damageTypeId);
    }
    return undefined;
  }

  constructor(private modalController: ModalController, private draftRepository: DraftRepositoryService) {}

  ngOnInit() {
    if (this.damageObs) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
    if (this.damageObs && this.damageObs.Attachments === undefined) {
      this.damageObs.Attachments = [];
    }
  }

  toggleDamageType() {
    this.isSelected = !this.isSelected;
  }

  onCheckedChange() {
    if (this.isSelected) {
      if (!this.damageObs) {
        this.draft.registration.DamageObs.push({
          DamageTypeTID: this.damageTypeId,
          Attachments: [],
        });
      }
    } else {
      this.draft.registration.DamageObs = this.draft.registration.DamageObs.filter(
        (x) => x.DamageTypeTID !== this.damageTypeId
      );
    }
    this.save();
  }

  save() {
    return this.draftRepository.save(this.draft); //TODO: Skal det være en await her?
  }

  getSaveFunc() {
    return () => this.save();
  }

  async setDamagePosition() {
    const fromLatLng = this.draft.registration.ObsLocation
      ? L.latLng(this.draft.registration.ObsLocation.Latitude, this.draft.registration.ObsLocation.Longitude)
      : null;
    const modal = await this.modalController.create({
      component: SetDamageLocationPage,
      componentProps: {
        fromLatLng,
        damageObs: this.damageObs,
        geoHazard: this.draft.registration.GeoHazardTID,
      },
    });
    modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      const obs: ObsLocationEditModel = result.data.location;
      this.damageObs.DamagePosition = {
        Latitude: obs.Latitude,
        Longitude: obs.Longitude,
      };
      await this.save();
    }
  }
}
