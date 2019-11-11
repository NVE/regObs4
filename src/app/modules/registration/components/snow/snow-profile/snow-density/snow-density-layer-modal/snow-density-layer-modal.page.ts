import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DensityProfileLayerDto } from '../../../../../../regobs-api/models';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';
import { IRegistration } from '../../../../../models/registration.model';
import cloneDeep from 'clone-deep';
import { RegistrationService } from '../../../../../services/registration.service';

@Component({
  selector: 'app-snow-density-layer-modal',
  templateUrl: './snow-density-layer-modal.page.html',
  styleUrls: ['./snow-density-layer-modal.page.scss'],
})
export class SnowDensityLayerModalPage implements OnInit {

  @Input() reg: IRegistration;
  @Input() layer: DensityProfileLayerDto;
  @Input() useCylinder = true;
  @Input() cylinderDiameterInM: number;
  @Input() tareWeight: number;
  @Input() index: number;
  addNew: boolean;
  private initialRegistrationState: IRegistration;

  constructor(private modalController: ModalController, private registrationService: RegistrationService) { }

  ngOnInit() {
    this.initialRegistrationState = cloneDeep(this.reg);
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
    return this.reg && this.reg.request && this.reg.request.SnowProfile2
      && this.reg.request.SnowProfile2.SnowDensity
      && this.reg.request.SnowProfile2.SnowDensity[0]
      && this.reg.request.SnowProfile2.SnowDensity[0].Layers
      && this.reg.request.SnowProfile2.SnowDensity[0].Layers.length > 0;
  }

  get layerLenght() {
    return this.hasLayers ? this.reg.request.SnowProfile2.SnowDensity[0].Layers.length : 0;
  }

  get canGoNext() {
    return (this.hasLayers && this.index < this.layerLenght)
      || (this.index === this.layerLenght &&
        this.addNew && !this.isEmpty(this.layer));
  }

  private isEmpty(snowDensityLayer: DensityProfileLayerDto) {
    return this.useCylinder ? (
      snowDensityLayer.Thickness === undefined &&
      snowDensityLayer.Weight === undefined) :
      (snowDensityLayer.Density === undefined);
  }

  async ok(gotoIndex?: number) {
    if (!this.reg.request.SnowProfile2) {
      this.reg.request.SnowProfile2 = {};
    }
    if (!this.reg.request.SnowProfile2.SnowDensity) {
      this.reg.request.SnowProfile2.SnowDensity = [];
    }
    if (!this.reg.request.SnowProfile2.SnowDensity[0].Layers) {
      this.reg.request.SnowProfile2.SnowDensity[0].Layers = [];
    }
    if (this.addNew && !this.isEmpty(this.layer)) {
      this.reg.request.SnowProfile2.SnowDensity[0].Layers.splice(this.index, 0, this.layer);
    }
    await this.registrationService.saveRegistration(this.reg);

    if (gotoIndex !== undefined) {
      this.index = this.index + (gotoIndex);
      this.layer = this.reg.request.SnowProfile2.SnowDensity[0].Layers[this.index];
      this.initLayer();
    } else {
      this.modalController.dismiss();
    }
  }

  async cancel() {
    await this.registrationService.saveRegistration(this.initialRegistrationState);
    this.modalController.dismiss();
  }

  async delete() {
    if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowDensity
      && this.reg.request.SnowProfile2.SnowDensity.length > 0
      && this.reg.request.SnowProfile2.SnowDensity[0].Layers
      && this.reg.request.SnowProfile2.SnowDensity[0].Layers.length > 0) {
      this.reg.request.SnowProfile2.SnowDensity[0].Layers =
        this.reg.request.SnowProfile2.SnowDensity[0].Layers.filter((l) => l !== this.layer);
      await this.registrationService.saveRegistration(this.reg);
    }
    this.modalController.dismiss();
  }

  calculate() {
    if (this.useCylinder) {
      this.layer.Density = HydrologyHelper.calculateDensity(
        this.layer.Weight,
        this.layer.Thickness,
        this.tareWeight,
        this.cylinderDiameterInM);
    }
  }

  getWaterEquivalent(density: number, depth: number) {
    return HydrologyHelper.calculateWaterEquivalent(density, depth);
  }
}
