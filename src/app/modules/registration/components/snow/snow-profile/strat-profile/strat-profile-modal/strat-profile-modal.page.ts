import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  StratProfileEditModel,
  StratProfileLayerEditModel
} from 'src/app/modules/common-regobs-api/models';
import { StratProfileLayerModalPage } from '../strat-profile-layer-modal/strat-profile-layer-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';
import { ArrayHelper } from '../../../../../../../core/helpers/array-helper';
import { StratProfileLayerHistoryModalPage } from '../strat-profile-layer-history-modal/strat-profile-layer-history-modal.page';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import cloneDeep from 'clone-deep';
import { RegobsAuthService } from '../../../../../../auth/services/regobs-auth.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';

/**
 * Add layers, drag to change layer ordering, fetch layers from other profiles.
 */
@Component({
  selector: 'app-strat-profile-modal',
  templateUrl: './strat-profile-modal.page.html',
  styleUrls: ['./strat-profile-modal.page.scss']
})
export class StratProfileModalPage implements OnInit, OnDestroy {
  @Input() uuid: string;
  private draft: RegistrationDraft;
  private draftInitClone: RegistrationDraft;
  totalThickness: Observable<number>;
  private ngDestroy$ = new Subject<void>();
  private layerModal: HTMLIonModalElement;

  get hasLayers(): boolean {
    return this.profile.Layers?.length > 0;
  }

  get profile(): StratProfileEditModel {
    return this.draft?.registration?.SnowProfile2?.StratProfile || {};
  }

  constructor(
    private modalController: ModalController,
    private regobsAuthService: RegobsAuthService,
    private ngZone: NgZone,
    private draftRepository: DraftRepositoryService,
  ) {}

  ngOnInit(): void {
    this.draftRepository
      .getDraft$(this.uuid)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((draft) => {
        this.ngZone.run(() => {
          if (!this.draftInitClone) {
            this.draftInitClone = cloneDeep(draft);
          }
          this.draft = draft;
        });
      });

    this.totalThickness = this.draftRepository.getDraft$(this.uuid)
      .pipe(
        takeUntil(this.ngDestroy$),
        map(draft => this.calculateTotalThickness(draft))
      );
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  async ok(): Promise<void> {
    await this.draftRepository.save(this.draft);
    this.modalController.dismiss();
  }

  async cancel(): Promise<void> {
    await this.draftRepository.save(this.draftInitClone); // Reset to inital state
    this.modalController.dismiss();
  }

  addLayerTop(): void {
    this.addOrEditLayer(0, undefined);
  }

  addLayerBottom(): void {
    this.addOrEditLayer(
      this.hasLayers
        ? this.draft.registration.SnowProfile2.StratProfile.Layers.length
        : 0,
      undefined
    );
  }

  onLayerReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    this.draft.registration.SnowProfile2.StratProfile.Layers = ArrayHelper.reorderList(
      this.draft.registration.SnowProfile2.StratProfile.Layers,
      event.detail.from,
      event.detail.to
    );
    event.detail.complete();
    this.draftRepository.save(this.draft);
  }

  async getPrevousUsedLayers(): Promise<void> {
    const loggedInUser = await this.regobsAuthService.getLoggedInUserAsPromise();
    if (loggedInUser?.isLoggedIn) {
      if (!this.layerModal) {
        this.layerModal = await this.modalController.create({
          component: StratProfileLayerHistoryModalPage,
          componentProps: {
            draft: this.draft
          }
        });
        this.layerModal.present();
        await this.layerModal.onDidDismiss();
        this.layerModal = null;
      }
    } else {
      this.regobsAuthService.signIn(); //TODO: Denne redirecter tilbake til snøprofil-sida
    }
  }

  async addOrEditLayer(index: number, layer: StratProfileLayerEditModel): Promise<void> {
    if (!this.layerModal) {
      this.layerModal = await this.modalController.create({
        component: StratProfileLayerModalPage,
        componentProps: {
          draft: this.draft,
          layer,
          index
        }
      });
      this.layerModal.present();
      await this.layerModal.onDidDismiss();
      this.layerModal = null;
    }
  }

  private calculateTotalThickness(draft: RegistrationDraft): number {
    const layers = draft?.registration?.SnowProfile2?.StratProfile?.Layers || [];
    const sum = layers
      .filter((x) => x.Thickness !== undefined)
      .map((layer) => layer.Thickness)
      .reduce((pv, cv) => pv + cv, 0);
    return sum;
  }
}
