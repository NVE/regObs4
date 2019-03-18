import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-warning-list-header',
  templateUrl: './warning-list-header.component.html',
  styleUrls: ['./warning-list-header.component.scss']
})
export class WarningListHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() showDayNames: boolean;

  get ios() {
    return this.platform.is('ios');
  }

  constructor(private platform: Platform) { }

  ngOnInit() {
  }

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }

}
