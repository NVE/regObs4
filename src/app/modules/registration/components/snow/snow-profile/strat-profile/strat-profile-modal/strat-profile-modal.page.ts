import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  StratProfileEditModel,
  StratProfileLayerEditModel
} from '@varsom-regobs-common/regobs-api';
import { StratProfileLayerModalPage } from '../strat-profile-layer-modal/strat-profile-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { StratProfileLayerHistoryModalPage } from '../strat-profile-layer-history-modal/strat-profile-layer-history-modal.page';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { RegistrationService as CommonRegistrationService } from 'src/app/modules/common-registration/registration.services';
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

  private ngDestroy$ = new Subject<void>();

  private layerModal: HTMLIonModalElement;

  get hasLayers(): boolean {
    return this.profile.Layers && this.profile.Layers.length > 0;
  }

  get profile(): StratProfileEditModel {
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
    private registrationService: RegistrationService,
    private commonRegistrationService: CommonRegistrationService,
  ) {}

  ngOnInit(): void {
    this.commonRegistrationService
      .getRegistrationByIdShared$(this.regId)
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

  async ok(): Promise<void> {
    await this.registrationService.saveRegistrationAsync(this.reg);
    this.modalController.dismiss();
  }

  async cancel(): Promise<void> {
    await this.registrationService.saveRegistrationAsync(this.regInitClone); // Reset to inital state
    this.modalController.dismiss();
  }

  addLayerTop(): void {
    this.addOrEditLayer(0, undefined);
  }

  addLayerBottom(): void {
    this.addOrEditLayer(
      this.hasLayers
        ? this.reg.request.SnowProfile2.StratProfile.Layers.length
        : 0,
      undefined
    );
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    this.reg.request.SnowProfile2.StratProfile.Layers = ArrayHelper.reorderList(
      this.reg.request.SnowProfile2.StratProfile.Layers,
      event.detail.from,
      event.detail.to
    );
    event.detail.complete();
    this.registrationService.saveRegistrationAsync(this.reg);
  }

  async getPrevousUsedLayers(): Promise<void> {
    const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
    if (loggedInUser && loggedInUser.isLoggedIn) {
      if (!this.layerModal) {
        this.layerModal = await this.modalController.create({
          component: StratProfileLayerHistoryModalPage,
          componentProps: {
            reg: this.reg
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

  async addOrEditLayer(index: number, layer: StratProfileLayerEditModel): Promise<void> {
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

  private calculate(): void {
    const layers = this.profile.Layers || [];
    const sum = layers
      .filter((x) => x.Thickness !== undefined)
      .map((layer) => layer.Thickness)
      .reduce((pv, cv) => pv + cv, 0);
    this.totalThickness = sum;
  }
}
