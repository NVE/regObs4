import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { injectKdv } from 'src/app/modules/common-registration/services/kdv/inject-kdv';
import { AvalancheEvalProblem2ViewModel } from 'src/app/modules/common-regobs-api';
import { KeyValueComponent } from '../../key-value/key-value.component';
import { ExposedHeightComponent } from '../../graphics/exposed-height/exposed-height.component';
import { ExpositionComponent } from '../../graphics/exposition/exposition.component';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-avalanche-problem-view',
  imports: [TranslatePipe, KeyValueComponent, ExposedHeightComponent, ExpositionComponent, IonText],
  templateUrl: './avalanche-problem-view.component.html',
  styleUrl: './avalanche-problem-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Brukes i observasjonskort for å vise ett skredproblem */
export class AvalancheProblemViewComponent {
  data = input.required<AvalancheEvalProblem2ViewModel>();

  private avalancheCauseDepthKdv = injectKdv('Snow_AvalCauseDepthKDV');
  private avalancheCauseKdv = injectKdv('Snow_AvalCauseKDV');
  private avalancheTypeKdv = injectKdv('Snow_AvalancheExtKDV');
  private avalancheTriggerKdv = injectKdv('Snow_AvalTriggerSimpleKDV');
  private attributeFlagsKdv = injectKdv('Snow_AvalCauseAttributeFlags');
  private avalancheProbabilityKdv = injectKdv('Snow_AvalProbabilityKDV');
  private sizeKdv = injectKdv('Snow_DestructiveSizeKDV');
  private propagationKdv = injectKdv('Snow_AvalPropagationKDV');

  private causeTid = computed(() => this.data().AvalCauseTID);
  private causeDepthTid = computed(() => this.data().AvalCauseDepthTID);
  private typeTid = computed(() => this.data().AvalancheExtTID);
  private triggerSimpleTid = computed(() => this.data().AvalTriggerSimpleTID);
  private causeLightTid = computed(() => this.data().AvalCauseAttributeLightTID);
  private causeSoftTid = computed(() => this.data().AvalCauseAttributeSoftTID);
  private causeCrystalTid = computed(() => this.data().AvalCauseAttributeCrystalTID);
  private probabilityTid = computed(() => this.data().AvalProbabilityTID);
  private sizeTid = computed(() => this.data().DestructiveSizeTID);
  private propagationTid = computed(() => this.data().AvalPropagationTID);

  cause = this.avalancheCauseKdv.getName(this.causeTid);
  causeDepth = this.avalancheCauseDepthKdv.getName(this.causeDepthTid);
  type = this.avalancheTypeKdv.getName(this.typeTid);
  triggerProbability = this.avalancheTriggerKdv.getName(this.triggerSimpleTid);
  probability = this.avalancheProbabilityKdv.getName(this.probabilityTid);
  easyCollapseLabel = this.attributeFlagsKdv.getName(this.causeLightTid);
  softLayerLabel = this.attributeFlagsKdv.getName(this.causeSoftTid);
  largeCrystalLabel = this.attributeFlagsKdv.getName(this.causeCrystalTid);
  propagation = this.propagationKdv.getName(this.propagationTid);
  size = this.sizeKdv.getName(this.sizeTid);
  exposedHeightComboTid = computed(() => this.data().ExposedHeightComboTID);
  exposedHeight1 = computed(() => this.data().ExposedHeight1);
  exposedHeight2 = computed(() => this.data().ExposedHeight2);
  exposition = computed(() => this.data().ValidExposition || '');
  comment = computed(() => this.data().Comment);
}
