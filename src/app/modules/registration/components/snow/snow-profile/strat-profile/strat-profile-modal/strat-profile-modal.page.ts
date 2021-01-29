import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  StratProfileDto,
  StratProfileLayerDto
} from '../../../../../../regobs-api/models';
import { StratProfileLayerModalPage } from '../strat-profile-layer-modal/strat-profile-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { StratProfileLayerHistoryModalPage } from '../strat-profile-layer-history-modal/strat-profile-layer-history-modal.page';
import { IRegistration } from '../../../../../models/registration.model';
import { RegistrationService } from '../../../../../services/registration.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import cloneDeep from 'clone-deep';
import { RegobsAuthService } from '../../../../../../auth/services/regobs-auth.service';

@Component({
  selector: 'app-strat-profile-modal',
  templateUrl: './strat-profile-modal.page.html',
  styleUrls: ['./strat-profile-modal.page.scss']
})
export class StratProfileModalPage implements OnInit, OnDestroy {
  @Input() regId: string;

  reg: IRegistration;

  private regInitClone: IRegistration;
  totalThickness: number;

  private ngDestroy$ = new Subject();

  private layerModal;

  get hasLayers() {
    return this.profile.Layers && this.profile.Layers.length > 0;
  }

  get profile(): StratProfileDto {
    if (
      this.reg &&
      this.reg.request &&
      this.reg.request.SnowProfile2 &&
      this.reg.request.SnowProfile2.StratProfile
    ) {
      return this.reg.request.SnowProfile2.StratProfile;
    }
    return {};
  }

  constructor(
    private modalController: ModalController,
    private regobsAuthService: RegobsAuthService,
    private ngZone: NgZone,
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.registrationService
      .getSavedRegistrationByIdObservable(this.regId)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((reg) => {
        this.ngZone.run(() => {
          if (!this.regInitClone) {
            this.regInitClone = cloneDeep(reg);
          }
          this.reg = reg;
          this.calculate();
        });
      });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  async ok() {
    await this.registrationService.saveRegistrationAsync(this.reg);
    this.modalController.dismiss();
  }

  async cancel() {
    await this.registrationService.saveRegistrationAsync(this.regInitClone); // Reset to inital state
    this.modalController.dismiss();
  }

  addLayerTop() {
    this.addOrEditLayer(0, undefined);
  }

  addLayerBottom() {
    this.addOrEditLayer(
      this.hasLayers
        ? this.reg.request.SnowProfile2.StratProfile.Layers.length
        : 0,
      undefined
    );
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.reg.request.SnowProfile2.StratProfile.Layers = ArrayHelper.reorderList(
      this.reg.request.SnowProfile2.StratProfile.Layers,
      event.detail.from,
      event.detail.to
    );
    event.detail.complete();
    this.registrationService.saveRegistrationAsync(this.reg);
  }

  async getPrevousUsedLayers() {
    const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
    if (loggedInUser && loggedInUser.isLoggedIn) {
      if (!this.layerModal) {
        this.layerModal = await this.modalController.create({
          component: StratProfileLayerHistoryModalPage,
          componentProps: {
            reg: this.reg,
            observerGuid: loggedInUser.user.Guid
          }
        });
        this.layerModal.present();
        await this.layerModal.onDidDismiss();
        this.layerModal = null;
        this.calculate();
      }
    } else {
      this.regobsAuthService.signIn();
    }
  }

  async addOrEditLayer(index: number, layer: StratProfileLayerDto) {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: StratProfileLayerModalPage,
        componentProps: {
          reg: this.reg,
          layer,
          index
        }
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
    }
  }

  private calculate() {
    const layers = this.profile.Layers || [];
    const sum = layers
      .filter((x) => x.Thickness !== undefined)
      .map((layer) => layer.Thickness)
      .reduce((pv, cv) => pv + cv, 0);
    this.totalThickness = sum;
  }
}
