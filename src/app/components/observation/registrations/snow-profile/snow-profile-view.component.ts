import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SnowProfileViewModel } from 'src/app/modules/common-regobs-api';
import { SummaryComponent } from '../../summary/summary.component';
import { PlotService } from 'src/app/core/services/plot.service';

@Component({
  selector: 'app-snow-profile-view',
  imports: [SummaryComponent],
  templateUrl: './snow-profile-view.component.html',
  styleUrls: ['./snow-profile-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Brukes i observasjonskort for å vise istykkelse */
export class SnowProfileViewComponent {
  private plotService = inject(PlotService);

  readonly regId = input.required<number>();
  readonly data = input.required<SnowProfileViewModel>();
  readonly summaries = input.required<any>();
  readonly isDetailPage = input.required<boolean>();

  // readonly plotUrl = computed(() => this.plotService.getIceThicknessUrl(this.regId()));
}
