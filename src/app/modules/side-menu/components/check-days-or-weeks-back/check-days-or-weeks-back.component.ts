import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-check-days-or-weeks-back',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './check-days-or-weeks-back.component.html',
  styleUrls: ['./check-days-or-weeks-back.component.scss'],
  imports: [LowerCasePipe, TranslatePipe],
})
export class CheckDaysOrWeeksBackComponent {
  readonly daysBack = input.required<number>();
}
