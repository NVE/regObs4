import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { WarningCap } from '../../core/services/warning/warning-cap.model';
import { CapAlertInfo } from '../../modules/cap/models/cap-alert.model';
import { CapItemInMapViewGroup, CapItemWithTranslation } from '../../pages/warning-list/warning-list.page';

@Component({
  selector: 'app-cap-list-group',
  templateUrl: './cap-list-group.component.html',
  styleUrls: ['./cap-list-group.component.scss']
})
export class CapListGroupComponent implements OnInit {

  @Input() title: string;
  @Input() warnings: CapItemInMapViewGroup[];

  getDayWarning(group: CapItemInMapViewGroup, daysToAdd: number) {
    const day = moment().startOf('day').add(daysToAdd, 'days');
    const itemsForDay = group.items.filter((x) => moment(x.translatedItem.effective).startOf('day').isSame(day));
    const warningLevels = itemsForDay.map((item) => this.getWarningLevel(item));
    return Math.max(...[0, ...warningLevels]);
  }

  constructor() { }

  ngOnInit() {
  }

  private getWarningLevel(item: CapItemWithTranslation) {
    if (item && item.translatedItem && item.translatedItem.parameter) {
      const parameter = (item.translatedItem.parameter || []).find((x) => x.valueName === 'awareness_level');
      if (parameter) {
        const values = parameter.value.split('; ');
        if (values.length > 0) {
          const intValue = parseInt(values[0], 10);
          if (isNaN(intValue) || intValue < 0 || intValue > 6) {
            return 0;
          } else {
            return intValue;
          }
        }
      }
    }
    console.log('No warning level for item: ', item);
    return 0;
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

  getWarningLevelCssClass(level: number) {
    return `level-${level < 2 ? 1 : level}`;
  }

}
