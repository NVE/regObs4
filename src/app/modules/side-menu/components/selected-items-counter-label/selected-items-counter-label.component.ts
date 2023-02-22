import { Component, Input } from '@angular/core';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

@Component({
  selector: 'app-selected-items-counter-label',
  templateUrl: './selected-items-counter-label.component.html',
  styleUrls: ['./selected-items-counter-label.component.scss'],
})
export class SelectedItemsCounterLabelComponent extends NgDestoryBase {
  @Input() selectedItemsCount: number;

  constructor() {
    super();
  }
}
