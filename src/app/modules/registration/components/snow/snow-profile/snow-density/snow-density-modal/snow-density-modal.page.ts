import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DensityProfileLayerDto } from '../../../../../../regobs-api/models';
import { SnowDensityLayerModalPage } from '../snow-density-layer-modal/snow-density-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';
import { RegistrationService } from '../../../../../services/registration.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IRegistration } from '../../../../../models/registration.model';
import cloneDeep from 'clone-deep';

@Component({
  selector: 'app-snow-density-modal',
  templateUrl: './snow-density-modal.page.html',
  styleUrls: ['./snow-density-modal.page.scss'],
})
export class SnowDensityModalPage implements OnInit, OnDestroy {

  @Input() regId: string;
  useCylinder = true;
  private layerModal: HTMLIonModalElement;
  private ngDestroy$ = new Subject();
  private reg: IRegistration;
  private initialRegistrationClone: IRegistration;

  get profile() {
    return ((((this.reg || {}).request || {}).SnowProfile2 || {}).SnowDensity || [])[0] || {};
  }

  get hasLayers() {
    return this.profile && this.profile.Layers && this.profile.Layers.length > 0;
  }

  constructor(private modalController: ModalController, private registrationService: RegistrationService, private ngZone: NgZone) { }

  ngOnInit() {
    this.registrationService.getSavedRegistrationByIdObservable(this.regId).pipe(takeUntil(this.ngDestroy$)).subscribe((reg) => {
      this.ngZone.run(async () => {
        if (!this.initialRegistrationClone) {
          this.initialRegistrationClone = cloneDeep(reg);
        }
        this.reg = reg;
        if (!this.reg.request.SnowProfile2) {
          this.reg.request.SnowProfile2 = {};
        }
        if (!this.reg.request.SnowProfile2.SnowDensity) {
          this.reg.request.SnowProfile2.SnowDensity = [];
        }
        if (!this.reg.request.SnowProfile2.SnowDensity[0]) {
          this.reg.request.SnowProfile2.SnowDensity[0] = {};
        }
        if (!this.reg.request.SnowProfile2.SnowDensity[0].Layers) {
          this.reg.request.SnowProfile2.SnowDensity[0].Layers = [];
        }
        this.recalculateLayers();
      });
    });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  ok() {
    this.modalController.dismiss(this.profile);
  }

  async cancel() {
    await this.registrationService.saveRegistration(this.initialRegistrationClone);
    this.modalController.dismiss();
  }

  addLayerTop() {
    this.addOrEditLayer(0, undefined);
  }

  addLayerBottom() {
    this.addOrEditLayer(this.hasLayers ? (this.profile.Layers.length) : 0, undefined);
  }

  async addOrEditLayer(index: number, layer: DensityProfileLayerDto) {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: SnowDensityLayerModalPage,
        componentProps: {
          reg: this.reg,
          layer: layer,
          useCylinder: this.useCylinder,
          cylinderDiameterInM: this.profile.CylinderDiameter,
          tareWeight: this.profile.TareWeight,
          index,
        }
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
      this.recalculateLayers();
      await this.registrationService.saveRegistration(this.reg);
    }
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.profile.Layers = ArrayHelper.reorderList(this.profile.Layers, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  recalculateLayers() {
    if (this.useCylinder && this.hasLayers) {
      this.profile.Layers.forEach((layer: DensityProfileLayerDto) => {
        layer.Density = HydrologyHelper.calculateDensity(
          layer.Weight,
          layer.Thickness,
          this.profile.TareWeight,
          this.profile.CylinderDiameter);
      });
    }
  }

  async recalculateLayersAndSave() {
    this.recalculateLayers();
    await this.registrationService.saveRegistration(this.reg);
  }

  getWaterEquivalent(density: number, depth: number) {
    return HydrologyHelper.calculateWaterEquivalent(density, depth);
  }

}
