import { Component, Input, OnInit } from '@angular/core';
import { RegionSummary } from '../../core/services/warning/region-summary.model';
import * as moment from 'moment';
import { AvalancheWarningSimple } from '../../core/services/warning/avalanche-warning-simple.model';

@Component({
  selector: 'app-region-summary-item',
  templateUrl: './region-summary-item.component.html',
  styleUrls: ['./region-summary-item.component.scss']
})
export class RegionSummaryItemComponent implements OnInit {

  @Input() regionSummary: RegionSummary;

  constructor() { }

  ngOnInit() {
  }

  getDayWarnings(): AvalancheWarningSimple[] {
    const daysAhead = 3;
    const result: AvalancheWarningSimple[] = [];
    for (let i = 0; i < daysAhead; i++) {
      const dayToFind = moment().add(i, 'days');
      result.push(this.regionSummary.AvalancheWarningList.find((list) => moment(list.ValidFrom).isSame(dayToFind, 'day')));
    }
    return result;
  }
}
