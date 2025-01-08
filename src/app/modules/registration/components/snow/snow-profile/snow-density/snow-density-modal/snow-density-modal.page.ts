import { Component, OnInit, NgZone, OnDestroy, inject, input } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { SnowDensityLayerModel } from 'src/app/modules/common-regobs-api/models';
import { SnowDensityLayerModalPage } from '../snow-density-layer-modal/snow-density-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { HydrologyHelper } from '../../../../../../../core/helpers/hydrology-helper';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { NumericInputComponent } from '../../../../numeric-input/numeric-input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MetersToCmPipe } from '../../../../../pipes/meters-to-cm.pipe';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-snow-density-modal',
  templateUrl: './snow-density-modal.page.html',
  styleUrls: ['./snow-density-modal.page.scss'],
  imports: [
    DecimalPipe,
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonReorder,
    IonReorderGroup,
    IonRow,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar,
    MetersToCmPipe,
    NgFor,
    NgIf,
    NumericInputComponent,
    TranslatePipe,
  ],
})
export class SnowDensityModalPage implements OnInit, OnDestroy {
  private modalController = inject(ModalController);
  private draftRepository = inject(DraftRepositoryService);
  private ngZone = inject(NgZone);

  uuid = input.required<string>();
  useCylinder?: boolean;
  private layerModal?: HTMLIonModalElement;
  private ngDestroy$ = new Subject<void>();
  private draft?: RegistrationDraft;
  private initialDraftClone?: RegistrationDraft;

  get profile() {
    if (
      this.draft?.registration?.SnowProfile2?.SnowDensity &&
      this.draft.registration.SnowProfile2.SnowDensity.length > 0
    ) {
      return this.draft.registration.SnowProfile2.SnowDensity[0];
    }
    return {};
  }

  get hasLayers() {
    if (this.profile?.Layers) {
      return this.profile?.Layers?.length > 0;
    }
    return false;
  }

  constructor() {
    addIcons({ addCircleOutline });
  }

  async ngOnInit() {
    this.draftRepository
      .getDraft$(this.uuid())
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
              this.draft.registration.SnowProfile2.SnowDensity[0].Layers.length === 0 ||
              this.draft.registration.SnowProfile2.SnowDensity[0].Layers.some((l) => !!l.Weight);
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
    if (this.initialDraftClone) {
      await this.draftRepository.save(this.initialDraftClone);
    }
    this.modalController.dismiss();
  }

  addLayerTop() {
    this.addOrEditLayer(0);
  }

  addLayerBottom() {
    this.addOrEditLayer(this.profile.Layers ? this.profile.Layers.length : 0);
  }

  async addOrEditLayer(index: number, layer?: SnowDensityLayerModel) {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: SnowDensityLayerModalPage,
        componentProps: {
          draft: this.draft,
          layer: layer,
          useCylinder: this.useCylinder,
          cylinderDiameterInM: this.profile.CylinderDiameter,
          tareWeight: this.profile.TareWeight,
          index,
        },
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = undefined;
      this.recalculateLayers();
    }
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>) {
    if (this.profile.Layers) {
      this.profile.Layers = ArrayHelper.reorderList(this.profile.Layers, event.detail.from, event.detail.to);
    }
    event.detail.complete();
  }

  recalculateLayers() {
    if (this.useCylinder && this.profile.Layers) {
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
    if (this.draft == null) {
      throw new Error('Draft not initialized');
    }
    this.recalculateLayers();
    await this.draftRepository.save(this.draft);
  }

  getWaterEquivalent(density: number, depth: number) {
    return HydrologyHelper.calculateWaterEquivalent(density, depth);
  }
}
