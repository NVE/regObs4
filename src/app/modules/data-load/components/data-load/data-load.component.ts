import { IonSpinner } from '@ionic/angular/standalone';
import { Component, input , ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-data-load',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.scss'],
  imports: [IonSpinner, NgClass, TranslatePipe],
})
export class DataLoadComponent {
  readonly show = input(false, { transform: (v?: boolean | null): boolean => v === true });
  readonly label = input.required<string>();
}
