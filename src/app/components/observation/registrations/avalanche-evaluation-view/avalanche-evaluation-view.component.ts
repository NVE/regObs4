import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { injectKdv } from 'src/app/modules/common-registration/services/kdv/inject-kdv';
import { AvalancheEvaluation3ViewModel } from 'src/app/modules/common-regobs-api';
import { RegistrationHeaderComponent } from '../../registration-header/registration-header.component';
import { KeyValueComponent } from '../../key-value/key-value.component';
import { IonText } from '@ionic/angular/standalone';

const IconConfig: Record<number, string> = {
  0: 'assets/images/danger-scale/Icon-Avalanche-Danger-Level-No-Rating-EAWS.svg',
  1: 'assets/images/danger-scale/Icon-Avalanche-Danger-Level-Dry-Snow-1-EAWS.svg',
  2: 'assets/images/danger-scale/Icon-Avalanche-Danger-Level-Dry-Snow-2-EAWS.svg',
  3: 'assets/images/danger-scale/Icon-Avalanche-Danger-Level-Dry-Snow-3-EAWS.svg',
  4: 'assets/images/danger-scale/Icon-Avalanche-Danger-Level-Dry-Snow-4-5-EAWS.svg',
  5: 'assets/images/danger-scale/Icon-Avalanche-Danger-Level-Dry-Snow-4-5-EAWS.svg',
};

@Component({
  selector: 'app-avalanche-evaluation-view',
  imports: [TranslatePipe, RegistrationHeaderComponent, KeyValueComponent, IonText],
  templateUrl: './avalanche-evaluation-view.component.html',
  styleUrl: './avalanche-evaluation-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvalancheEvaluationViewComponent {
  private forecastCorrectKdv = injectKdv('Snow_ForecastCorrectKDV');
  private dangerLevelKdv = injectKdv('Snow_AvalancheDangerKDV');

  data = input.required<AvalancheEvaluation3ViewModel>();

  private dangerTid = computed(() => this.data().AvalancheDangerTID);
  dangerName = this.dangerLevelKdv.getName(this.dangerTid);
  dangerIcon = computed(() => {
    const dangerTid = this.dangerTid();
    if (dangerTid != null) {
      return IconConfig[dangerTid];
    }
    return undefined;
  });
  evaluation = computed(() => this.data().AvalancheEvaluation);
  development = computed(() => this.data().AvalancheDevelopment);
  forecastComment = computed(() => this.data().ForecastComment);
  private forecastCorrectTid = computed(() => this.data().ForecastCorrectTID);
  forecastCorrect = this.forecastCorrectKdv.getName(this.forecastCorrectTid);
}
