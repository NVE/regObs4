import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SnowDensityLayerModel } from 'src/app/modules/common-regobs-api/models';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-snow-density-layer-modal',
  templateUrl: './snow-density-layer-modal.page.html',
  styleUrls: ['./snow-density-layer-modal.page.scss'],
})
export class SnowDensityLayerModalPage implements OnInit {
  @Input() draft: RegistrationDraft;
  @Input() layer: SnowDensityLayerModel;
  @Input() useCylinder = true;
  @Input() cylinderDiameterInM: number;
  @Input() tareWeight: number;
  @Input() index: number;
  addNew: boolean;
  private initialDraftState: RegistrationDraft;

  constructor(private modalController: ModalController, private draftRepository: DraftRepositoryService) {}

  ngOnInit() {
    this.initialDraftState = cloneDeep(this.draft);
    this.initLayer();
  }

  private initLayer() {
    this.addNew = this.layer === undefined;
    if (this.addNew) {
      this.layer = {};
    }
    this.calculate();
  }

  get hasLayers() {
    return (
      this.draft?.registration?.SnowProfile2?.SnowDensity &&
      this.draft.registration.SnowProfile2.SnowDensity[0]?.Layers?.length > 0
    );
  }

  get layerLenght() {
    return this.hasLayers ? this.draft.registration.SnowProfile2.SnowDensity[0].Layers.length : 0;
  }

  get canGoNext() {
    return (
      (this.hasLayers && this.index < this.layerLenght) ||
      (this.index === this.layerLenght && this.addNew && !this.isEmpty(this.layer))
    );
  }

  private isEmpty(snowDensityLayer: SnowDensityLayerModel) {
    return this.useCylinder
      ? snowDensityLayer.Thickness === undefined && snowDensityLayer.Weight === undefined
      : snowDensityLayer.Density === undefined;
  }

  async ok(gotoIndex?: number) {
    if (!this.draft.registration.SnowProfile2) {
      this.draft.registration.SnowProfile2 = {};
    }
    if (!this.draft.registration.SnowProfile2.SnowDensity) {
      this.draft.registration.SnowProfile2.SnowDensity = [];
    }
    if (!this.draft.registration.SnowProfile2.SnowDensity[0].Layers) {
      this.draft.registration.SnowProfile2.SnowDensity[0].Layers = [];
    }
    if (this.addNew && !this.isEmpty(this.layer)) {
      this.draft.registration.SnowProfile2.SnowDensity[0].Layers.splice(this.index, 0, this.layer);
    }
    await this.draftRepository.save(this.draft);

    if (gotoIndex !== undefined) {
      this.index = this.index + gotoIndex;
      this.layer = this.draft.registration.SnowProfile2.SnowDensity[0].Layers[this.index];
      this.initLayer();
    } else {
      this.modalController.dismiss();
    }
  }

  async cancel() {
    await this.draftRepository.save(this.initialDraftState);
    this.modalController.dismiss();
  }

  async delete() {
    if (this.hasLayers) {
      this.draft.registration.SnowProfile2.SnowDensity[0].Layers =
        this.draft.registration.SnowProfile2.SnowDensity[0].Layers.filter((l) => l !== this.layer);
      await this.draftRepository.save(this.draft);
    }
    this.modalController.dismiss();
  }

  calculate() {
    if (this.useCylinder) {
      this.layer.Density = HydrologyHelper.calculateDensity(
        this.layer.Weight,
        this.layer.Thickness,
        this.tareWeight,
        this.cylinderDiameterInM
      );
    }
  }

  getWaterEquivalent(density: number, depth: number) {
    return HydrologyHelper.calculateWaterEquivalent(density, depth);
  }
}
