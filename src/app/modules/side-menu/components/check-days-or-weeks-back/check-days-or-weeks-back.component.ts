import { Component, Input, OnInit } from '@angular/core';
import { NgIf, LowerCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-check-days-or-weeks-back',
  templateUrl: './check-days-or-weeks-back.component.html',
  styleUrls: ['./check-days-or-weeks-back.component.scss'],
  imports: [NgIf, LowerCasePipe, TranslatePipe],
})
export class CheckDaysOrWeeksBackComponent implements OnInit {
  @Input() daysBack: number;

  constructor() {}

  ngOnInit() {}
}
