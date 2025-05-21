import { IonLabel } from '@ionic/angular/standalone';
import { Component, inject, input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss'],
  imports: [IonLabel, NgFor, NgIf, SvgIconComponent, TranslatePipe],
})
export class CompetenceComponent {
  private userSettingService = inject(UserSettingService);
  readonly maxCompetenceLevel = 5;
  readonly competenceLevelTID = input<number>();
  readonly starCount = input<number>();

  userCompetenceUrl = toSignal(this.userSettingService.userCompetenceUrl$, { initialValue: '' });
}
