import { Component, computed, effect, inject, input, linkedSignal, Signal } from '@angular/core';
import { SnowTempObsModel } from 'src/app/modules/common-regobs-api';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { isEmpty } from 'src/app/modules/common-core/helpers';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NumericInputComponent } from '../../../../numeric-input/numeric-input.component';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, trash } from 'ionicons/icons';
import { getDraftSignal } from 'src/app/core/services/draft/draft-signal';
import { addOrUpdateValueByIndex, sortByNumberProp } from 'src/app/modules/common-core/helpers/arrays';

@Component({
  selector: 'app-snow-temp-layer-modal',
  templateUrl: './snow-temp-layer-modal.page.html',
  styleUrls: ['./snow-temp-layer-modal.page.scss'],
  imports: [
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    NgIf,
    NumericInputComponent,
    TranslatePipe,
  ],
})
export class SnowTempLayerModalPage {
  private modalController = inject(ModalController);
  private draftRepository = inject(DraftRepositoryService);

  readonly index = input.required<number>();
  readonly uuid = input.required<string>();

  draft = getDraftSignal(this.uuid);
  layers = computed(() => this.draft()?.registration.SnowProfile2?.SnowTemp?.Layers || []);
  currentIndex = linkedSignal(() => this.index());
  isNew = computed(() => this.currentIndex() >= this.layers().length);
  layer: Signal<SnowTempObsModel | undefined> = computed(() => this.layers()[this.currentIndex()]);

  // Input values
  temp = linkedSignal(() => this.layer()?.SnowTemp);
  depth = linkedSignal(() => this.layer()?.Depth);
  private result: Signal<SnowTempObsModel> = computed(() => ({ SnowTemp: this.temp(), Depth: this.depth() }));

  canGoNext = computed(() => {
    const length = this.layers().length;
    const index = this.currentIndex();
    if (length > 0) {
      return index < length;
    } else {
      return index === length && !isEmpty(this.result());
    }
  });

  backup?: RegistrationDraft;

  constructor() {
    addIcons({ arrowBack, arrowForward, trash });
    effect(() => {
      if (this.backup == null) {
        const draft = this.draft();
        if (draft) {
          this.backup = cloneDeep(draft);
        }
      }
    });
  }

  async ok(gotoIndex?: number) {
    const updatedLayer = this.result();
    const hasChanged = updatedLayer.Depth != this.layer()?.Depth || updatedLayer.SnowTemp != this.layer()?.SnowTemp;
    if (hasChanged) {
      const updatedLayers = this.getUpdatedLayers(updatedLayer);
      await this.saveDraft(updatedLayers);
    }

    if (gotoIndex !== undefined) {
      this.currentIndex.update((i) => i + gotoIndex);
    } else {
      this.modalController.dismiss();
    }
  }

  private async saveDraft(updatedLayers: SnowTempObsModel[]) {
    const draft = this.getDraft(updatedLayers);
    await this.draftRepository.save(draft);
  }

  private getDraft(updatedLayers: SnowTempObsModel[]): RegistrationDraft {
    const draft = this.draft();
    if (!draft) {
      throw new Error('Empty draft');
    }
    return {
      ...draft,
      registration: {
        ...draft.registration,
        SnowProfile2: {
          ...draft.registration.SnowProfile2,
          SnowTemp: {
            ...draft.registration.SnowProfile2?.SnowTemp,
            Layers: updatedLayers,
          },
        },
      },
    };
  }

  private getUpdatedLayers(newOrUpdated: SnowTempObsModel) {
    const layers = this.layers();
    const index = this.currentIndex();
    const updated = addOrUpdateValueByIndex(index, newOrUpdated, layers);
    const sorted = sortByNumberProp(updated, 'Depth');
    return sorted;
  }

  private deleteLayer() {
    const index = this.currentIndex();
    return this.layers().filter((l, i) => i !== index);
  }

  async cancel() {
    if (this.backup) {
      await this.draftRepository.save(this.backup);
    }
    this.modalController.dismiss();
  }

  async delete() {
    const updatedLayers = this.deleteLayer();
    await this.saveDraft(updatedLayers);
    this.modalController.dismiss();
  }
}
