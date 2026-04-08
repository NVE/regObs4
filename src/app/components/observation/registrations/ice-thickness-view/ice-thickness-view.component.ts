import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IceThicknessViewModel } from 'src/app/modules/common-regobs-api';
import { SummaryComponent } from '../../summary/summary.component';
import moment from 'moment';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { openOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-ice-thickness-view',
  imports: [SummaryComponent, IonIcon, TranslatePipe],
  templateUrl: './ice-thickness-view.component.html',
  styleUrls: ['./ice-thickness-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Brukes i observasjonskort for å vise istykkelse */
export class IceThicknessViewComponent {
  readonly obsDate = input.required<string>();
  readonly locationId = input<number>();
  readonly data = input.required<IceThicknessViewModel>();
  readonly summaries = input.required<any>();

  constructor() {
    addIcons({ openOutline });
  }

  private date = computed(() => moment(this.obsDate()).format('DD.MM.YYYY'));

  iskartUrl = computed(() => {
    const id = this.locationId();
    if (id != null) {
      return `https://iskart.no/VisInfoFraRegobs.html?OBSLOCATIONID=${id};FDATE=${this.date()};LDATE=${this.date()}`;
    }
    return undefined;
  });
}
