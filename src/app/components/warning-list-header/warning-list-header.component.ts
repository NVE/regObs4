import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import moment from 'moment';
import { IonCol, IonGrid, IonLabel, IonRow, Platform } from '@ionic/angular/standalone';
import { NgTemplateOutlet } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-warning-list-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './warning-list-header.component.html',
  styleUrls: ['./warning-list-header.component.scss'],
  imports: [IonCol, IonGrid, IonLabel, IonRow, NgTemplateOutlet, TranslatePipe],
})
export class WarningListHeaderComponent {
  private platform = inject(Platform);

  title = input('');
  subTitle = input('');
  showDayNames = input(false);

  ios = this.platform.is('ios');

  getDayName(daysToAdd: number) {
    return `DAYS.SHORT.${moment().add(daysToAdd, 'days').day()}`;
  }
}
