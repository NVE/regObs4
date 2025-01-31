import { Component, inject, computed, input, effect, linkedSignal } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { StratProfileLayerEditModel } from 'src/app/modules/common-regobs-api/models';
import { StratProfileLayerModalPage } from '../strat-profile-layer-modal/strat-profile-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { StratProfileLayerHistoryModalPage } from '../strat-profile-layer-history-modal/strat-profile-layer-history-modal.page';
import { RegobsAuthService } from '../../../../../../auth/services/regobs-auth.service';
import { HeaderColorDirective } from '../../../../../../shared/directives/header-color/header-color.directive';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { KdvDescriptionPipe } from '../../../../../pipes/kdv-description.pipe';
import { MetersToCmPipe } from '../../../../../pipes/meters-to-cm.pipe';
import { addIcons } from 'ionicons';
import { cloudDownload, addCircleOutline } from 'ionicons/icons';
import { calculateTotalThickness } from '../strat-profile-helpers';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { toSignal } from '@angular/core/rxjs-interop';
import cloneDeep from 'clone-deep';
import { ArrayHelper } from 'src/app/core/helpers/array-helper';

/**
 * Add layers, drag to change layer ordering, fetch layers from other profiles.
 */
@Component({
  selector: 'app-strat-profile-modal',
  templateUrl: './strat-profile-modal.page.html',
  styleUrls: ['./strat-profile-modal.page.scss'],
  imports: [
    AsyncPipe,
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
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonReorder,
    IonReorderGroup,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    KdvDescriptionPipe,
    MetersToCmPipe,
    NgFor,
    NgIf,
    TranslatePipe,
  ],
})
export class StratProfileModalPage {
  private modalController = inject(ModalController);
  private regobsAuthService = inject(RegobsAuthService);
  private draftRepository = inject(DraftRepositoryService);

  uuid = input.required<string>();
  draft = toSignal(this.draftRepository.getDraft$(this.uuid()));

  layers = linkedSignal(() => this.draft()?.registration.SnowProfile2?.StratProfile?.Layers || []);
  hasLayers = computed(() => this.layers().length > 0);
  totalThickness = computed(() => calculateTotalThickness(this.layers()));

  private layerModal?: HTMLIonModalElement | null;

  private draftInitClone?: RegistrationDraft;

  constructor() {
    addIcons({ cloudDownload, addCircleOutline });
    effect(() => {
      const draft = this.draft();
      if (draft != null && this.draftInitClone == null) {
        this.draftInitClone = cloneDeep(draft);
      }
    });
  }

  getDraftUpdate(): RegistrationDraft {
    const draftInput = this.draft();
    if (draftInput == null) {
      throw new Error('No draft found');
    }
    return {
      ...draftInput,
      registration: {
        ...draftInput.registration,
        SnowProfile2: {
          ...(draftInput.registration.SnowProfile2 || {}),
          StratProfile: {
            ...(draftInput.registration.SnowProfile2?.StratProfile || {}),
            Layers: this.layers(),
          },
        },
      },
    };
  }

  async ok(): Promise<void> {
    await this.draftRepository.save(this.getDraftUpdate());
    this.modalController.dismiss();
  }

  async cancel(): Promise<void> {
    if (this.draftInitClone) {
      await this.draftRepository.save(this.draftInitClone); // Reset to inital state
    }
    this.modalController.dismiss();
  }

  addLayerTop(): void {
    this.addOrEditLayer(0);
  }

  addLayerBottom(): void {
    this.addOrEditLayer(this.layers().length);
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    this.layers.update((value) => ArrayHelper.reorderList(value, event.detail.from, event.detail.to));
    event.detail.complete();
    this.draftRepository.save(this.getDraftUpdate());
  }

  async getPrevousUsedLayers(): Promise<void> {
    const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
    if (loggedInUser?.isLoggedIn) {
      if (!this.layerModal) {
        this.layerModal = await this.modalController.create({
          component: StratProfileLayerHistoryModalPage,
          componentProps: {
            draft: this.draft,
          },
        });
        this.layerModal.present();
        await this.layerModal.onDidDismiss();
        this.layerModal = null;
      }
    } else {
      this.regobsAuthService.signIn(); //TODO: Denne redirecter tilbake til snøprofil-sida
    }
  }

  async addOrEditLayer(index: number): Promise<void> {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: StratProfileLayerModalPage,
        componentProps: {
          draft: this.getDraftUpdate(),
          index,
        },
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
    }
  }
}
