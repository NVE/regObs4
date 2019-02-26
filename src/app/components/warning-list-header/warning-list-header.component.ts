import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-warning-list-header',
  templateUrl: './warning-list-header.component.html',
  styleUrls: ['./warning-list-header.component.scss']
})
export class WarningListHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() showDayNames: boolean;

  constructor() { }

  ngOnInit() {
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

}
