import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { IceThicknessViewModel } from 'src/app/modules/common-regobs-api';
import { SummaryComponent } from '../../summary/summary.component';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppMode } from 'src/app/modules/common-core/models/app-mode.enum';
import { settings } from 'src/settings';
import { IcePlotComponent } from '../../graphics/ice-plot.component';

@Component({
  selector: 'app-avalanche-problem-view',
  imports: [SummaryComponent, IcePlotComponent],
  templateUrl: './ice-thickness-view.component.html',
  styleUrls: ['./ice-thickness-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Brukes i observasjonskort for å vise istykkelse */
export class IceThicknessViewComponent {
  readonly regId = input.required<number>();
  readonly data = input.required<IceThicknessViewModel>();
  readonly summaries = input.required<any>();

  private userSettingsService = inject(UserSettingService);

  private appMode = toSignal(this.userSettingsService.appMode$, { initialValue: AppMode.Prod });
  private plotBaseUrl = settings.iceThicknessPlotUrl[this.appMode()];
  readonly plotUrl = computed(() => `${this.plotBaseUrl}${this.regId().toString()}`);
}
