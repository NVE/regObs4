import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-data-load',
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.scss'],
  imports: [NgClass, IonicModule, TranslateModule],
})
export class DataLoadComponent {
  @Input()
  show: boolean;
  @Input()
  label: string;
}
