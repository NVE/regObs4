import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-days-or-weeks-back',
  templateUrl: './check-days-or-weeks-back.component.html',
  styleUrls: ['./check-days-or-weeks-back.component.scss'],
})
export class CheckDaysOrWeeksBackComponent implements OnInit {
  @Input() daysBack: number;

  constructor() {}

  ngOnInit() {}
}
