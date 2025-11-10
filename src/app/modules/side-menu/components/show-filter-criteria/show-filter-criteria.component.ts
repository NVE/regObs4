import { IonChip, IonMenuToggle } from '@ionic/angular/standalone';
import { Component, computed, inject } from '@angular/core';
import { LangKey } from 'src/app/modules/common-core/models';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GeoHelperService } from 'src/app/modules/shared/services/geo-helper/geo-helper.service';
import { switchMap } from 'rxjs';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import moment from 'moment';

@Component({
  selector: 'app-show-filter-criteria',
  templateUrl: './show-filter-criteria.component.html',
  styleUrls: ['./show-filter-criteria.component.scss'],
  imports: [TranslatePipe, IonChip, IonMenuToggle],
})
export class ShowFilterCriteriaComponent {
  private userSettingService = inject(UserSettingService);
  private geoHelperService = inject(GeoHelperService);
  private searchCriteria = inject(SearchCriteriaService);
  private translate = inject(TranslateService);

  // Time or date description
  private fromTime = computed(() =>
    this.searchCriteria.fromDate() ? moment(this.searchCriteria.fromDate()) : undefined
  );
  private toTime = computed(() => (this.searchCriteria.toDate() ? moment(this.searchCriteria.toDate()) : undefined));

  dateFilter = computed(() => {
    const from = this.fromTime();
    const to = this.toTime();
    const now = moment();

    const isSameWeek = from?.isSame(now, 'week');
    const isSameYear = from?.isSame(now, 'year');

    const options: Intl.DateTimeFormatOptions = {
      weekday: isSameWeek ? 'long' : undefined,
      year: isSameYear ? undefined : 'numeric',
      day: isSameWeek ? undefined : 'numeric',
      month: isSameWeek ? undefined : 'long',
      hour: '2-digit',
      minute: '2-digit',
    };

    const formatter = new Intl.DateTimeFormat(this.translate.currentLang, options);
    const fromFormatted = from ? formatter.format(from.toDate()) : undefined;
    const toFormatted = to ? formatter.format(to.toDate()) : undefined;

    return {
      from: fromFormatted,
      to: toFormatted,
    };
  });

  daysBack = toSignal(this.userSettingService.daysBackForCurrentGeoHazard$, { initialValue: 1 });
  geoHazardName = toSignal(
    this.userSettingService.currentGeoHazard$.pipe(
      switchMap((geoHazards) => this.geoHelperService.getName$(geoHazards))
    ),
    { initialValue: '' }
  );
  language = toSignal(this.userSettingService.language$, { initialValue: LangKey.nb });
  showObservations = toSignal(this.userSettingService.showObservations$, { initialValue: false });
}
