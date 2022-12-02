import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.minDate = new Date('01.01.2010').toISOString();
    this.maxDate = new Date().toISOString();
  }
}
