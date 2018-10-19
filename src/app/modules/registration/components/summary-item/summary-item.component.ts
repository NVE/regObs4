import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() subTitleFormat?: 'string' | 'date';
  @Input() hasData: boolean;
  @Input() href: string;

  constructor() { }

  async ngOnInit() {

  }
}
