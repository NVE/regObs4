import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { ObserverViewModel } from 'src/app/modules/common-regobs-api';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-observer-chip',
  imports: [IonChip, IonIcon, IonLabel, TranslatePipe],
  templateUrl: './observer-chip.component.html',
  styleUrl: './observer-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ObserverChipComponent {
  observer = input.required<ObserverViewModel>();

  private userSettingService = inject(UserSettingService);
  userCompetenceUrl = toSignal(this.userSettingService.userCompetenceUrl$, { initialValue: '' });
}
