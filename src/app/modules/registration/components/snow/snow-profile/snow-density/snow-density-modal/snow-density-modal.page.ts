import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SnowDensityLayerModel } from 'src/app/modules/common-regobs-api/models';
import { SnowDensityLayerModalPage } from '../snow-density-layer-modal/snow-density-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';
import { RegistrationService } from '../../../../../services/registration.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

@Component({
  selector: 'app-snow-density-modal',
  templateUrl: './snow-density-modal.page.html',
  styleUrls: ['./snow-density-modal.page.scss']
})
export class SnowDensityModalPage implements OnInit, OnDestroy {
  @Input() uuid: string;
  useCylinder: boolean;
  private layerModal: HTMLIonModalElement;
  private ngDestroy$ = new Subject<void>();
  private draft: RegistrationDraft;
  private initialDraftClone: RegistrationDraft;

  get profile() {
    if (this.draft?.registration?.SnowProfile2?.SnowDensity?.length > 0) {
      return this.draft.registration.SnowProfile2.SnowDensity[0];
    }
    return {};
  }

  get hasLayers() {
    return this.profile?.Layers?.length > 0;
  }

  constructor(
    private modalController: ModalController,
    private draftRepository: DraftRepositoryService,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    this.draftRepository
      .getDraft$(this.uuid)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((reg) => {
        this.ngZone.run(async () => {
          if (!this.initialDraftClone) {
            this.initialDraftClone = cloneDeep(reg);
          }
          this.draft = reg;
          if (!this.draft.registration.SnowProfile2) {
            this.draft.registration.SnowProfile2 = {};
          }
          if (!this.draft.registration.SnowProfile2.SnowDensity) {
            this.draft.registration.SnowProfile2.SnowDensity = [];
          }
          if (!this.draft.registration.SnowProfile2.SnowDensity[0]) {
            this.draft.registration.SnowProfile2.SnowDensity[0] = {};
          }
          if (!this.draft.registration.SnowProfile2.SnowDensity[0].Layers) {
            this.draft.registration.SnowProfile2.SnowDensity[0].Layers = [];
          }
          if (this.useCylinder === undefined) {
            this.useCylinder =
              !!this.draft.registration.SnowProfile2.SnowDensity[0].CylinderDiameter ||
              !!this.draft.registration.SnowProfile2.SnowDensity[0].TareWeight ||
              this.draft.registration.SnowProfile2.SnowDensity[0].Layers.length ===
                0 ||
              this.draft.registration.SnowProfile2.SnowDensity[0].Layers.some(
                (l) => !!l.Weight
              );
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
    await this.draftRepository.save(this.initialDraftClone);
    this.modalController.dismiss();
  }

  addLayerTop() {
    this.addOrEditLayer(0, undefined);
  }

  addLayerBottom() {
    this.addOrEditLayer(
      this.hasLayers ? this.profile.Layers.length : 0,
      undefined
    );
  }

  async addOrEditLayer(index: number, layer: SnowDensityLayerModel) {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: SnowDensityLayerModalPage,
        componentProps: {
          draft: this.draft,
          layer: layer,
          useCylinder: this.useCylinder,
          cylinderDiameterInM: this.profile.CylinderDiameter,
          tareWeight: this.profile.TareWeight,
          index
        }
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
      this.recalculateLayers();
    }
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.profile.Layers = ArrayHelper.reorderList(
      this.profile.Layers,
      event.detail.from,
      event.detail.to
    );
    event.detail.complete();
  }

  recalculateLayers() {
    if (this.useCylinder && this.hasLayers) {
      this.profile.Layers.forEach((layer: SnowDensityLayerModel) => {
        layer.Density = HydrologyHelper.calculateDensity(
          layer.Weight,
          layer.Thickness,
          this.profile.TareWeight,
          this.profile.CylinderDiameter
        );
      });
    }
  }

  async recalculateLayersAndSave() {
    this.recalculateLayers();
    await this.draftRepository.save(this.draft);
  }

  getWaterEquivalent(density: number, depth: number) {
    return HydrologyHelper.calculateWaterEquivalent(density, depth);
  }
}
