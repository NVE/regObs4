import { Component, Input } from '@angular/core';
import moment from 'moment';
import { Platform, IonicModule } from '@ionic/angular';
import { NgIf, NgClass, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-warning-list-header',
  templateUrl: './warning-list-header.component.html',
  styleUrls: ['./warning-list-header.component.scss'],
  imports: [NgIf, IonicModule, NgClass, NgTemplateOutlet, TranslateModule],
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
