import { ChangeDetectionStrategy, Component, computed, input, inject } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { injectKdv } from 'src/app/modules/common-registration/services/kdv/inject-kdv';
import { AvalancheActivityObs2ViewModel } from 'src/app/modules/common-regobs-api';
import { KeyValueComponent } from '../../key-value/key-value.component';
import { ExposedHeightComponent } from '../../graphics/exposed-height/exposed-height.component';
import { ExpositionComponent } from '../../graphics/exposition/exposition.component';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-avalanche-activity-view',
  imports: [TranslatePipe, KeyValueComponent, ExposedHeightComponent, ExpositionComponent, IonText],
  templateUrl: './avalanche-activity-view.component.html',
  styleUrl: './avalanche-activity-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Brukes i observasjonskort for å vise en registrering av skredaktivitet */
export class AvalancheActivityViewComponent {
  data = input.required<AvalancheActivityObs2ViewModel>();
  private translateService = inject(TranslateService);

  private estimatedNumKdv = injectKdv('Snow_EstimatedNumKDV');
  private avalancheTypeKdv = injectKdv('Snow_AvalancheExtKDV');
  private avalancheTriggerKdv = injectKdv('Snow_AvalTriggerSimpleKDV');
  private sizeKdv = injectKdv('Snow_DestructiveSizeKDV');
  private propagationKdv = injectKdv('Snow_AvalPropagationKDV');

  private estimatedNumTid = computed(() => this.data().EstimatedNumTID);
  private typeTid = computed(() => this.data().AvalancheExtTID);
  private triggerSimpleTid = computed(() => this.data().AvalTriggerSimpleTID);
  private sizeTid = computed(() => this.data().DestructiveSizeTID);
  private propagationTid = computed(() => this.data().AvalPropagationTID);

  estimatedNum = this.estimatedNumKdv.getName(this.estimatedNumTid);
  noActivity = computed(() => this.estimatedNumTid() === 1); // 0 skred / ingen skredaktivitet

  // vi viser skredtype hvis hvis antall skred er > 0, ellers viser vi "Ingen skredaktivitet"
  title = computed(() => (this.noActivity() ? this.estimatedNum() : this.avalancheTypeKdv.getName(this.typeTid)()));

  triggerProbability = this.avalancheTriggerKdv.getName(this.triggerSimpleTid);
  propagation = this.propagationKdv.getName(this.propagationTid);
  size = this.sizeKdv.getName(this.sizeTid);
  exposedHeightComboTid = computed(() => this.data().ExposedHeightComboTID);
  exposedHeight1 = computed(() => this.data().ExposedHeight1);
  exposedHeight2 = computed(() => this.data().ExposedHeight2);
  exposition = computed(() => this.data().ValidExposition || '');
  comment = computed(() => this.data().Comment);

  private duringTheDay = this.translateService.instant('REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DURING_THE_DAY');

  formatTime = computed(() => {
    const startTime = this.parseDate(this.data().DtStart);
    const endTime = this.parseDate(this.data().DtEnd);

    if (startTime && endTime) {
      const day = startTime.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      const startHour = startTime.getHours();
      const endHour = endTime.getHours();
      if (startHour === 0 && endHour === 23) {
        return `${day}, ${this.duringTheDay}`; // 23 er 23:59, som vi tolker som "ut dagen"
      }
      return `${day}, ${startHour}-${endHour}`;
    }
    return '';
  });

  private parseDate = (date: string | undefined): Date | undefined => {
    if (date) {
      return new Date(date as string);
    }
    return undefined;
  };
}
