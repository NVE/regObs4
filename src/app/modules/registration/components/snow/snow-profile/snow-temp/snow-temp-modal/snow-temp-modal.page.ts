import { Component, computed, effect, inject, input } from '@angular/core';
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
  IonRow,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { SnowTempLayerModalPage } from '../snow-temp-layer-modal/snow-temp-layer-modal.page';
import cloneDeep from 'clone-deep';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MetersToCmPipe } from '../../../../../pipes/meters-to-cm.pipe';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { getDraftSignal } from 'src/app/core/services/draft/draft-signal';

@Component({
  selector: 'app-snow-temp-modal',
  templateUrl: './snow-temp-modal.page.html',
  styleUrls: ['./snow-temp-modal.page.scss'],
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
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    IonTitle,
    IonToolbar,
    MetersToCmPipe,
    NgIf,
    TranslatePipe,
  ],
})
export class SnowTempModalPage {
  private modalController = inject(ModalController);
  private draftRepo = inject(DraftRepositoryService);

  readonly uuid = input.required<string>();
  private draft = getDraftSignal(this.uuid);
  layers = computed(() => this.draft()?.registration.SnowProfile2?.SnowTemp?.Layers || []);
  layerModal?: HTMLIonModalElement | null;
  backup?: RegistrationDraft;

  constructor() {
    addIcons({ addCircleOutline });
    effect(() => {
      if (this.backup == null) {
        const draft = this.draft();
        if (draft) {
          this.backup = cloneDeep(draft);
        }
      }
    });
  }

  ok() {
    this.modalController.dismiss();
  }

  async cancel() {
    if (this.backup) {
      await this.draftRepo.save(this.backup);
    }
    this.modalController.dismiss();
  }

  addLayerBottom() {
    this.addOrEditLayer(this.layers().length);
  }

  async addOrEditLayer(index: number) {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: SnowTempLayerModalPage,
        componentProps: {
          uuid: this.uuid(),
          index,
        },
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
    }
  }
}
