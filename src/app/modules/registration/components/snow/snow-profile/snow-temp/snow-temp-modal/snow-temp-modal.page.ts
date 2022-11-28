import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { SnowTempObsModel } from 'src/app/modules/common-regobs-api/models';
import { ModalController } from '@ionic/angular';
import { SnowTempLayerModalPage } from '../snow-temp-layer-modal/snow-temp-layer-modal.page';
import cloneDeep from 'clone-deep';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-snow-temp-modal',
  templateUrl: './snow-temp-modal.page.html',
  styleUrls: ['./snow-temp-modal.page.scss'],
})
export class SnowTempModalPage implements OnInit, OnDestroy {
  @Input() uuid: string;
  private layerModal: HTMLIonModalElement;
  private initialRegistrationClone: RegistrationDraft;
  private draft: RegistrationDraft;

  private ngDestroy$ = new Subject<void>();

  get tempProfile() {
    if (this.draft?.registration?.SnowProfile2?.SnowTemp) {
      return this.draft.registration.SnowProfile2.SnowTemp;
    }
    return {};
  }

  get hasLayers() {
    return this.tempProfile?.Layers?.length > 0;
  }

  constructor(
    private modalController: ModalController,
    private draftRepository: DraftRepositoryService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.draftRepository
      .getDraft$(this.uuid)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((draft) => {
        this.ngZone.run(() => {
          if (!this.initialRegistrationClone) {
            this.initialRegistrationClone = cloneDeep(draft);
          }
          this.draft = draft;
          if (!this.draft.registration.SnowProfile2) {
            this.draft.registration.SnowProfile2 = {};
          }
          if (!this.draft.registration.SnowProfile2.SnowTemp) {
            this.draft.registration.SnowProfile2.SnowTemp = {};
          }
          if (!this.draft.registration.SnowProfile2.SnowTemp.Layers) {
            this.draft.registration.SnowProfile2.SnowTemp.Layers = [];
          }
          this.sortLayers();
        });
      });
    this.initialRegistrationClone = cloneDeep(this.draft);
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  ok() {
    this.modalController.dismiss(this.tempProfile);
  }

  async cancel() {
    await this.draftRepository.save(this.initialRegistrationClone);
    this.modalController.dismiss();
  }

  addLayerBottom() {
    this.addOrEditLayer(this.hasLayers ? this.tempProfile.Layers.length : 0, undefined);
  }

  async addOrEditLayer(index: number, layer: SnowTempObsModel) {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: SnowTempLayerModalPage,
        componentProps: {
          draft: this.draft,
          layer,
          index,
        },
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
      this.sortLayers();
    }
  }

  private sortLayers() {
    if (this.tempProfile && this.tempProfile.Layers) {
      this.tempProfile.Layers = this.tempProfile.Layers.sort((a, b) => a.Depth - b.Depth);
    }
  }
}
