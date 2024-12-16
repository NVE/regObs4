import { IonSpinner } from '@ionic/angular/standalone';
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-data-load',
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.scss'],
  imports: [IonSpinner, NgClass, TranslateModule],
})
export class DataLoadComponent {
  @Input()
  show: boolean;
  @Input()
  label: string;
}
