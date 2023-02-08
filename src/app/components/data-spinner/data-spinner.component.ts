import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-spinner',
  templateUrl: './data-spinner.component.html',
  styleUrls: ['./data-spinner.component.scss'],
})
export class DataSpinnerComponent {
  @Input() show: boolean;
}
