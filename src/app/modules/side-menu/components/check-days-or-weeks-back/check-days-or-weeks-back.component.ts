import { Component, input } from '@angular/core';
import { NgIf, LowerCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

// TODO: Remove this component, should just be a function...
@Component({
  selector: 'app-check-days-or-weeks-back',
  templateUrl: './check-days-or-weeks-back.component.html',
  styleUrls: ['./check-days-or-weeks-back.component.scss'],
  imports: [NgIf, LowerCasePipe, TranslatePipe],
})
export class CheckDaysOrWeeksBackComponent {
  readonly daysBack = input.required<number>();
}
