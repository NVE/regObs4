import { Component, inject, input, computed, linkedSignal } from '@angular/core';
import { AvalancheEvalProblem2EditModel } from 'src/app/modules/common-regobs-api/models';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { HeaderColorDirective } from '../../../../../shared/directives/header-color/header-color.directive';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KdvSelectComponent } from '../../../../../../components/kdv-select/kdv-select.component';
import { ExposedHeightComponent } from '../../../../components/snow/exposed-height/exposed-height.component';
import { ValidExpositionComponent } from '../../../../components/snow/valid-exposition/valid-exposition.component';
import { TextCommentComponent } from '../../../../components/text-comment/text-comment.component';
import { ModalSaveOrDeleteButtonsComponent } from '../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isEmpty } from 'src/app/modules/common-core/helpers';

const NO_WEAK_LAYER_KDV_VALUE = 24;

enum Attribute {
  Light = 1,
  Thin = 2,
  Soft = 4,
  Crystal = 8,
}

interface AvalancheProblemKeys {
  AvalancheExtTID: number;
  AvalCauseTID: number;
}

/**
 * Modal for å legge til ett enkelt skredproblem.
 *
 * NB: Noen av valgene i skjemaet styres dynamisk av tabellen AvalCauseAttributeFlags.
 * De valgene som har "IsActive" satt til 1 vil vises i skjemaet.
 */
@Component({
  selector: 'app-avalanche-problem-modal',
  templateUrl: './avalanche-problem-modal.page.html',
  styleUrls: ['./avalanche-problem-modal.page.scss'],
  imports: [
    ExposedHeightComponent,
    FormsModule,
    HeaderColorDirective,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonTitle,
    IonToolbar,
    KdvSelectComponent,
    ModalSaveOrDeleteButtonsComponent,
    NgIf,
    TextCommentComponent,
    TranslatePipe,
    ValidExpositionComponent,
  ],
})
export class AvalancheProblemModalPage {
  private modalController = inject(ModalController);
  private kdvService = inject(KdvService);

  readonly avalancheEvalProblem = input<AvalancheEvalProblem2EditModel>();

  // Form inputs
  avalCauseTid = linkedSignal(() => this.avalancheEvalProblem()?.AvalCauseTID);
  avalTriggerSimpleTid = linkedSignal(() => this.avalancheEvalProblem()?.AvalTriggerSimpleTID);
  destructiveSizeTid = linkedSignal(() => this.avalancheEvalProblem()?.DestructiveSizeTID);
  avalPropagationTid = linkedSignal(() => this.avalancheEvalProblem()?.AvalPropagationTID);
  exposedHeightComboTid = linkedSignal(() => this.avalancheEvalProblem()?.ExposedHeightComboTID);
  exposedHeight1 = linkedSignal(() => this.avalancheEvalProblem()?.ExposedHeight1);
  exposedHeight2 = linkedSignal(() => this.avalancheEvalProblem()?.ExposedHeight2);
  validExposition = linkedSignal(() => this.avalancheEvalProblem()?.ValidExposition);
  comment = linkedSignal(() => this.avalancheEvalProblem()?.Comment);
  avalCauseDepthTid = linkedSignal(() => {
    if (this.noWeakLayers()) {
      return undefined;
    }
    return this.avalancheEvalProblem()?.AvalCauseDepthTID;
  });
  hasLargeCrystal = linkedSignal(() => {
    if (this.noWeakLayers()) {
      return false;
    }
    return this.avalancheEvalProblem()?.AvalCauseAttributeCrystalTID === Attribute.Crystal;
  });
  hasEasyCollapse = linkedSignal(() => {
    if (this.noWeakLayers()) {
      return false;
    }
    return this.avalancheEvalProblem()?.AvalCauseAttributeLightTID === Attribute.Light;
  });
  hasSoftLayerAbove = linkedSignal(() => {
    if (this.noWeakLayers()) {
      return false;
    }
    return this.avalancheEvalProblem()?.AvalCauseAttributeSoftTID === Attribute.Soft;
  });
  avalancheExt = linkedSignal(() => {
    const value = this.avalancheEvalProblem()?.AvalancheExtTID;
    if (value == null) {
      return value;
    }

    // Hvis filter endrer seg, reset avalancheExt om nødvendig
    const filter = this.avalancheExtKdvFilter();
    return filter(value) ? value : undefined;
  });

  easyCollapseLabel = computed(() => this.attributeFlags()?.find((kdv) => kdv.Id === Attribute.Light)?.Name);
  softLayerLabel = computed(() => this.attributeFlags()?.find((kdv) => kdv.Id === Attribute.Soft)?.Name);
  largeCrystalLabel = computed(() => this.attributeFlags()?.find((kdv) => kdv.Id === Attribute.Crystal)?.Name);
  noWeakLayers = computed(() => this.avalCauseTid() === NO_WEAK_LAYER_KDV_VALUE);
  isNew = computed(() => !isEmpty(this.avalancheEvalProblem()));
  avalancheExtKdvFilter = computed(() => {
    const avalCauseTid = this.avalCauseTid();
    const extTids = (this.avalancheProblemView() || [])
      .filter((v) => v.AvalCauseTID === avalCauseTid)
      .map((v) => v.AvalancheExtTID);

    return (tid: number) => extTids.indexOf(tid) >= 0;
  });

  toggleNoWeakLayers() {
    this.avalCauseTid.update((tid) => (tid === NO_WEAK_LAYER_KDV_VALUE ? undefined : NO_WEAK_LAYER_KDV_VALUE));
  }

  cancel() {
    this.modalController.dismiss();
  }

  ok() {
    const edit = this.getEdit();
    if (isEmpty(edit)) {
      this.modalController.dismiss({ delete: true });
    } else {
      this.modalController.dismiss(edit);
    }
  }

  delete() {
    this.modalController.dismiss({ delete: true });
  }

  private getEdit(): AvalancheEvalProblem2EditModel {
    return {
      AvalCauseTID: this.avalCauseTid(),
      AvalCauseDepthTID: this.avalCauseDepthTid(),
      AvalancheExtTID: this.avalancheExt(),
      AvalTriggerSimpleTID: this.avalTriggerSimpleTid(),
      DestructiveSizeTID: this.destructiveSizeTid(),
      AvalPropagationTID: this.avalPropagationTid(),
      ExposedHeightComboTID: this.exposedHeightComboTid(),
      ExposedHeight1: this.exposedHeight1(),
      ExposedHeight2: this.exposedHeight2(),
      ValidExposition: this.validExposition(),
      Comment: this.comment(),

      // Attributes / flags. For these to be set they need to contain the correct "bit", 1, 2, 4 or 8
      AvalCauseAttributeLightTID: this.hasEasyCollapse() ? Attribute.Light : undefined,
      AvalCauseAttributeSoftTID: this.hasSoftLayerAbove() ? Attribute.Soft : undefined,
      AvalCauseAttributeCrystalTID: this.hasLargeCrystal() ? Attribute.Crystal : undefined,
    };
  }

  private attributeFlags = toSignal(this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalCauseAttributeFlags'));

  private avalancheProblemView = toSignal(
    this.kdvService.getViewRepositoryByKeyObservable('AvalancheProblemMenu3V') as Observable<AvalancheProblemKeys[]>
  );
}
