import { Component, OnInit } from '@angular/core';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit {
  fromDate: string;
  toDate: string;
  minDate: string;
  maxDate: string;
  mode: 'predefined' | 'custom' = 'predefined';

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

  constructor(private searchCriteriaService: SearchCriteriaService, private userSettingService: UserSettingService) {}

  ngOnInit() {
    this.minDate = new Date('01.01.2010').toISOString();
    this.maxDate = new Date().toISOString();
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
