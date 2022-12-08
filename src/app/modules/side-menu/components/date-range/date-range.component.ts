import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { map, Observable, takeUntil } from 'rxjs';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import { tap } from 'rxjs/operators';
import moment from 'moment';
import { IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent extends NgDestoryBase implements OnInit {
  fromDate: string;
  toDate: string;
  minDate = new Date('01.01.2010').toISOString();
  maxDate = new Date().toISOString();
  mode: 'predefined' | 'custom' = 'predefined';
  isOpen = false;

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;

  get modeText(): Observable<string> {
    if (this.mode === 'predefined') {
      return this.userSettingService.daysBackForCurrentGeoHazard$.pipe(
        map((day) => DateRangeComponent.getReadableDays(day))
      );
    }
    let dateRange = '';
    if (this.fromDate) {
      dateRange = new Date(this.fromDate).toLocaleDateString('nb-NO', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
    if (this.toDate) {
      if (this.fromDate) {
        dateRange += ' - ';
      }
      dateRange += new Date(this.toDate).toLocaleDateString('nb-NO', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
    return new Observable<string>((subscriber) => {
      subscriber.next(dateRange);
    });
  }

  constructor(private searchCriteriaService: SearchCriteriaService, private userSettingService: UserSettingService) {
    super();
  }

  ngOnInit() {
    this.searchCriteriaService.searchCriteria$
      .pipe(
        takeUntil(this.ngDestroy$),
        tap((criteria) => {
          this.fromDate = criteria.FromDtObsTime;
          this.toDate = criteria.ToDtObsTime;
        })
      )
      .subscribe();
  }

  toggleAccordion(e: CustomEvent<IonAccordionGroup>) {
    this.isOpen = !!e.detail.value;
  }

  setFromDate(date: string) {
    this.searchCriteriaService.setFromDate(date);
  }

  setToDate(date: string) {
    this.searchCriteriaService.setToDate(date);
  }

  changeDateAndSetMode(days: number) {
    this.searchCriteriaService.setFromDate(moment().subtract(days, 'days').format('YYYY-MM-DD'), true);
    this.mode = 'predefined';
  }

  private static getReadableDays(day: number): string {
    if (day === 0) return 'I dag';
    if (day === 1) return 'I går';
    let text = 'Siste ';
    if (day > 1 && day < 7) {
      text += `${day} dager`;
    }
    if (day >= 7 && day < 14) {
      text += 'uke';
    }
    if (day >= 14 && day < 28) {
      text += `${day / 7} uker`;
    }
    if (day >= 28) {
      text += `${(day / 30).toFixed(0)} måneder`;
    }
    return text;
  }
}
