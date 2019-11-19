import { Component, OnInit, Input } from '@angular/core';
import { TempProfileObsDto } from '../../../../../../regobs-api/models';
import { ModalController } from '@ionic/angular';
import { IRegistration } from '../../../../../models/registration.model';
import { IsEmptyHelper } from '../../../../../../../core/helpers/is-empty.helper';
import { RegistrationService } from '../../../../../services/registration.service';
import cloneDeep from 'clone-deep';

@Component({
  selector: 'app-snow-temp-layer-modal',
  templateUrl: './snow-temp-layer-modal.page.html',
  styleUrls: ['./snow-temp-layer-modal.page.scss'],
})
export class SnowTempLayerModalPage implements OnInit {

  @Input() layer: TempProfileObsDto;
  @Input() index: number;
  @Input() reg: IRegistration;
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
  }

  get hasLayers() {
    return this.reg && this.reg.request && this.reg.request.SnowProfile2
      && this.reg.request.SnowProfile2.SnowTemp
      && this.reg.request.SnowProfile2.SnowTemp.Layers
      && this.reg.request.SnowProfile2.SnowTemp.Layers.length > 0;
  }

  get layerLenght() {
    return this.hasLayers ? this.reg.request.SnowProfile2.SnowTemp.Layers.length : 0;
  }

  get canGoNext() {
    return (this.hasLayers && this.index < this.layerLenght)
      || (this.index === this.layerLenght &&
        this.addNew && !IsEmptyHelper.isEmpty(this.layer));
  }

  async ok(gotoIndex?: number) {
    if (!this.reg.request.SnowProfile2) {
      this.reg.request.SnowProfile2 = {};
    }
    if (!this.reg.request.SnowProfile2.SnowTemp) {
      this.reg.request.SnowProfile2.SnowTemp = {};
    }
    if (!this.reg.request.SnowProfile2.SnowTemp.Layers) {
      this.reg.request.SnowProfile2.SnowTemp.Layers = [];
    }
    if (this.addNew && !IsEmptyHelper.isEmpty(this.layer)) {
      this.reg.request.SnowProfile2.SnowTemp.Layers.splice(this.index, 0, this.layer);
    }
    await this.registrationService.saveRegistration(this.reg);

    if (gotoIndex !== undefined) {
      this.index = this.index + (gotoIndex);
      this.layer = this.reg.request.SnowProfile2.SnowTemp.Layers[this.index];
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
    if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowTemp
      && this.reg.request.SnowProfile2.SnowTemp.Layers && this.reg.request.SnowProfile2.SnowTemp.Layers.length > 0) {
      this.reg.request.SnowProfile2.SnowTemp.Layers =
        this.reg.request.SnowProfile2.SnowTemp.Layers.filter((l) => l !== this.layer);
      await this.registrationService.saveRegistration(this.reg);
    }
    this.modalController.dismiss({ delete: true });
  }

}
