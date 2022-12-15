import { Component, OnInit } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { map, Observable, takeUntil } from 'rxjs';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import { concatMap, tap } from 'rxjs/operators';
import moment from 'moment';
import { IonAccordionGroup } from '@ionic/angular';
import { getLangKeyString } from '../../../common-core/models/lang-key.enum';
import { TranslateService } from '@ngx-translate/core';

enum Mode {
  PREDEFINED = 'predefined',
  CUSTOM = 'custom',
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent extends NgDestoryBase implements OnInit {
  fromDate: string;
  toDate: string;
  minDate = new Date('2010-01-01T00:00:00').toISOString();
  maxDate = new Date().toISOString();
  mode: Mode = Mode.PREDEFINED;
  isOpen = false;
  cachedDays: number;

  get modeText(): Observable<string> {
    if (this.mode === Mode.PREDEFINED) {
      return this.userSettingService.daysBackForCurrentGeoHazard$.pipe(
        concatMap((day) => this.getReadableDays.bind(this)(day)),
        map((x) => x[Object.keys(x)[0]])
      );
    }
    let dateRange = '';
    return this.userSettingService.language$.pipe(
      map((value) => {
        const lang = getLangKeyString(value);
        if (this.fromDate) {
          dateRange = new Date(this.fromDate).toLocaleDateString(lang, {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });
        }
        if (this.toDate) {
          if (this.fromDate) {
            dateRange += ' - ';
          }
          dateRange += new Date(this.toDate).toLocaleDateString(lang, {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });
        }
        return dateRange;
      })
    );
  }

  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private userSettingService: UserSettingService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.searchCriteriaService.searchCriteria$
      .pipe(
        takeUntil(this.ngDestroy$),
        tap((criteria) => {
          this.fromDate = criteria.FromDtObsTime;
          this.toDate = criteria.ToDtObsTime;
          if (!this.cachedDays) {
            this.cachedDays = moment().diff(moment(this.fromDate), 'days');
          }
        })
      )
      .subscribe();
  }

  toggleAccordion(e: CustomEvent<IonAccordionGroup>): void {
    this.isOpen = !!e.detail.value;
  }

  setFromDate(date: string): void {
    this.searchCriteriaService.setFromDate(date);
  }

  setToDate(date: string): void {
    this.searchCriteriaService.setToDate(date);
  }

  changeDateAndSetMode(days?: number): void {
    if (days) {
      this.cachedDays = days;
      this.searchCriteriaService.setFromDate(moment().subtract(days, 'days').format('YYYY-MM-DD'), true);
      this.mode = Mode.PREDEFINED;
    } else if (this.cachedDays) {
      this.searchCriteriaService.setFromDate(moment().subtract(this.cachedDays, 'days').format('YYYY-MM-DD'), true);
      this.mode = Mode.CUSTOM;
    }
  }

  private getReadableDays(day: number): Observable<string> {
    if (day === 0) return this.translateService.get(['MENU.DATE_RANGE.TODAY']);
    if (day === 1) return this.translateService.get(['MENU.DATE_RANGE.YESTERDAY']);
    if (day > 1 && day < 7) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_X_DAYS'], { days: day });
    }
    if (day >= 7 && day < 14) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_WEEK']);
    }
    if (day >= 14 && day < 28) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_X_WEEKS'], { weeks: day / 7 });
    }
    if (day >= 28) {
      return this.translateService.get(['MENU.DATE_RANGE.LAST_X_MONTHS'], { months: day / 30 });
    }
  }
}
