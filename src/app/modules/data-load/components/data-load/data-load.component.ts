import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-data-load',
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.scss'],
})
export class DataLoadComponent {
  @Input()
  show: boolean;
  @Input()
  label: string;
}
