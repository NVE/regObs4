import { Component, computed, inject, input } from '@angular/core';
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
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MetersToCmPipe } from '../../../../../pipes/meters-to-cm.pipe';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { injectBackupHandler } from 'src/app/core/helpers/inject-backup-handler';

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
  private draft = this.draftRepo.getDraftSignal(this.uuid);
  private backupHandler = injectBackupHandler({ uuid: this.uuid });

  layers = computed(() => this.draft()?.registration.SnowProfile2?.SnowTemp?.Layers || []);
  layerModal?: HTMLIonModalElement | null;

  constructor() {
    addIcons({ addCircleOutline });
  }

  ok() {
    this.modalController.dismiss();
  }

  async cancel() {
    if (await this.backupHandler.confirmCancel()) {
      await this.backupHandler.restoreBackup();
      this.modalController.dismiss();
    }
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
