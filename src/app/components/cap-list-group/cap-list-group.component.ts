import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { IWarning } from '../../core/services/warning/warning.interface';
import { settings } from '../../../settings';
import { WarningGroup } from '../../core/services/warning/warning-group.model';

@Component({
  selector: 'app-cap-list-group',
  templateUrl: './cap-list-group.component.html',
  styleUrls: ['./cap-list-group.component.scss']
})
export class CapListGroupComponent implements OnInit {

  @Input() title: string;
  @Input() warnings: WarningGroup[];

  getDayWarning(group: WarningGroup, daysToAdd: number) {
    const day = moment().startOf('day').add(daysToAdd, 'days');
    const warning = group.getWarningForDay(day.toDate());
    if (warning) {
      return warning.warningLevel;
    }
    return 0;
  }

  constructor() { }

  ngOnInit() {
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

}
