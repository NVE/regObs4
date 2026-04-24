import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { IceThicknessViewModel, Summary } from 'src/app/modules/common-regobs-api';
import { SummaryComponent } from '../../summary/summary.component';
import moment from 'moment';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { openOutline } from 'ionicons/icons';
import { TranslatePipe } from '@ngx-translate/core';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LangKey } from 'src/app/modules/common-core/models';

@Component({
  selector: 'app-ice-thickness-view',
  imports: [SummaryComponent, IonIcon, TranslatePipe],
  templateUrl: './ice-thickness-view.component.html',
  styleUrls: ['./ice-thickness-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Brukes i observasjonskort for å vise istykkelse */
export class IceThicknessViewComponent {
  private settings = inject(UserSettingService);

  readonly obsDate = input.required<string>();
  readonly locationId = input<number>();
  readonly data = input.required<IceThicknessViewModel>();
  readonly summaries = input.required<Summary[]>();

  constructor() {
    addIcons({ openOutline });
  }

  private date = computed(() => moment(this.obsDate()).format('DD.MM.YYYY'));
  private lang = toSignal(this.settings.language$, { initialValue: LangKey.nb });
  private langKey = computed(() => {
    const lang = this.lang();
    const isNorwegian = lang === LangKey.nb || lang === LangKey.nn;
    if (isNorwegian) {
      return 0;
    }
    return 1;
  });

  iskartUrl = computed(() => {
    const id = this.locationId();
    if (id != null) {
      return `https://iskart.no/VisInfoFraRegobs.html?OBSLOCATIONID=${id};FDATE=${this.date()};LDATE=${this.date()};LANGUAGE=${this.langKey()}`;
    }

    return undefined;
  });
}
