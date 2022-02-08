import { Component, Input } from '@angular/core';
import moment from 'moment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-warning-list-header',
  templateUrl: './warning-list-header.component.html',
  styleUrls: ['./warning-list-header.component.scss']
})
export class WarningListHeaderComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() showDayNames: boolean;

  get ios() {
    return this.platform.is('ios');
  }

  constructor(private platform: Platform) {}

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }
}
