import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { IceThicknessViewModel } from 'src/app/modules/common-regobs-api';
import { SummaryComponent } from '../../summary/summary.component';
import { IcePlotComponent } from '../../graphics/ice-plot.component';
import { PlotService } from 'src/app/core/services/plot.service';

@Component({
  selector: 'app-ice-thickness-view',
  imports: [SummaryComponent, IcePlotComponent],
  templateUrl: './ice-thickness-view.component.html',
  styleUrls: ['./ice-thickness-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Brukes i observasjonskort for å vise istykkelse */
export class IceThicknessViewComponent {
  private plotService = inject(PlotService);

  readonly regId = input.required<number>();
  readonly data = input.required<IceThicknessViewModel>();
  readonly summaries = input.required<any>();

  readonly plotUrl = computed(() => this.plotService.getIceThicknessUrl(this.regId()));
}
