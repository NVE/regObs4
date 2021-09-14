import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import {
  SnowTempObsModel,
} from '@varsom-regobs-common/regobs-api';
import { ModalController } from '@ionic/angular';
import { SnowTempLayerModalPage } from '../snow-temp-layer-modal/snow-temp-layer-modal.page';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService } from '../../../../../services/registration.service';
import { RegistrationService as CommonRegistrationService } from 'src/app/modules/common-registration/registration.services';
import cloneDeep from 'clone-deep';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-snow-temp-modal',
  templateUrl: './snow-temp-modal.page.html',
  styleUrls: ['./snow-temp-modal.page.scss']
})
export class SnowTempModalPage implements OnInit, OnDestroy {
  @Input() regId: string;
  private layerModal: HTMLIonModalElement;
  private initialRegistrationClone: IRegistration;
  private reg: IRegistration;

  private ngDestroy$ = new Subject<void>();

  get tempProfile() {
    if (
      this.reg &&
      this.reg.request &&
      this.reg.request.SnowProfile2 &&
      this.reg.request.SnowProfile2.SnowTemp
    ) {
      return this.reg.request.SnowProfile2.SnowTemp;
    }

    return {};
  }

  get hasLayers() {
    return (
      this.tempProfile &&
      this.tempProfile.Layers &&
      this.tempProfile.Layers.length > 0
    );
  }

  constructor(
    private modalController: ModalController,
    private registrationService: RegistrationService,
    private commonRegistrationService: CommonRegistrationService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.commonRegistrationService
      .getRegistrationByIdShared$(this.regId)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((reg) => {
        this.ngZone.run(() => {
          if (!this.initialRegistrationClone) {
            this.initialRegistrationClone = cloneDeep(reg);
          }
          this.reg = reg;
          if (!this.reg.request.SnowProfile2) {
            this.reg.request.SnowProfile2 = {};
          }
          if (!this.reg.request.SnowProfile2.SnowTemp) {
            this.reg.request.SnowProfile2.SnowTemp = {};
          }
          if (!this.reg.request.SnowProfile2.SnowTemp.Layers) {
            this.reg.request.SnowProfile2.SnowTemp.Layers = [];
          }
          this.sortLayers();
        });
      });
    this.initialRegistrationClone = cloneDeep(this.reg);
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  ok() {
    this.modalController.dismiss(this.tempProfile);
  }

  async cancel() {
    await this.registrationService.saveRegistrationAsync(
      this.initialRegistrationClone
    );
    this.modalController.dismiss();
  }

  addLayerBottom() {
    this.addOrEditLayer(
      this.hasLayers ? this.tempProfile.Layers.length : 0,
      undefined
    );
  }

  async addOrEditLayer(index: number, layer: SnowTempObsModel) {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: SnowTempLayerModalPage,
        componentProps: {
          reg: this.reg,
          layer,
          index
        }
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
      this.sortLayers();
    }
  }

  private sortLayers() {
    if (this.tempProfile && this.tempProfile.Layers) {
      this.tempProfile.Layers = this.tempProfile.Layers.sort(
        (a, b) => a.Depth - b.Depth
      );
    }
  }
}
